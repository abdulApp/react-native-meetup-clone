import Feather from '@expo/vector-icons/Feather';
import dayjs from 'dayjs';
import { Link } from 'expo-router';
import { View, Text, Image, Pressable } from 'react-native';
import { useEffect, useState } from 'react';

// @ts-ignore
export default function EventListItem({ event }) {
  const [numberOfAttendees, setNumberOfAttendees] = useState(0);

  useEffect(() => {
    fetchNumberOfAttendees();
  }, [event.id]);

  const fetchNumberOfAttendees = async () => {

  }
  return (
    <>
      <Link
        //@ts-ignore
        href={`/${event.id}`}
        asChild>
        <Pressable className="m-3 gap-3 border-b-2 border-gray-100 pb-3">
          <View className="flex-row">
            <View className="flex-1 gap-2">
              <Text className="text-lg font-semibold uppercase text-amber-800">
                {dayjs(event.date).format('ddd, D MMM')} · {dayjs(event.date).format('h:mm A')}
              </Text>
              <Text className="text-xl font-bold">{event.title}</Text>
              <Text className="text-gray-700">{event.location}</Text>
            </View>

            {/* Events Image */}
            <Image source={{ uri: event.image_url }} className="aspect-video w-2/5 rounded-xl" />
          </View>

          {/* Footer */}
          <View className="flex-row gap-3">
            <Text className="mr-auto text-gray-700">{numberOfAttendees} going</Text>
            <Feather name="share" size={20} color="gray" />
            <Feather name="bookmark" size={24} color="gray" />
          </View>
        </Pressable>
      </Link>
    </>
  );
}
