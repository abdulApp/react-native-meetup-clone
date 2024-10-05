import { useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Text } from 'react-native';

import { supabase } from '~/utils/supabase';

export default function EventAttendance() {
  const { id } = useLocalSearchParams();

  const [attendees, setAttendees] = useState(0);

  useEffect(() => {
    fetchAttendees();
  }, [id]);

  const fetchAttendees = async () => {
    const { data } = await supabase
      .from('attendance')
      .select('*', { count: 'exact', head: true })
      .eq('event_id', id);

    // @ts-ignore
    setAttendees(data);
  };
  return <Text>Hello</Text>;
}
