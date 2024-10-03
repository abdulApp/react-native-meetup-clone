import { ReactNode } from 'react';
import { Redirect, Stack } from 'expo-router';
import Auth from '~/app/(auth)/login';
import { useAuth } from '~/contexts/AuthProvider';

export default function AuthLayout(
  // { children }: { children: ReactNode }
) {

  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Redirect href="/" />;
  }
  return <Stack />
}