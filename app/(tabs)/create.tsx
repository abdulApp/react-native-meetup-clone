import { Text, TextInput, View } from 'react-native';
// import DatePicker from 'react-native-date-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useState } from 'react';

export default function CreateEvent() {

  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);

  const onChangeDate = (e, selectedDate: Date ) => {
    setDate(selectedDate)
  }
  return (
    <View className="flex-1 gap-3 bg-white p-5">
      <Text>Create Event</Text>
      {/* Event Title */}
      <TextInput placeholder="Title" className="rounded-md bg-gray-200 p-3 px-8" />
      {/* Event Description */}
      <TextInput
        placeholder="Description"
        multiline
        numberOfLines={3}
        className="min-h-32 rounded-md bg-gray-200 p-3 px-8"
      />


    </View>
  );
}
