# Firebase/Firestore Implementation Guide

This document outlines the comprehensive steps required to implement Firebase Authentication and Firestore database for the Garfish Digital client portal, replacing the current JSON-based mock system with a production-ready solution.

## Overview

**Current System Analysis:**
- Authentication: JSON lookup in `src/data/clients.json` with mock clients ("garfish-init", "gorgeous1105")
- Data Storage: Static JSON file with mock client data, milestones, payments, documents
- Persistence: File system writes (development only, not production-ready)
- Components: ClientAuthContext, UserProfileCircle, Welcome modals, Stripe integration
- Status: **Mock data only** - no real clients to migrate

**Target System:**
- Authentication: Firebase Auth with email/password (clean implementation)
- Data Storage: Firestore NoSQL database with real-time updates
- Persistence: Production-ready, scalable database operations
- Enhanced Security: Firestore rules, proper user isolation
- Real-time Features: Live updates, offline support
- **Fresh Start**: No legacy migration concerns, clean implementation

## Phase 1: Firebase Project Setup

### 1.1 Create Firebase Project

1. **Go to Firebase Console:**
   - Visit https://console.firebase.google.com/
   - Click "Create a project" or "Add project"

2. **Configure Project:**
   - Project name: `garfish-digital-client-portal`
   - Project ID: `garfish-digital-client-portal` (must be globally unique)
   - Enable Google Analytics: **YES** (recommended for tracking authentication metrics)
   - Analytics account: Create new or use existing Garfish Digital account
   - Location: Select closest region (US-Central for North America)

3. **Enable Required Services:**
   
   **Authentication Setup:**
   - Navigate to Authentication → Sign-in method
   - Enable **Email/Password** provider
   - **IMPORTANT:** Enable "Email link (passwordless sign-in)" for future password reset functionality
   - Disable "Enable one-tap sign-up" (not needed for client portal)
   
   **Firestore Database Setup:**
   - Navigate to Firestore Database → Create database
   - **Start in production mode** (we'll configure rules later)
   - Location: Same as project location for consistency
   - **CRITICAL:** Note the database URL for environment variables
   
   **Optional Services:**
   - **Hosting:** Enable if deploying via Firebase (alternative to Netlify)
   - **Cloud Functions:** Enable for future webhook integrations
   - **Cloud Storage:** Enable if planning document upload features

### 1.2 Security Configuration (Immediate)

**Authentication Security:**
```javascript
// Configure in Firebase Console → Authentication → Settings
{
  "authorizedDomains": [
    "localhost",
    "garfishdigital.netlify.app",
    "your-custom-domain.com"  // Add any custom domains
  ],
  "emailPrivacyPolicy": "https://garfishdigital.netlify.app/privacy",
  "termsOfService": "https://garfishdigital.netlify.app/terms"
}
```

**Firestore Initial Rules (For Development):**
```javascript
// Deploy these rules after database creation
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Development rules - allow authenticated access
    // Will be replaced with production rules in Phase 6
    match /{document=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```

### 1.3 Install Firebase Dependencies

**Core Firebase Packages:**
```bash
# Main Firebase SDK
npm install firebase@latest

# Firebase Admin SDK (for server-side operations and data migration)
npm install firebase-admin@latest

# Additional utilities for enhanced development
npm install --save-dev firebase-tools  # CLI for deployment and management
```

**Version Compatibility Check:**
```bash
# Verify Next.js compatibility
npm list next
# Ensure Firebase v10+ for modern features
npm list firebase
```

**Development Dependencies (Optional but Recommended):**
```bash
# Firebase emulator for local development
npm install --save-dev @firebase/rules-unit-testing

# Enhanced error handling for Firebase operations
npm install firebase-functions-helper
```

**Verify Installation:**
```bash
# Check Firebase CLI
npx firebase --version  # Should be 12.0+

# Test Firebase import (create temporary test file)
node -e "console.log(require('firebase/app')); console.log('Firebase SDK loaded successfully');"
```

### 1.4 Firebase Configuration & Environment Setup

1. **Get Configuration Object:**
   - Navigate to Firebase Console → Project Settings → General
   - Scroll to "Your apps" section  
   - Click **"Web" icon** (</>) to create web app
   - App nickname: `garfish-digital-client-portal-web`
   - **Check** "Also set up Firebase Hosting" (optional)
   - Copy the configuration object from the setup screen

2. **Generate Service Account (For Admin Operations):**
   - Go to Project Settings → Service Accounts
   - Click "Generate new private key"
   - **SECURE STORAGE:** Store JSON file securely (never commit to git)
   - Extract values for environment variables
   - **Note:** Primarily needed for admin operations and testing, not client operations

3. **Environment Variables Setup:**
   
   **Local Development (.env.local):**
   ```bash
   # === Firebase Client-Side Configuration ===
   NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyExample...
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=garfish-digital-client-portal.firebaseapp.com
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=garfish-digital-client-portal
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=garfish-digital-client-portal.appspot.com
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
   NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789:web:abcdef123456

   # === Firebase Admin Configuration (Server-Side) ===
   FIREBASE_PROJECT_ID=garfish-digital-client-portal
   FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYourPrivateKeyHere\n-----END PRIVATE KEY-----"
   FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxxxx@garfish-digital-client-portal.iam.gserviceaccount.com
   
   # === Additional Environment Variables ===
   FIREBASE_DATABASE_URL=https://garfish-digital-client-portal-default-rtdb.firebaseio.com/
   
   # === Existing Stripe Configuration (Keep) ===
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_xxxxx
   STRIPE_SECRET_KEY=sk_test_xxxxx
   ```

   **Production Environment (Netlify):**
   ```bash
   # Add these in Netlify Dashboard → Site Settings → Environment Variables
   # Same variables as above but with production values
   ```

4. **Create Enhanced Firebase Configuration:**
   ```javascript
   // src/config/firebase.js
   import { initializeApp, getApps } from 'firebase/app';
   import { getAuth, connectAuthEmulator } from 'firebase/auth';
   import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';
   import { getFunctions, connectFunctionsEmulator } from 'firebase/functions';

   // Validate environment variables
   const requiredEnvVars = [
     'NEXT_PUBLIC_FIREBASE_API_KEY',
     'NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN',
     'NEXT_PUBLIC_FIREBASE_PROJECT_ID',
   ];

   requiredEnvVars.forEach(envVar => {
     if (!process.env[envVar]) {
       throw new Error(`Missing required environment variable: ${envVar}`);
     }
   });

   const firebaseConfig = {
     apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
     authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
     projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
     storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
     messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
     appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
   };

   // Initialize Firebase (prevent multiple initializations)
   const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

   // Initialize services
   export const auth = getAuth(app);
   export const db = getFirestore(app);
   export const functions = getFunctions(app);

   // Development emulator setup (optional)
   if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
     // Only connect to emulators in development and on client-side
     try {
       if (!auth._delegate._config?.emulator) {
         connectAuthEmulator(auth, 'http://localhost:9099');
       }
       if (!db._delegate._databaseId?.database?.includes('localhost')) {
         connectFirestoreEmulator(db, 'localhost', 8080);
       }
     } catch (error) {
       console.log('Emulator connection failed (this is normal in production):', error.message);
     }
   }

   // Error handling wrapper
   export const firebaseErrorHandler = (error) => {
     const errorMapping = {
       'auth/user-not-found': 'No account found with this email address.',
       'auth/wrong-password': 'Incorrect password. Please try again.',
       'auth/invalid-email': 'Please enter a valid email address.',
       'auth/user-disabled': 'This account has been disabled. Please contact support.',
       'auth/too-many-requests': 'Too many failed attempts. Please try again later.',
       'permission-denied': 'You do not have permission to access this data.',
       'unavailable': 'Service temporarily unavailable. Please try again.',
     };
     
     return errorMapping[error.code] || `An error occurred: ${error.message}`;
   };

   export default app;
   ```

   **Firebase Configuration Validation:**
   ```javascript
   // src/utils/validateFirebaseConfig.js
   export const validateFirebaseConnection = async () => {
     try {
       // Test Firestore connection
       await db.collection('test').limit(1).get();
       
       // Test Auth connection  
       await auth.onAuthStateChanged(() => {});
       
       console.log('✅ Firebase connection validated');
       return { success: true };
     } catch (error) {
       console.error('❌ Firebase connection failed:', error);
       return { success: false, error: error.message };
     }
   };
   ```

## Phase 2: Database Schema Design & Data Modeling

### 2.1 Current Mock System Analysis

**Existing clients.json Structure (Mock Data Only):**
```javascript
// Current mock structure from src/data/clients.json
// NOTE: These are demo/testing clients, not real users
{
  "id": "client1",                    // Mock ID - for testing only
  "password": "garfish-init",         // Demo password - for window shoppers
  "clientName": "Your Name Here",     // Placeholder name
  "project": "Your Future Project",   // Demo project name
  "path": "garfish-client-init.netlify.app", // Demo URL
  "status": "active",                 // Mock status
  "lastLogin": null,                  // No real login history
  "milestones": [...],               // Demo milestones for UI testing
  "documents": {...},                // Demo document links
  "payments": [...]                  // Mock payment data
}

// ⚠️ IMPORTANT: No real client data exists - safe to replace entirely
```

### 2.2 Enhanced Firestore Schema Design

**Primary Collection: `/clients/{clientId}`**
```javascript
// Document structure for each client
{
  // === Core Client Information ===
  id: string,                     // Original client ID (client1, client3, etc.)
  email: string,                  // Generated: {id}@garf.is or custom email
  clientName: string,             // Display name ("Ali Carrollton")
  project: string,                // Project name ("Velvet Quill")
  path: string,                   // Project URL ("velvet-quill.netlify.app")
  status: string,                 // "active" | "inactive" | "completed"
  
  // === Authentication & Access ===
  firebaseUid: string,            // Firebase Auth UID
  originalPassword: string,       // Original password (encrypted, for reference)
  welcomeModalShown: boolean,     // Track if welcome modal was displayed
  requiresPasswordReset: boolean, // Force password change on first login
  
  // === Timestamps ===
  createdAt: timestamp,
  lastLogin: timestamp,
  updatedAt: timestamp,
  
  // === Implementation Metadata ===
  createdVia: string,             // "firebase_implementation" | "admin_created"
  implementationVersion: string,  // Track implementation version
  onboardingCompleted: boolean    // Track if client completed onboarding flow
}
```

**Sub-Collection: `/clients/{clientId}/milestones/{milestoneId}`**
```javascript
{
  // === Core Milestone Data ===
  section: string,                // "Discovery", "Design", "Development", etc.
  milestone: string,              // "Requirements Gathering", "Visual Design", etc.
  status: string,                 // "Completed", "In Progress", "Pending"
  dateCompleted: string,          // ISO date string or empty string
  
  // === Organization & Tracking ===
  order: number,                  // Sort order within project (0, 1, 2, ...)
  sectionOrder: number,           // Order within section for grouping
  estimatedHours: number,         // Optional: time estimation
  actualHours: number,            // Optional: time tracking
  
  // === Additional Metadata ===
  notes: string,                  // Optional: internal notes
  clientVisible: boolean,         // Whether client can see this milestone
  priority: string,               // "high", "medium", "low"
  
  // === Timestamps ===
  createdAt: timestamp,
  updatedAt: timestamp,
  completedAt: timestamp          // Actual completion timestamp
}
```

**Sub-Collection: `/clients/{clientId}/payments/{paymentId}`**
```javascript
{
  // === Core Payment Information ===
  id: string,                     // Original payment ID ("inv_001", "inv_002")
  description: string,            // "Phase 1 - Development"
  amount: number,                 // Amount in cents (2500 = $25.00)
  currency: string,               // "usd" (for future international support)
  
  // === Payment Status & Dates ===
  status: string,                 // "pending", "paid", "overdue", "cancelled"
  dueDate: string,               // ISO date string
  paidDate: string,              // ISO date string (optional)
  
  // === Stripe Integration ===
  stripePaymentIntentId: string, // Stripe payment intent ID (optional)
  stripeInvoiceId: string,       // Future: Stripe invoice integration
  paymentMethod: string,         // "card", "bank_transfer", etc.
  
  // === Additional Metadata ===
  notes: string,                 // Internal notes
  clientNotes: string,           // Notes visible to client
  remindersSent: number,         // Count of reminder emails sent
  
  // === Timestamps ===
  createdAt: timestamp,
  updatedAt: timestamp,
  paidAt: timestamp              // Actual payment timestamp
}
```

**Sub-Collection: `/clients/{clientId}/documents/{documentId}`**
```javascript
{
  // === Core Document Information ===
  id: string,                    // "scope", "agreement", "handoff"
  type: string,                  // Document category
  title: string,                 // Human-readable title
  description: string,           // Document description for client
  
  // === File Information ===
  url: string,                   // Full URL to document
  filename: string,              // Original filename
  fileSize: number,              // File size in bytes
  mimeType: string,              // "application/pdf", etc.
  
  // === Access & Security ===
  clientVisible: boolean,        // Whether client can access
  requiresAuthentication: boolean, // Always true for this system
  downloadCount: number,         // Track access
  
  // === Version Control ===
  version: string,               // Document version ("1.0", "1.1", etc.)
  isLatest: boolean,             // Current version flag
  
  // === Timestamps ===
  uploadedAt: timestamp,
  createdAt: timestamp,
  updatedAt: timestamp,
  lastAccessedAt: timestamp
}
```

### 2.3 Additional Collections (Future Enhancement)

**Admin Collection: `/admin/settings`**
```javascript
{
  // === System Settings ===
  maintenanceMode: boolean,
  welcomeModalEnabled: boolean,
  paymentGatewayEnabled: boolean,
  
  // === Email Templates ===
  emailTemplates: {
    welcome: string,
    paymentReminder: string,
    projectUpdate: string
  },
  
  // === Analytics ===
  totalClients: number,
  totalProjects: number,
  lastMigration: timestamp
}
```

**Analytics Collection: `/analytics/events/{eventId}`**
```javascript
{
  clientId: string,
  event: string,                 // "login", "payment", "document_access"
  metadata: object,              // Event-specific data
  timestamp: timestamp,
  userAgent: string,
  ip: string                     // Anonymized
}
```

### 2.4 Schema Validation Rules

**Create validation functions:**
```javascript
// src/utils/schemaValidation.js
export const validateClientData = (clientData) => {
  const required = ['id', 'email', 'clientName', 'project', 'status'];
  const missing = required.filter(field => !clientData[field]);
  
  if (missing.length > 0) {
    throw new Error(`Missing required fields: ${missing.join(', ')}`);
  }
  
  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(clientData.email)) {
    throw new Error('Invalid email format');
  }
  
  // Validate status
  const validStatuses = ['active', 'inactive', 'completed'];
  if (!validStatuses.includes(clientData.status)) {
    throw new Error(`Invalid status. Must be one of: ${validStatuses.join(', ')}`);
  }
  
  return true;
};

export const validateMilestoneData = (milestoneData) => {
  const required = ['section', 'milestone', 'status', 'order'];
  const missing = required.filter(field => milestoneData[field] === undefined);
  
  if (missing.length > 0) {
    throw new Error(`Missing required milestone fields: ${missing.join(', ')}`);
  }
  
  return true;
};
```

### 2.5 Mock Data Import System (Optional)

**Note:** Since the existing data is mock/demo data, this script is optional and primarily useful for:
- Testing the Firebase implementation
- Preserving demo data structure for development
- Validating the import process before real clients

**Setup (Optional):**

1. **Create Import Environment:**
   ```bash
   # Create dedicated import directory for testing
   mkdir scripts/import
   cd scripts/import
   
   # Create backup of mock data (for reference)
   cp ../../src/data/clients.json ./mock_data_backup_$(date +%Y%m%d_%H%M%S).json
   
   # Create import logs directory
   mkdir logs
   ```

2. **Mock Data Import Script (For Testing):**
   ```javascript
   // scripts/import/importMockData.js
   // NOTE: This script imports mock data for testing purposes only
   import { initializeApp, cert, getApps } from 'firebase-admin/app';
   import { getFirestore } from 'firebase-admin/firestore';
   import { getAuth } from 'firebase-admin/auth';
   import fs from 'fs';
   import crypto from 'crypto';
   import { validateClientData, validateMilestoneData } from '../../src/utils/schemaValidation.js';

   // === Configuration ===
   const IMPORT_CONFIG = {
     skipMockData: true,            // Skip client1 (garfish-init demo)
     importDemoData: false,         // Import as demo data only
     createTestUsers: true,         // Create actual test users
     batchSize: 2,                  // Small batch for mock data
     retryAttempts: 3,
     dryRun: true                   // Default to dry run for safety
   };

   const IMPORT_LOG = {
     started: new Date().toISOString(),
     purpose: 'Mock data import for testing',
     clients: {
       total: 0,
       successful: 0,
       failed: 0,
       errors: []
     },
     milestones: {
       total: 0,
       successful: 0,
       failed: 0
     },
     payments: {
       total: 0,
       successful: 0,
       failed: 0
     },
     documents: {
       total: 0,
       successful: 0,
       failed: 0
     }
   };

   // === Firebase Setup ===
   const serviceAccount = {
     type: "service_account",
     project_id: process.env.FIREBASE_PROJECT_ID,
     private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
     private_key: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
     client_email: process.env.FIREBASE_CLIENT_EMAIL,
     client_id: process.env.FIREBASE_CLIENT_ID,
     auth_uri: "https://accounts.google.com/o/oauth2/auth",
     token_uri: "https://oauth2.googleapis.com/token",
   };

   // Initialize Firebase Admin (avoid multiple initializations)
   const app = getApps().length === 0 ? initializeApp({
     credential: cert(serviceAccount),
     projectId: process.env.FIREBASE_PROJECT_ID
   }) : getApps()[0];

   const db = getFirestore(app);
   const auth = getAuth(app);

   // === Utility Functions ===
   function generateEmail(clientId, clientName) {
     // Try to generate a reasonable email from client name
     if (clientName && clientName !== 'Your Name Here') {
       const cleanName = clientName.toLowerCase()
         .replace(/[^a-z0-9\s]/g, '')
         .replace(/\s+/g, '.');
       return `${cleanName}@client.garfishdigital.com`;
     }
     return `${clientId}@client.garfishdigital.com`;
   }

   function generateDataHash(data) {
     return crypto.createHash('md5').update(JSON.stringify(data)).digest('hex');
   }

   async function retryOperation(operation, maxRetries = MIGRATION_CONFIG.retryAttempts) {
     for (let attempt = 1; attempt <= maxRetries; attempt++) {
       try {
         return await operation();
       } catch (error) {
         console.log(`Attempt ${attempt} failed:`, error.message);
         if (attempt === maxRetries) {
           throw error;
         }
         // Exponential backoff
         await new Promise(resolve => setTimeout(resolve, Math.pow(2, attempt) * 1000));
       }
     }
   }

   // === Import Functions ===
   async function importMockClient(client, index) {
     console.log(`\n--- Importing Mock Client ${index + 1}: ${client.clientName} (${client.id}) ---`);
     console.log(`⚠️  NOTE: This is mock/demo data, not a real client`);
     
     try {
       // Validate client data
       validateClientData(client);
       
       // Generate test email for mock data
       const email = `test-${client.id}@demo.garfishdigital.com`;

       // === Step 1: Create Firebase Auth User ===
       console.log('Creating Firebase Auth user...');
       const userRecord = await retryOperation(async () => {
         // Check if user already exists
         try {
           const existingUser = await auth.getUser(client.id);
           console.log('User already exists, skipping auth creation');
           return existingUser;
         } catch (error) {
           if (error.code === 'auth/user-not-found') {
             // Create new user
             return await auth.createUser({
               uid: client.id,
               email: email,
               password: client.password, // Mock password
               displayName: `[DEMO] ${client.clientName}`,
               emailVerified: false       // Test account
             });
           }
           throw error;
         }
       });

       if (!MIGRATION_CONFIG.dryRun) {
         // === Step 2: Create Client Document ===
         console.log('Creating client document...');
         const clientRef = db.collection('clients').doc(client.id);
         
         const clientDocData = {
           id: client.id,
           email: userRecord.email,
           clientName: client.clientName,
           project: client.project,
           path: client.path,
           status: client.status || 'active',
           
           // Authentication metadata
           firebaseUid: userRecord.uid,
           originalPassword: crypto.createHash('sha256').update(client.password).digest('hex'),
           welcomeModalShown: client.password === 'garfish-init' ? false : true,
           requiresPasswordReset: false, // Mock data doesn't need password reset
           isDemoAccount: true,          // Mark as demo/test account
           
           // Timestamps
           createdAt: new Date(),
           lastLogin: client.lastLogin ? new Date(client.lastLogin) : null,
           updatedAt: new Date(),
           
           // Implementation metadata
           createdVia: 'mock_data_import',
           implementationVersion: '1.0',
           originalDataHash: generateDataHash(client),
           importedAt: new Date()
         };

         await retryOperation(async () => {
           await clientRef.set(clientDocData);
         });

         // === Step 3: Migrate Milestones ===
         console.log(`Migrating ${client.milestones?.length || 0} milestones...`);
         if (client.milestones) {
           const milestonePromises = client.milestones.map(async (milestone, milestoneIndex) => {
             try {
               validateMilestoneData({ ...milestone, order: milestoneIndex });
               
               const milestoneData = {
                 section: milestone.section,
                 milestone: milestone.milestone,
                 status: milestone.status,
                 dateCompleted: milestone.dateCompleted || '',
                 order: milestoneIndex,
                 sectionOrder: milestoneIndex, // TODO: Calculate proper section order
                 clientVisible: true,
                 priority: 'medium',
                 notes: '',
                 createdAt: new Date(),
                 updatedAt: new Date(),
                 completedAt: milestone.dateCompleted ? new Date(milestone.dateCompleted) : null
               };

               await retryOperation(async () => {
                 await clientRef.collection('milestones').add(milestoneData);
               });
               
               MIGRATION_LOG.milestones.successful++;
             } catch (error) {
               console.error(`Failed to migrate milestone ${milestoneIndex}:`, error.message);
               MIGRATION_LOG.milestones.failed++;
               MIGRATION_LOG.clients.errors.push({
                 clientId: client.id,
                 type: 'milestone',
                 index: milestoneIndex,
                 error: error.message
               });
             }
           });

           await Promise.allSettled(milestonePromises);
           MIGRATION_LOG.milestones.total += client.milestones.length;
         }

         // === Step 4: Migrate Payments ===
         console.log(`Migrating ${client.payments?.length || 0} payments...`);
         if (client.payments) {
           for (const payment of client.payments) {
             try {
               const paymentData = {
                 id: payment.id,
                 description: payment.description,
                 amount: typeof payment.amount === 'number' ? payment.amount * 100 : parseInt(payment.amount) * 100, // Convert to cents
                 currency: 'usd',
                 status: payment.status,
                 dueDate: payment.dueDate,
                 paidDate: payment.paidDate || '',
                 paymentMethod: 'card',
                 notes: '',
                 clientNotes: '',
                 remindersSent: 0,
                 createdAt: new Date(),
                 updatedAt: new Date(),
                 paidAt: payment.paidDate ? new Date(payment.paidDate) : null
               };

               await retryOperation(async () => {
                 await clientRef.collection('payments').doc(payment.id).set(paymentData);
               });
               
               MIGRATION_LOG.payments.successful++;
             } catch (error) {
               console.error(`Failed to migrate payment ${payment.id}:`, error.message);
               MIGRATION_LOG.payments.failed++;
               MIGRATION_LOG.clients.errors.push({
                 clientId: client.id,
                 type: 'payment',
                 paymentId: payment.id,
                 error: error.message
               });
             }
           }
           MIGRATION_LOG.payments.total += client.payments.length;
         }

         // === Step 5: Migrate Documents ===
         console.log(`Migrating ${Object.keys(client.documents || {}).length} documents...`);
         if (client.documents) {
           for (const [type, url] of Object.entries(client.documents)) {
             try {
               const filename = url.split('/').pop();
               const documentData = {
                 id: type,
                 type: type,
                 title: `${type.charAt(0).toUpperCase() + type.slice(1)} Document`,
                 description: `${client.project} ${type} document`,
                 url: url,
                 filename: filename,
                 fileSize: 0, // TODO: Fetch actual file size
                 mimeType: 'application/pdf',
                 clientVisible: true,
                 requiresAuthentication: true,
                 downloadCount: 0,
                 version: '1.0',
                 isLatest: true,
                 uploadedAt: new Date(),
                 createdAt: new Date(),
                 updatedAt: new Date(),
                 lastAccessedAt: null
               };

               await retryOperation(async () => {
                 await clientRef.collection('documents').doc(type).set(documentData);
               });
               
               MIGRATION_LOG.documents.successful++;
             } catch (error) {
               console.error(`Failed to migrate document ${type}:`, error.message);
               MIGRATION_LOG.documents.failed++;
               MIGRATION_LOG.clients.errors.push({
                 clientId: client.id,
                 type: 'document',
                 documentType: type,
                 error: error.message
               });
             }
           }
           MIGRATION_LOG.documents.total += Object.keys(client.documents).length;
         }
       }

       IMPORT_LOG.clients.successful++;
       console.log(`✅ Successfully imported mock client: ${client.clientName}`);
       
     } catch (error) {
       console.error(`❌ Failed to import mock client ${client.id}:`, error.message);
       IMPORT_LOG.clients.failed++;
       IMPORT_LOG.clients.errors.push({
         clientId: client.id,
         clientName: client.clientName,
         type: 'client',
         error: error.message,
         stack: error.stack
       });
     }
   }

   // === Main Import Function ===
   async function importMockData() {
     console.log('🚀 Starting Mock Data Import (Testing Only)...');
     console.log(`Configuration:`, IMPORT_CONFIG);
     
     try {
       // Load mock data
       const mockClientsData = JSON.parse(fs.readFileSync('../../src/data/clients.json', 'utf8'));
       
       // Filter out demo/init clients if configured
       const clientsData = IMPORT_CONFIG.skipMockData 
         ? mockClientsData.filter(client => client.password !== 'garfish-init')
         : mockClientsData;
         
       IMPORT_LOG.clients.total = clientsData.length;
       
       console.log(`Found ${clientsData.length} mock clients to import (${mockClientsData.length - clientsData.length} demo clients skipped)`);
       
       if (IMPORT_CONFIG.dryRun) {
         console.log('🧪 DRY RUN MODE - No data will be written to Firebase');
         console.log('ℹ️  This is MOCK DATA ONLY - no real clients affected');
       }

       // Process clients in batches
       for (let i = 0; i < clientsData.length; i += MIGRATION_CONFIG.batchSize) {
         const batch = clientsData.slice(i, i + MIGRATION_CONFIG.batchSize);
         console.log(`\n📦 Processing batch ${Math.floor(i / MIGRATION_CONFIG.batchSize) + 1}...`);
         
         // Process batch in parallel
         await Promise.allSettled(batch.map((client, index) => 
           importMockClient(client, i + index)
         ));
         
         // Delay between batches (except for last batch)
         if (i + MIGRATION_CONFIG.batchSize < clientsData.length) {
           console.log(`⏳ Waiting ${MIGRATION_CONFIG.delayBetweenBatches}ms before next batch...`);
           await new Promise(resolve => setTimeout(resolve, MIGRATION_CONFIG.delayBetweenBatches));
         }
       }

     } catch (error) {
       console.error('💥 Mock data import failed:', error);
       throw error;
     } finally {
       // Generate import report
       IMPORT_LOG.completed = new Date().toISOString();
       IMPORT_LOG.duration = new Date() - new Date(IMPORT_LOG.started);
       
       const reportPath = `./logs/mock_import_report_${new Date().toISOString().replace(/:/g, '-')}.json`;
       fs.writeFileSync(reportPath, JSON.stringify(IMPORT_LOG, null, 2));
       
       console.log('\n📊 Mock Data Import Report:');
       console.log(`Clients: ${IMPORT_LOG.clients.successful}/${IMPORT_LOG.clients.total} successful`);
       console.log(`Milestones: ${IMPORT_LOG.milestones.successful}/${IMPORT_LOG.milestones.total} successful`);
       console.log(`Payments: ${IMPORT_LOG.payments.successful}/${IMPORT_LOG.payments.total} successful`);
       console.log(`Documents: ${IMPORT_LOG.documents.successful}/${IMPORT_LOG.documents.total} successful`);
       console.log(`Report saved to: ${reportPath}`);
       console.log(`\n💡 Remember: This was MOCK DATA ONLY for testing purposes`);
       
       if (IMPORT_LOG.clients.errors.length > 0) {
         console.log(`\n⚠️  ${IMPORT_LOG.clients.errors.length} errors occurred during import`);
         console.log('Check the import report for detailed error information.');
       }
     }
   }

   // === Cleanup Function ===
   async function cleanupMockData() {
     console.log('🧹 Starting mock data cleanup...');
     
     try {
       // Delete all demo/test Firebase Auth users
       console.log('Deleting test Firebase Auth users...');
       const mockClientsData = JSON.parse(fs.readFileSync('../../src/data/clients.json', 'utf8'));
       
       for (const client of mockClientsData) {
         try {
           await auth.deleteUser(client.id);
           console.log(`Deleted test auth user: ${client.id}`);
         } catch (error) {
           if (error.code !== 'auth/user-not-found') {
             console.error(`Failed to delete test auth user ${client.id}:`, error.message);
           }
         }
       }
       
       // Delete all test Firestore documents
       console.log('Deleting test Firestore documents...');
       const batch = db.batch();
       
       for (const client of mockClientsData) {
         const clientRef = db.collection('clients').doc(client.id);
         batch.delete(clientRef);
         
         // Note: In production, also delete subcollections
       }
       
       await batch.commit();
       console.log('✅ Mock data cleanup completed');
       console.log('💡 Ready for real client implementation!');
       
     } catch (error) {
       console.error('❌ Cleanup failed:', error);
       throw error;
     }
   }

   // === CLI Interface ===
   const command = process.argv[2];
   
   switch (command) {
     case 'import':
       IMPORT_CONFIG.dryRun = false;
       importMockData().catch(console.error);
       break;
     case 'cleanup':
       cleanupMockData().catch(console.error);
       break;
     case 'dry-run':
       IMPORT_CONFIG.dryRun = true;
       importMockData().catch(console.error);
       break;
     default:
       console.log('Usage: node importMockData.js [import|cleanup|dry-run]');
       console.log('');
       console.log('Commands:');
       console.log('  import   - Import mock data to Firebase (for testing)');
       console.log('  cleanup  - Remove all mock data from Firebase');
       console.log('  dry-run  - Test import without writing data');
       console.log('');
       console.log('⚠️  NOTE: This script is for MOCK DATA ONLY');
       process.exit(1);
   }

   export { importMockData, cleanupMockData };
   ```

## Phase 3: Authentication System Implementation

### 3.1 Create Firebase Authentication Hook

**Replace the existing `useClientAuth` with `useFirebaseAuth`:**

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

### 3.2 Update Client Portal for Firebase Authentication

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

## Phase 4: Data Layer Implementation

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

## Phase 5: API Routes Implementation

### 5.1 Remove JSON-based API Routes

Delete these files (no longer needed with Firebase):
- `/api/stripe/update-invoice-status.js` (replaced by direct Firestore updates)
- Any other routes that modify `clients.json`

**Benefits of Firebase approach:**
- Direct client-side Firestore updates (faster, real-time)
- No need for API routes for basic CRUD operations
- Better security with Firestore rules
- Automatic offline support

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

### 8.2 Post-Implementation Tasks

1. **System Verification:**
   - Verify Firebase connection and rules
   - Test client registration flow
   - Validate payment processing integration

2. **Monitoring:**
   - Set up Firebase Analytics
   - Monitor authentication metrics
   - Track database performance
   - Set up error reporting

3. **Cleanup:**
   - Remove old `clients.json` file
   - Clean up unused JSON-based authentication code
   - Update documentation
   - Archive mock data import scripts

4. **Client Onboarding Preparation:**
   - Create client registration process
   - Design welcome email templates
   - Prepare client portal documentation

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

## Implementation Timeline

**Estimated Duration: 3-4 weeks** (faster than migration due to clean implementation)

- **Week 1:** Firebase setup, schema design, environment configuration
- **Week 2:** Authentication system implementation, UI updates
- **Week 3:** Data layer implementation, real-time features, testing
- **Week 4:** Security rules, deployment, monitoring setup

## Benefits of Clean Implementation

**Advantages over migration approach:**
- ✅ **No legacy constraints** - implement best practices from day one
- ✅ **No data integrity concerns** - no risk of corrupting real client data
- ✅ **Faster development** - no complex migration logic needed
- ✅ **Cleaner codebase** - no compatibility layers or legacy code
- ✅ **Better testing** - can break and rebuild without impact
- ✅ **Modern patterns** - latest Firebase features and React patterns

This comprehensive implementation will provide a robust, scalable, and secure foundation for the client portal with real data persistence, professional authentication capabilities, and a clean, maintainable codebase ready for real clients.