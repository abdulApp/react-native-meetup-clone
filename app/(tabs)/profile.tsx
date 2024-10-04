import { Input } from '@rneui/themed';
import { Session } from '@supabase/supabase-js';
import { Stack } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Alert, Button, View, StyleSheet, TextInput, Text, Pressable } from 'react-native';

import { useAuth } from '~/contexts/AuthProvider';
import { supabase } from '~/utils/supabase';

export default function Profile() {
  // { session }: { session: Session }
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState('');
  const [website, setWebsite] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');

  // @ts-ignore
  const { session } = useAuth();

  useEffect(() => {
    if (session) getProfile();
  }, [session]);

  async function getProfile() {
    try {
      setLoading(true);
      if (!session?.user) throw new Error('No user on the session!');

      const { data, error, status } = await supabase
        .from('profiles')
        .select(`username, website, avatar_url`)
        .eq('id', session?.user.id)
        .single();
      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        setUsername(data.username);
        setWebsite(data.website);
        setAvatarUrl(data.avatar_url);
      }
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message);
      }
    } finally {
      setLoading(false);
    }
  }

  async function updateProfile({
    username,
    website,
    avatar_url,
  }: {
    username: string;
    website: string;
    avatar_url: string;
  }) {
    try {
      setLoading(true);
      if (!session?.user) throw new Error('No user on the session!');

      const updates = {
        id: session?.user.id,
        username,
        website,
        avatar_url,
        updated_at: new Date(),
      };

      const { error } = await supabase.from('profiles').upsert(updates);

      if (error) {
        throw error;
      }
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message);
      }
    } finally {
      setLoading(false);
    }
  }
  return (
    <View className="flex-1 gap-3 bg-white p-5">
      <Stack.Screen options={{ title: 'Profile' }} />

      <TextInput
        editable={false}
        value={session.user.email}
        placeholder="email"
        autoCapitalize="none"
        className="rounded-md border border-gray-200 p-3 text-gray-400"
      />

      <TextInput
        onChangeText={(text) => setUsername(text)}
        value={username}
        placeholder="username"
        autoCapitalize="none"
        className="rounded-md border border-gray-200 p-3"
      />

      <TextInput
        onChangeText={(text) => setWebsite(text)}
        value={website}
        placeholder="website"
        autoCapitalize="none"
        className="rounded-md border border-gray-200 p-3"
      />

      <Pressable
        onPress={() => updateProfile({ username, website, avatar_url: avatarUrl })}
        disabled={loading}
        className="items-center rounded-md border-2 border-red-500 p-3 px-8"
      >
        <Text className="text-lg font-bold text-red-500">
          {loading ? 'Loading ...' : 'Update'}
        </Text>
        {/*title={loading ? 'Loading ...' : 'Update'}*/}
      </Pressable>

      <View style={styles.container}>
        <View style={[styles.verticallySpaced, styles.mt20]}>
          <TextInput
            value={session?.user?.email}
            // disabled
          />
        </View>
        <View style={styles.verticallySpaced}>
          <TextInput value={username || ''} onChangeText={(text) => setUsername(text)} />
        </View>
        <View style={styles.verticallySpaced}>
          <TextInput value={website || ''} onChangeText={(text) => setWebsite(text)} />
        </View>

        <View style={[styles.verticallySpaced, styles.mt20]}>
          <Button
            title={loading ? 'Loading ...' : 'Update'}
            onPress={() => updateProfile({ username, website, avatar_url: avatarUrl })}
            disabled={loading}
          />
        </View>

        <View style={styles.verticallySpaced}>
          <Button title="Sign Out" onPress={() => supabase.auth.signOut()} />
        </View>
      </View>

      <Button title="Sign out" onPress={() => supabase.auth.signOut()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    padding: 12,
  },
  verticallySpaced: {
    paddingTop: 4,
    paddingBottom: 4,
    alignSelf: 'stretch',
  },
  mt20: {
    marginTop: 20,
  },
});
