import React, { useEffect, useState } from 'react'
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native"
import { styles } from "../styles"
import { supabase } from "../../../lib/supabase";
import { Session } from "@supabase/supabase-js";
import { useNavigation } from '@react-navigation/native';
import { StackTypes } from '../../../routers/stack';

export const RenderUsersOnCourses = ({ item, session }:{item:any, session:Session} ) => { 
  const [isFriend, setIsFriend] = useState<boolean>(false)
  const navigation = useNavigation<StackTypes>()
  
  const checkIfIsFriend = async () => {
    try {
      const {data, error} = await supabase 
      .from('friendsList')
      .select()
      .eq('userId', session.user.id)
      .eq('friendId', item.uid)
      if(error) throw error;
      if(data && data.length > 0){
        setIsFriend(true)
      }

    } catch (error) {
      console.log(error)
    }
  }
  checkIfIsFriend()

  const followUser = async (userToFollowUid:any) => {
      try {
        const { data, error } = await supabase
          .from('friendsList')
          .insert({ userId: session.user.id, friendId: userToFollowUid });
    
        if (error) {
          console.error('Erro ao adicionar amigo:', error.message);
        } else {
          setIsFriend(true)
          console.log('Amigo adicionado com sucesso:', data);
        }
      } catch (e:any) {
        console.error('Erro inesperado:', e.message);
      }
  };
  
  const stopFollow = async (userToStopFollowId:any) => {
  try {
      const { data, error } = await supabase
      .from('friendsList')
      .delete()
      .eq('userId', session.user.id)
      .eq('friendId', userToStopFollowId);
  
      if (error) {
      console.error('Erro ao cancelar solicitação:', error.message);
      } else {
      setIsFriend(false)
      console.log('Solicitação cancelada com sucesso:', data);
      }
  } catch (e:any) {
      console.error('Erro inesperado:', e.message);
  }
  };
  const  handleUserProfileNavigation = () => {
    const userWithSession = {
      user:item,
      currentUser:session
    }
    navigation.navigate('UserProfile', userWithSession )
  }
  return(
    <View style={styles.itemContainer}>
      <Image style={styles.profilePic} source={{ uri: item.photobase64 }} />
      <TouchableOpacity style={styles.textContainer} onPress={() => handleUserProfileNavigation()}>
        <View style={styles.friendNameContainer}>
          <Text style={styles.friendName}>{item.name} </Text>
          <Text style={styles.friendName}>{item.lastName}</Text>
        </View>
        <Text style={styles.friendCourse}>{item.courseName}</Text>
      </TouchableOpacity>
      <View style={styles.itemButtonContainer}>
        {
          !isFriend && item.uid != session.user.id &&
          <TouchableOpacity
            style={!item.isSuggestion? [styles.button, styles.acceptButton]: [styles.button, styles.acceptButtonSuggestion]}
            onPress={() => followUser(item.uid)}
          >
          <Text style={styles.buttonText}>Seguir</Text>
        </TouchableOpacity>
        }
          
        {
          isFriend && item.uid != session.user.id &&
          <TouchableOpacity
            style={!item.isSuggestion? [styles.button, styles.acceptButton]: [styles.button, styles.acceptButtonSuggestion]}
            onPress={() => stopFollow(item.uid)}
          >
          <Text style={styles.buttonText}>Deixar de seguir</Text>
        </TouchableOpacity>
        }
          
      </View>
    </View>
  )
};