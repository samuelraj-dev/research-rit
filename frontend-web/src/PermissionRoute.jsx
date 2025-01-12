import React from 'react';
import { Navigate } from 'react-router-dom';
import { useUser } from './UserContext';
import LoadingPage from './pages/LoadingPage';

const PermissionRoute = ({ children, requiredPermissions }) => {
  const { user, loading, hasPermission } = useUser();

  if (loading) return <LoadingPage />;

  if (!user) return <Navigate to="/login" replace />;

  if (!hasPermission(requiredPermissions)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default PermissionRoute;
