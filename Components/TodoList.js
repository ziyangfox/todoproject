import React from "react";
import { View,Text } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { ImageBackground } from 'react-native';
import { formatDistanceToNow } from 'date-fns'; 
import styled from 'styled-components/native';

export default function TodoList({ item, deleteItem }) {
const locationInfo = item.location
  ? `Lat: ${item.location.latitude}, Long: ${item.location.longitude}`
  : 'Not located';

  const remainingTime = item.reminder 
    ? formatDistanceToNow(new Date(item.reminder), { addSuffix: true })
    : 'No reminder set';


  return (
    <ComponentContainer>
     <ImageBackground
  source={{ uri: item.imageUri }}
  style={{ width: '100%', height: 200 }}
  onLoad={() => console.log('Image loaded')}
  onError={(error) => console.log('Error loading image', error)}
>
      <ListContainer >
        <CirlceContainer>
          <Entypo name="circle" size={20} color="midnightblue" />
        </CirlceContainer>
           <View>
            <TextItem>
              {item.value}
              <Text>{'\n'}{locationInfo}</Text>
              <Text>{'\n'}{remainingTime}</Text> {/* 显示剩余时间 */}
            </TextItem>
            <TextDate> Task</TextDate>
          </View>
        <IconContainer onPress={() => deleteItem(item.key)}>
          <MaterialIcons name="delete" size={24} color="midnightblue" />
        </IconContainer>
      </ListContainer>
      </ImageBackground>
    </ComponentContainer>
  );
}

const ListContainer = styled.TouchableOpacity`
  background-color: transparent; 
  height: auto;
  width: 350px;
  margin-bottom: 30px;
  border-radius: 10px;
  flex-direction: row;
  justify-content: space-between;
`;

const ComponentContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  height: auto;
  width: auto;
`;

const TextItem = styled.Text`
  color: black;
  width: 260px;
  height: auto;
  font-size: 20px;
  margin-top: 10px;
  margin-right: 20px;
  font-family: poppins-regular;
`;

const TextDate = styled.Text`
  color: goldenrod;
  font-size: 15px;
  margin-right: 20px;

  font-family: poppins-regular;
  border-radius: 10px;
  width: 40px;
`;

const IconContainer = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  margin-right: 10px;
  margin-top: 15px;

  height: 40px;

  border-radius: 10px;
`;

const CirlceContainer = styled.View`
  align-items: center;
  justify-content: center;
  padding-left: 5px;
`;
