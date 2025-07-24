'use client';

import { useState, useEffect } from 'react';

export const useClientAuth = () => {
    const [isClientAuthenticated, setIsClientAuthenticated] = useState(false);

    useEffect(() => {
        // Check authentication status from localStorage
        const authStatus = localStorage.getItem('isClientAuthenticated');
        setIsClientAuthenticated(authStatus === 'true');
    }, []);

    const setClientAuthenticated = (authenticated: boolean) => {
        localStorage.setItem('isClientAuthenticated', authenticated.toString());
        setIsClientAuthenticated(authenticated);
    };

    const clearClientAuthentication = () => {
        localStorage.removeItem('isClientAuthenticated');
        setIsClientAuthenticated(false);
    };

    return {
        isClientAuthenticated,
        setClientAuthenticated,
        clearClientAuthentication
    };
};