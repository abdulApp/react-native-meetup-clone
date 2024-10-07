import { Text, TextInput, View } from 'react-native';

export default function CreateEvent() {
  return (
    <View className='flex-1 bg-white p-5'>
      <Text>Create Event</Text>
      <TextInput placeholder="title" className="rounded-md bg-gray-200 p-3 px-8" />
    </View>
  );
}
