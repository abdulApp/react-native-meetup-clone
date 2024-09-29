import dayjs from 'dayjs';
import { useLocalSearchParams, Stack } from 'expo-router';
import { Image, Pressable, Text, View } from 'react-native';

import events from '~/assets/events.json';

export default function EventPage() {
  const { id } = useLocalSearchParams();

  const event = events.find((event) => event.id === id);

  if (!event) {
    return <Text>Event not found</Text>;
  }
  return (
    <View className="flex-1 bg-white p-3">
      <Stack.Screen
        options={{ title: event.title, headerBackTitleVisible: false, headerTintColor: 'red' }}
      />
      <Image source={{ uri: event.image }} className="aspect-video w-full rounded-xl" />
      <Text className="text-xl font-bold">{event.title}</Text>
      <Text className="text-lg font-semibold uppercase text-amber-800">
        {dayjs(event.datetime).format('ddd, D MMM')} · {dayjs(event.datetime).format('h:mm A')}
      </Text>
      <Text className="text-lg font-bold">{event.description}</Text>

      {/*  Footer */}
      <View className="absolute bottom-0 left-0 right-0 flex-row items-center justify-between border-t-2 border-gray-400 p-5 pb-10">
        <Text className="text-xl font-semibold">Free</Text>

        <Pressable className="rounded-md bg-red-400 p-5 px-8">
          <Text className="text-lg font-bold text-white">Join and RSVP</Text>
        </Pressable>
      </View>
    </View>
  );
}
