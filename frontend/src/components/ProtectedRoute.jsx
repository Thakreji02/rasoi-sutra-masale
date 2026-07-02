import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('rasoi_sutra_admin_token');

  if (!token) {
    // Redirect to login page or handle simulated login triggers
    // For our specific single app, we will let AdminDashboard manage login,
    // but if routes are separate, we redirect them.
    // Let's make sure it handles checks correctly.
    return <Navigate to="/admin" replace />;
  }

  return children;
};

export default ProtectedRoute;
