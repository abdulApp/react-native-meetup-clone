import Feather from '@expo/vector-icons/Feather';
import { black } from 'colorette';
import { Stack } from 'expo-router';
import { View, Text, Image, FlatList } from 'react-native';

import events from '~/assets/events.json';
import EventListItem from '~/components/EventListItem';
import { supabase } from '~/utils/supabase';
import { useEffect } from 'react';

export default function Home() {
  useEffect(() => {
    fetchEvents();
  }, []);
  const fetchEvents = async () => {
    const { data: events, error } = await supabase.from('events').select('*');
    console.warn(events);
    console.log(error)
  };
  return (
    <>
      <Stack.Screen options={{ title: 'Events' }} />
      <FlatList
        className="bg-white"
        data={events}
        renderItem={({ item }) => <EventListItem event={item} />}
      />
    </>
  );
}
