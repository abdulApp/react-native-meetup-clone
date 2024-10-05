import React from 'react';
import { Text } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

export default function EventAttendance() {
  const { id } = useLocalSearchParams();
  return (
    <Text>Hello</Text>
  )
}