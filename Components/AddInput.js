import React, { useState } from "react";
import { View } from "react-native";
import styled from "styled-components";
import * as ImagePicker from 'expo-image-picker';
import { AntDesign } from "@expo/vector-icons";

export default function AddInput({ submitHandler }) {
  const [value, setValue] = useState("");
const [imageUri, setImageUri] = useState(null); // 此处定义了 imageUri 状态和 setImageUri 函数

  const onChangeText = (text) => {
    setValue(text);
  };
const pickImage = async () => {
  try {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled && result.assets && result.assets.length > 0) {
      const uri = result.assets[0].uri;
      setImageUri(uri); // 使用 setImageUri 更新 imageUri 状态
      return uri;
    } else {
      console.log('No image selected');
    }
  } catch (error) {
    console.error("Error picking an image: ", error);
  }
};


  const handleSubmission = async () => {
    const uri = await pickImage(); // 等待用户选择图片
    if (uri) {
      submitHandler(value, uri); // 传递文本值和图片 URI
    } else {
      console.log('No image selected');
    }
  };

  return (
    <ComponentContainer>
      <InputContainer>
        <Input placeholder="Add Task..." onChangeText={onChangeText} />
      </InputContainer>
      <SubmitButton onPress={handleSubmission}
      >
        <AntDesign name="plus" size={24} color="midnightblue" />
      </SubmitButton>
    </ComponentContainer>
  );
}

const ComponentContainer = styled.View`
  flex-direction: row;
`;

const InputContainer = styled.View`
  flex-direction: row;
  border-radius: 10px;
`;

const Input = styled.TextInput`
  font-family: poppins-regular;
  font-size: 20px;
  background-color: white;
  width: 300px;
  margin-right: 20px;
  padding: 10px;
  margin-bottom: 20px;
  border-radius: 10px;
`;

const SubmitButton = styled.TouchableOpacity`
  width: 50px;
  justify-content: center;
  align-items: center;
  background-color: whitesmoke;
  margin-bottom: 20px;
  border-radius: 50px;
`;
