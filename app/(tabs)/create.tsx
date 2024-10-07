import { Text, TextInput, View } from 'react-native';

export default function CreateEvent() {
  return (
    <View>
      <Text>Create Event</Text>
      <TextInput placeholder="red" className="rounded-md bg-gray-500 p-3 px-8" />
    </View>
  );
}
