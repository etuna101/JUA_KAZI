import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

interface PrivateRouteProps {
  children: React.ReactNode;
  requiredRole?: 'customer' | 'provider';
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children, requiredRole }) => {
  const location = useLocation();
  
  // TODO: Replace with actual auth logic
  const isAuthenticated = false; // This should come from your auth context
  const userRole = 'customer'; // This should come from your auth context

  if (!isAuthenticated) {
    // Redirect to login page but save the attempted url
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (requiredRole && userRole !== requiredRole) {
    // Redirect to home if user doesn't have required role
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default PrivateRoute; 