import 'react-native-url-polyfill/auto'
import React, { useState, useEffect } from 'react'
import { StatusBar, View, Text, TouchableOpacity, ScrollView, Alert, FlatList, SafeAreaView } from 'react-native'
import stylesInteresses from './stylesInteresses';
import Icon from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
import { StackTypes } from '../../../routers/stack';
import StyleDesenho from './StyleDesenho';
import myStatusBar from '../../../components/stylesGlobal/statusBarProgress';
import myPrincipalContainer from '../../../components/stylesGlobal/myPrincipalContainer';
import { supabase } from '../../../lib/supabase';
import { styles } from './styles';
import { Image } from 'react-native';
import { Interest } from '../../../@types/interest';

type FriendRequest = {
  uid: string;
  name: string;
  lastName:string;
  courseName: string;
  courseId:number;
  photobase64: string;
  isSuggestion?:boolean;
  isRequested?: boolean;

};
export const RenderItem = ({ item, index, handleFriendToStage }: { item: FriendRequest; index: number, handleFriendToStage:any }) => {
    const [isAddButtonPressed, setIsAddButtonPressed] = useState<boolean>(false)
    
    const handleAddButtonPress = (friend:FriendRequest) => {
      setIsAddButtonPressed(!isAddButtonPressed)
      handleFriendToStage(friend)
    };
  
    return (
      <View style={styles.itemContainer}>
        <Image style={styles.profilePic} source={{ uri: item.photobase64 }} />
        <View style={styles.textContainer}>
          <View style={styles.friendNameContainer}>
            <Text style={styles.friendName}>{item.name} </Text>
            <Text style={styles.friendName}>{item.lastName}</Text>
          </View>
          <Text style={styles.friendCourse}>{item.courseName}</Text>
        </View>

        <View style={styles.itemButtonContainer}>
          {!isAddButtonPressed && (
            <TouchableOpacity
              style={[styles.button, styles.acceptButton]}
              onPress={() => handleAddButtonPress(item)}
            >
              <Text style={styles.buttonText}>Seguir</Text>
            </TouchableOpacity>
          )}

          {isAddButtonPressed&& (
            <TouchableOpacity
              style={[styles.button, styles.acceptButton]}
              onPress={() => handleAddButtonPress(item)}
            >
              <Text style={styles.buttonText}>Cancelar</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  };