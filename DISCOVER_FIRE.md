# Firebase/Firestore Migration Guide

This document outlines the comprehensive steps required to migrate the Garfish Digital client portal from the current JSON-based authentication and data storage system to Firebase Authentication and Firestore database.

## Overview

**Current System:**
- Authentication: JSON lookup in `src/data/clients.json`
- Data Storage: Static JSON file with client data, milestones, payments
- Persistence: File system writes (development only)

**Target System:**
- Authentication: Firebase Auth with email/password
- Data Storage: Firestore NoSQL database
- Persistence: Real-time database updates

## Phase 1: Firebase Project Setup

### 1.1 Create Firebase Project

1. **Go to Firebase Console:**
   - Visit https://console.firebase.google.com/
   - Click "Create a project" or "Add project"

2. **Configure Project:**
   - Project name: `garfish-digital-client-portal`
   - Enable Google Analytics (optional but recommended)
   - Select Analytics account or create new one

3. **Enable Required Services:**
   - **Authentication:** Enable Email/Password provider
   - **Firestore:** Create database in production mode
   - **Hosting:** (optional) for deployment

### 1.2 Install Firebase Dependencies

```bash
npm install firebase
npm install firebase-admin  # For server-side operations
```

### 1.3 Firebase Configuration

1. **Get Configuration Object:**
   - In Firebase Console → Project Settings → General
   - Scroll to "Your apps" section
   - Click "Web" icon to create web app
   - Copy configuration object

2. **Create Environment Variables:**
   ```bash
   # Add to .env.local
   NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
   
   # Server-side (for admin operations)
   FIREBASE_PRIVATE_KEY="your_private_key"
   FIREBASE_CLIENT_EMAIL=your_service_account_email
   ```

3. **Create Firebase Configuration File:**
   ```javascript
   // src/config/firebase.js
   import { initializeApp } from 'firebase/app';
   import { getAuth } from 'firebase/auth';
   import { getFirestore } from 'firebase/firestore';

   const firebaseConfig = {
     apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
     authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
     projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
     storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
     messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
     appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
   };

   const app = initializeApp(firebaseConfig);
   export const auth = getAuth(app);
   export const db = getFirestore(app);
   export default app;
   ```

## Phase 2: Database Schema Design

### 2.1 Firestore Collection Structure

```
/clients/{clientId}
  - id: string (matches current client.id)
  - email: string (new - for authentication)
  - clientName: string
  - project: string
  - path: string
  - status: string
  - createdAt: timestamp
  - lastLogin: timestamp
  
  /milestones/{milestoneId}
    - section: string
    - milestone: string
    - status: string
    - dateCompleted: string
    - order: number (for sorting)
    - createdAt: timestamp
  
  /payments/{paymentId}
    - id: string
    - description: string
    - amount: number
    - dueDate: string
    - status: string
    - paidDate: string (optional)
    - stripePaymentIntentId: string (optional)
    - createdAt: timestamp
  
  /documents/{documentType}
    - type: string (scope, agreement, handoff)
    - url: string
    - filename: string
    - uploadedAt: timestamp
```

### 2.2 Data Migration Preparation

Create data migration script to transfer existing JSON data:

```javascript
// scripts/migrateToFirestore.js
import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { getAuth } from 'firebase-admin/auth';
import fs from 'fs';

const serviceAccount = {
  type: "service_account",
  project_id: process.env.FIREBASE_PROJECT_ID,
  private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
  private_key: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
  client_email: process.env.FIREBASE_CLIENT_EMAIL,
  client_id: process.env.FIREBASE_CLIENT_ID,
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
};

const app = initializeApp({
  credential: cert(serviceAccount)
});

const db = getFirestore();
const auth = getAuth();

async function migrateData() {
  const clientsData = JSON.parse(fs.readFileSync('src/data/clients.json', 'utf8'));
  
  for (const client of clientsData) {
    // Create Firebase Auth user
    const userRecord = await auth.createUser({
      uid: client.id,
      email: `${client.id}@garf.is`, // Generate email or use provided
      password: client.password, // Temporary - user should change
      displayName: client.clientName,
    });

    // Create client document
    const clientRef = db.collection('clients').doc(client.id);
    await clientRef.set({
      id: client.id,
      email: userRecord.email,
      clientName: client.clientName,
      project: client.project,
      path: client.path,
      status: client.status,
      createdAt: new Date(),
      lastLogin: null
    });

    // Migrate milestones
    for (let i = 0; i < client.milestones.length; i++) {
      const milestone = client.milestones[i];
      await clientRef.collection('milestones').add({
        ...milestone,
        order: i,
        createdAt: new Date()
      });
    }

    // Migrate payments
    for (const payment of client.payments) {
      await clientRef.collection('payments').doc(payment.id).set({
        ...payment,
        createdAt: new Date()
      });
    }

    // Migrate documents
    if (client.documents) {
      for (const [type, url] of Object.entries(client.documents)) {
        await clientRef.collection('documents').doc(type).set({
          type,
          url,
          filename: url.split('/').pop(),
          uploadedAt: new Date()
        });
      }
    }
  }
}
```

## Phase 3: Authentication System Migration

### 3.1 Replace useClientAuth Hook

```javascript
// src/hooks/useFirebaseAuth.js
'use client';

import { useState, useEffect, useContext, createContext } from 'react';
import { 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  User 
} from 'firebase/auth';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { auth, db } from '../config/firebase';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [clientData, setClientData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // Fetch client data from Firestore
        const clientDoc = await getDoc(doc(db, 'clients', user.uid));
        if (clientDoc.exists()) {
          setClientData({ id: user.uid, ...clientDoc.data() });
          
          // Update last login
          await updateDoc(doc(db, 'clients', user.uid), {
            lastLogin: new Date()
          });
        }
        setUser(user);
      } else {
        setUser(null);
        setClientData(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const login = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const logout = async () => {
    await signOut(auth);
  };

  return (
    <AuthContext.Provider value={{
      user,
      clientData,
      loading,
      login,
      logout,
      isClientAuthenticated: !!user
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useFirebaseAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useFirebaseAuth must be used within AuthProvider');
  }
  return context;
};
```

### 3.2 Update Client Portal Authentication

```javascript
// src/app/client/page.jsx - Update authentication form
import { useFirebaseAuth } from '../../hooks/useFirebaseAuth';

export default function ClientPortal() {
  const { login, isClientAuthenticated, clientData, loading } = useFirebaseAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    
    const result = await login(email, password);
    if (!result.success) {
      setError(result.error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (isClientAuthenticated) {
    return (
      // Existing authenticated view
      <div>Welcome {clientData.clientName}</div>
    );
  }

  return (
    <form onSubmit={handleLogin}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
      />
      {error && <div className="error">{error}</div>}
      <button type="submit">Sign In</button>
    </form>
  );
}
```

## Phase 4: Data Layer Migration

### 4.1 Create Firestore Data Hooks

```javascript
// src/hooks/useFirestoreData.js
import { useState, useEffect } from 'react';
import { 
  collection, 
  query, 
  orderBy, 
  onSnapshot, 
  doc, 
  updateDoc,
  where 
} from 'firebase/firestore';
import { db } from '../config/firebase';

export function useMilestones(clientId) {
  const [milestones, setMilestones] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!clientId) return;

    const q = query(
      collection(db, 'clients', clientId, 'milestones'),
      orderBy('order', 'asc')
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const milestonesData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setMilestones(milestonesData);
      setLoading(false);
    });

    return unsubscribe;
  }, [clientId]);

  return { milestones, loading };
}

export function usePayments(clientId) {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!clientId) return;

    const q = query(
      collection(db, 'clients', clientId, 'payments'),
      orderBy('dueDate', 'asc')
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const paymentsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setPayments(paymentsData);
      setLoading(false);
    });

    return unsubscribe;
  }, [clientId]);

  const updatePaymentStatus = async (paymentId, status, paidDate = null) => {
    const paymentRef = doc(db, 'clients', clientId, 'payments', paymentId);
    await updateDoc(paymentRef, {
      status,
      paidDate,
      updatedAt: new Date()
    });
  };

  return { payments, loading, updatePaymentStatus };
}
```

### 4.2 Update Payment Processing

```javascript
// src/app/client/payment/page.jsx - Update payment success handler
import { useFirebaseAuth } from '../../../hooks/useFirebaseAuth';
import { usePayments } from '../../../hooks/useFirestoreData';

export default function Payment() {
  const { clientData, isClientAuthenticated } = useFirebaseAuth();
  const { payments, loading, updatePaymentStatus } = usePayments(clientData?.id);

  const handlePaymentSuccess = async (paymentIntent) => {
    const paidDate = new Date().toISOString().split('T')[0];
    
    try {
      // Update Firestore directly - real persistence!
      await updatePaymentStatus(
        selectedInvoice.id, 
        'paid', 
        paidDate
      );
      
      setPaymentSuccess(true);
      setSelectedInvoice(null);
    } catch (error) {
      console.error('Failed to update payment status:', error);
      setPaymentError('Payment processed but status update failed. Please contact support.');
    }
  };

  // Rest of component logic...
}
```

## Phase 5: API Routes Migration

### 5.1 Remove Static File API Routes

Delete these files (no longer needed):
- `/api/stripe/update-invoice-status.js`
- Any other routes that modify `clients.json`

### 5.2 Create Firebase Admin API Routes

```javascript
// src/app/api/admin/clients/route.js
import { NextResponse } from 'next/server';
import { initializeApp, cert, getApps } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

// Initialize Firebase Admin
if (!getApps().length) {
  initializeApp({
    credential: cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    })
  });
}

const db = getFirestore();

export async function GET() {
  try {
    const clientsSnapshot = await db.collection('clients').get();
    const clients = clientsSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    
    return NextResponse.json(clients);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
```

## Phase 6: Security Rules

### 6.1 Firestore Security Rules

```javascript
// firestore.rules
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Clients can only access their own data
    match /clients/{clientId} {
      allow read, write: if request.auth != null && request.auth.uid == clientId;
      
      // Subcollections inherit parent permissions
      match /milestones/{milestoneId} {
        allow read, write: if request.auth != null && request.auth.uid == clientId;
      }
      
      match /payments/{paymentId} {
        allow read, write: if request.auth != null && request.auth.uid == clientId;
      }
      
      match /documents/{documentId} {
        allow read, write: if request.auth != null && request.auth.uid == clientId;
      }
    }
  }
}
```

Deploy rules:
```bash
firebase deploy --only firestore:rules
```

## Phase 7: Testing & Validation

### 7.1 Testing Checklist

**Authentication Testing:**
- [ ] Email/password login works
- [ ] Logout functionality
- [ ] Authentication state persistence
- [ ] Protected route access
- [ ] Error handling for invalid credentials

**Data Operations Testing:**
- [ ] Milestone data loads correctly
- [ ] Payment data loads correctly  
- [ ] Document access works
- [ ] Real-time updates function
- [ ] Payment status updates persist
- [ ] Cross-session data persistence

**Security Testing:**
- [ ] Users cannot access other client data
- [ ] Unauthenticated access blocked
- [ ] API routes properly secured
- [ ] Environment variables secured

### 7.2 Performance Considerations

**Optimization Strategies:**
- Use Firestore offline persistence for better UX
- Implement proper loading states
- Add error boundaries for Firebase failures
- Consider pagination for large datasets
- Implement caching strategies

```javascript
// Enable offline persistence
import { enableNetwork, disableNetwork } from 'firebase/firestore';

// In src/config/firebase.js
export const enableOfflineSupport = () => {
  enableNetwork(db);
};
```

## Phase 8: Deployment & Migration

### 8.1 Deployment Steps

1. **Environment Setup:**
   - Add Firebase environment variables to production
   - Update build configuration if needed
   - Test Firebase connection in staging

2. **Data Migration:**
   - Run migration script in controlled environment
   - Verify all data transferred correctly
   - Test authentication for existing clients

3. **Gradual Rollout:**
   - Deploy with feature flag (optional)
   - Monitor for errors
   - Have rollback plan ready

### 8.2 Post-Migration Tasks

1. **Client Communication:**
   - Notify clients of new authentication method
   - Provide login instructions
   - Offer support for transition issues

2. **Monitoring:**
   - Set up Firebase Analytics
   - Monitor authentication metrics
   - Track database performance

3. **Cleanup:**
   - Remove old `clients.json` file
   - Clean up unused authentication code
   - Update documentation

## Phase 9: Advanced Features (Future)

### 9.1 Enhanced Security

```javascript
// Multi-factor authentication
import { 
  multiFactor, 
  PhoneAuthProvider, 
  PhoneMultiFactorGenerator 
} from 'firebase/auth';

// Implement MFA enrollment and verification
```

### 9.2 Real-time Notifications

```javascript
// Cloud Functions for notifications
exports.paymentStatusChanged = functions.firestore
  .document('clients/{clientId}/payments/{paymentId}')
  .onUpdate((change, context) => {
    // Send email notification when payment status changes
  });
```

### 9.3 Advanced Analytics

- User engagement tracking
- Payment conversion metrics  
- Milestone completion analytics
- Performance monitoring

## Cost Considerations

**Firebase Pricing Factors:**
- **Authentication:** First 10K monthly active users free
- **Firestore:** Pay per read/write operation
- **Cloud Functions:** Pay per invocation
- **Storage:** Minimal for this use case

**Estimated Monthly Costs (50 clients):**
- Authentication: Free
- Firestore: ~$1-5
- Total: Under $10/month

## Migration Timeline

**Estimated Duration: 4-6 weeks**

- Week 1: Firebase setup, schema design
- Week 2: Authentication system migration  
- Week 3: Data layer implementation
- Week 4: Testing and security
- Week 5: Data migration and deployment
- Week 6: Monitoring and optimization

This comprehensive migration will provide a robust, scalable, and secure foundation for the client portal with real data persistence and professional authentication capabilities.