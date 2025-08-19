"use client";

import UserProfileCircle from "./UserProfileCircle";
import Header from "./Header";
import { useClientAuth } from "../contexts/ClientAuthContext";

export default function ClientLayout() {
  const { isClientAuthenticated, authenticatedClient, clearClientAuthentication } = useClientAuth();
  
  // Debug logging
  console.log('ClientLayout render:', { 
    isClientAuthenticated, 
    authenticatedClient,
    clientName: authenticatedClient?.clientName 
  });
  
  return (
    <>
      <Header />
      <UserProfileCircle 
        isLoggedIn={isClientAuthenticated} 
        clientName={authenticatedClient?.clientName}
        clientProject={authenticatedClient?.project}
        clientPath={authenticatedClient?.path}
        onSignOut={clearClientAuthentication}
      />
    </>
  );
}