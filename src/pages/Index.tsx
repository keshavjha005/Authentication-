
import React from 'react';
import { AuthProvider, useAuth } from '@/contexts/AuthContext';
import AuthPage from '@/components/AuthPage';
import Dashboard from '@/components/Dashboard';

const AuthenticatedApp = () => {
  const { user } = useAuth();

  if (user) {
    return <Dashboard />;
  }

  return <AuthPage />;
};

const Index = () => {
  return (
    <AuthProvider>
      <AuthenticatedApp />
    </AuthProvider>
  );
};

export default Index;
