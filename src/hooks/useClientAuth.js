'use client';

import { useState, useEffect } from 'react';

export const useClientAuth = () => {
    const [isClientAuthenticated, setIsClientAuthenticated] = useState(false);
    const [authenticatedClient, setAuthenticatedClient] = useState(null);

    useEffect(() => {
        // Check authentication status and client data from localStorage
        const authStatus = localStorage.getItem('isClientAuthenticated');
        const clientData = localStorage.getItem('authenticatedClient');
        
        if (authStatus === 'true' && clientData) {
            try {
                const client = JSON.parse(clientData);
                setIsClientAuthenticated(true);
                setAuthenticatedClient(client);
            } catch (error) {
                // If parsing fails, clear invalid data
                localStorage.removeItem('isClientAuthenticated');
                localStorage.removeItem('authenticatedClient');
            }
        }
    }, []);

    const setClientAuthenticated = (client) => {
        if (client && typeof client === 'object') {
            // Store full client object
            localStorage.setItem('isClientAuthenticated', 'true');
            localStorage.setItem('authenticatedClient', JSON.stringify(client));
            setIsClientAuthenticated(true);
            setAuthenticatedClient(client);
        } else {
            // Fallback for boolean (backwards compatibility)
            localStorage.setItem('isClientAuthenticated', client.toString());
            setIsClientAuthenticated(client);
            if (!client) {
                setAuthenticatedClient(null);
            }
        }
    };

    const clearClientAuthentication = () => {
        localStorage.removeItem('isClientAuthenticated');
        localStorage.removeItem('authenticatedClient');
        setIsClientAuthenticated(false);
        setAuthenticatedClient(null);
    };

    return {
        isClientAuthenticated,
        authenticatedClient,
        setClientAuthenticated,
        clearClientAuthentication
    };
};