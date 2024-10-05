import { useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { FlatList, Text, View } from 'react-native';

import { supabase } from '~/utils/supabase';

export default function EventAttendance() {
  const { id } = useLocalSearchParams();

  const [attendees, setAttendees] = useState([]);

  useEffect(() => {
    fetchAttendees();
  }, [id]);

  const fetchAttendees = async () => {
    const { data } = await supabase
      .from('attendance')
      .select('*, profiles(*)')
      .eq('event_id', id);

    // @ts-ignore
    setAttendees(data);
  };
  return (
    <>
      <FlatList
        data={attendees}
        renderItem={({ item }) => (
          <View>
            <Text>{item.profiles.full_name || 'User'}</Text>
          </View>
        )}
      />
    </>
  );
}
