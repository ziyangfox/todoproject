import React, { useState } from 'react';
import { Button, Platform,View } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function DateTimePickerButton({ onDateTimeSelected }) {
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);  // 确保默认是 false

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setDate(currentDate);
    setShow(false);  // 用户选择一个日期后，隐藏时间选择器
    onDateTimeSelected(currentDate);
  };

  const showDatePicker = () => {
    setShow(true);  // 只有在这里设置 show 为 true
  };

  return (
    <View>
      <Button onPress={showDatePicker} title="Set reminder time" />
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode="datetime"
          is24Hour={true}
          display="default"
          onChange={onChange}
        />
      )}
    </View>
  );
}
