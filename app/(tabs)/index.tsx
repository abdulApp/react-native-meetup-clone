import Feather from '@expo/vector-icons/Feather';
import { black } from 'colorette';
import { Stack } from 'expo-router';
import { FlatList } from 'react-native';

import EventListItem from '~/components/EventListItem';
import { supabase } from '~/utils/supabase';
import { useEffect, useState } from 'react';

export default function Home() {
  const [events, setEvents] = useState([]);
  useEffect(() => {
    fetchEvents();
  }, []);
  const fetchEvents = async () => {
    const { data, error } = await supabase.from('events').select('*');
    // @ts-ignore
    setEvents(data);
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
