import { useAuth } from '@/context/AuthProvider'
import React from 'react'
import { Navigate } from 'react-router-dom';


interface BlockedAfterLoginProps {
    children: React.ReactNode;
  }
  
  const BlockedAfterLogin: React.FC<BlockedAfterLoginProps> = ({ children }) => {
    const { user, loading } = useAuth();
  
    if (loading) {
      // Render a loading indicator or nothing while authentication is loading
      return <div>Loading...</div>;
    }
  
    if (user) {
      return <Navigate to="/" replace />;
    }
  
    // If the user is logged in, render the children components
    return <>{children}</>;
  };
  
  export default BlockedAfterLogin;
  
