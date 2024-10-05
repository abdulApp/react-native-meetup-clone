import dayjs from 'dayjs';
import { useLocalSearchParams, Stack } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Image, Pressable, Text, View } from 'react-native';

import { useAuth } from '~/contexts/AuthProvider';
import { supabase } from '~/utils/supabase';

export default function EventPage() {
  const { id } = useLocalSearchParams();

  const [event, setEvent] = useState(null);
  const [attendace, setAttendace] = useState(null);
  const [loading, setLoading] = useState(false);

  const { user } = useAuth();

  useEffect(() => {
    fetchEvent();
  }, [id]);

  const fetchEvent = async () => {
    setLoading(true);
    const { data, error } = await supabase.from('events').select('*').eq('id', id).single();
    setEvent(data);

    const { data: attendanceData } = await supabase
      .from('attendance')
      .select('*')
      .eq('user_id', user.id)
      .eq('event_id', id)
      .single();

    setAttendace(attendanceData);
    setLoading(false);
  };

  const joinEvent = async () => {
    const { data, error } = await supabase
      .from('attendance') //attendance
      .insert({ user_id: user.id, event_id: event.id })
      .select()
      .single();
  };

  if (loading) {
    return <ActivityIndicator />;
  }

  if (!event) {
    return <Text>Event not found</Text>;
  }
  return (
    <View className="flex-1 bg-white p-3">
      <Stack.Screen
        //@ts-ignore
        options={{ title: event.title, headerBackTitleVisible: false, headerTintColor: 'red' }}
      />
      <Image
        //@ts-ignore
        source={{ uri: event.image_url }}
        className="aspect-video w-full rounded-xl"
      />
      <Text className="text-xl font-bold">
        {
          //@ts-ignore
          event.title
        }
      </Text>
      <Text className="text-lg font-semibold uppercase text-amber-800">
        {
          //@ts-ignore
          dayjs(event.date).format('ddd, D MMM')
        }{' '}
        ·
        {
          //@ts-ignore
          dayjs(event.date).format('h:mm A')
        }
      </Text>
      <Text className="text-lg font-bold">
        {
          //@ts-ignore
          event.description
        }
      </Text>

      {/*  Footer */}
      <View className="absolute bottom-0 left-0 right-0 flex-row items-center justify-between border-t-2 border-gray-400 p-5 pb-10">
        <Text className="text-xl font-semibold">Free</Text>

        {attendace ? (
          <Text className='font-bold'>You are attending</Text>
        ) : (
          <Pressable onPress={() => joinEvent()} className="rounded-md bg-red-400 p-5 px-8">
            <Text className="text-lg font-bold text-white">Join and RSVP</Text>
          </Pressable>
        )}
      </View>
    </View>
  );
}
