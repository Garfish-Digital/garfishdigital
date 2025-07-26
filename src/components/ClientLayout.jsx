"use client";

import UserProfileCircle from "./UserProfileCircle";
import { useClientAuth } from "../contexts/ClientAuthContext";

export default function ClientLayout() {
  const { isClientAuthenticated, authenticatedClient, clearClientAuthentication } = useClientAuth();
  
  // Debug logging
  console.log('ClientLayout render:', { 
    isClientAuthenticated, 
    authenticatedClient: authenticatedClient?.clientName 
  });
  
  return (
    <UserProfileCircle 
      isLoggedIn={isClientAuthenticated} 
      clientName={authenticatedClient?.clientName}
      onSignOut={clearClientAuthentication}
    />
  );
}