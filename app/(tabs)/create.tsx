import { Text, TextInput, View } from 'react-native';

export default function CreateEvent() {
  return (
    <View className="flex-1 gap-3 bg-white p-5">
      <Text>Create Event</Text>
      {/* Event Title*/}
      <TextInput placeholder="Title" className="rounded-md bg-gray-200 p-3 px-8" />
      <TextInput
        placeholder="Description"
        multiline
        numberOfLines={3}
        className="min-h-32 rounded-md bg-gray-200 p-3 px-8"
      />
    </View>
  );
}
