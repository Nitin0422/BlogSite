import { useAuth } from "@/context/AuthProvider";
import React from "react";
import { Navigate } from "react-router-dom";
import Loader from "./Loader";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    // Render a loading indicator or nothing while authentication is loading
    return (
      <div className="w-screen h-screen grid items-center">
        <Loader />
      </div>
    );
  }

  if (!user) {
    console.log("No user found... Redirecting to login page.");
    return <Navigate to="/login" replace />;
  }

  // If the user is logged in, render the children components
  return <>{children}</>;
};

export default ProtectedRoute;
