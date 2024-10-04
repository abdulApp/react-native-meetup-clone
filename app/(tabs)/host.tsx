import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';

import { useAuth } from '~/contexts/AuthProvider';
import { supabase } from '~/utils/supabase';
import { Stack } from 'expo-router';

export default function Host() {
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  // @ts-ignore
  const { session } = useAuth();

  useEffect(() => {
    const fetchUserRole = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('profiles')
        .select('user_role')
        .eq('id', session?.user.id); // Assuming you have the user ID

      if (error) {
        console.error('Error fetching user role:', error);
      } else {
        setRole(data[0]?.user_role || 'No role assigned');
      }
      setLoading(false);
    };

    fetchUserRole();
  }, [session?.user.id]);

  if (loading) {
    return <Text>Loading...</Text>;
  }
  return (
    <>
      <Stack.Screen options={{ title: 'Profile' }} />
      <Text>User Role: {role}</Text>
    </>
  );
}
