import React, { useState, useEffect } from "react";
import { View, StatusBar, FlatList } from "react-native";
import styled from "styled-components";
import AddInput from "./Components/AddInput";
import TodoList from "./Components/TodoList";
import * as SplashScreen from 'expo-splash-screen';
import AppLoading from "expo-app-loading";
import Empty from "./Components/Empty";
import Header from "./Components/Header";
import * as Location from 'expo-location';
import DateTimePickerButton from './Components/DateTimePickerButton';

const getFonts = () =>
  Font.loadAsync({
    "poppins-regular": require("./assets/fonts/Poppins/Poppins-Regular.ttf"),
    "poppins-bold": require("./assets/fonts/Poppins/Poppins-Bold.ttf"),
  });

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  const [data, setData] = useState([]);

const submitHandler = async (value, imageUri) => {
  let location = await Location.getCurrentPositionAsync({}); // 获取当前位置

  const newTodo = {
    value: value,
    imageUri: imageUri,
    location: location.coords, // 存储位置坐标
    key: Math.random().toString(),
    reminder: reminder, // 存储用户选择的提醒时间
  };

  setData(prevTodo => [newTodo, ...prevTodo]);
};


const [reminder, setReminder] = useState(null);

const handleDateTimeSelected = (dateTime) => {
  setReminder(dateTime);
};

useEffect(() => {
  (async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      console.warn('Permission to access location was denied');
      return;
    }
    // 你可以在这里执行其他相关的位置操作
  })();
}, []);



  const deleteItem = (key) => {
    setData((prevTodo) => {
      return prevTodo.filter((todo) => todo.key != key);
    });
  };

  if (fontsLoaded) {
    return (
      <ComponentContainer>
        <View>
          <StatusBar barStyle="light-content" backgroundColor="midnightblue" />
        </View>

        <View>
          <FlatList
            data={data}
            ListHeaderComponent={() => <Header />}
            ListEmptyComponent={() => <Empty />}
            keyExtractor={(item) => item.key}
            renderItem={({ item }) => <TodoList item={item} deleteItem={deleteItem} />}
          />
          <View>
            <DateTimePickerButton onDateTimeSelected={handleDateTimeSelected} />
            <AddInput submitHandler={submitHandler} />
          </View>
        </View>
      </ComponentContainer>
    );
  } else {
    return (
      <AppLoading
        startAsync={getFonts}
        onFinish={() => {
          setFontsLoaded(true);
        }}
        onError={console.warn}
      />
    );
  }
}

const ComponentContainer = styled.View`
  background-color: midnightblue;
  height: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
