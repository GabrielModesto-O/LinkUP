import React, { useState, useEffect, useMemo } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, Alert, Button, FlatList, SafeAreaView, Image, ActivityIndicator} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import { useNavigation, RouteProp } from '@react-navigation/native';
import { StackTypes } from '../../routers/stack';
import { supabase } from '../../lib/supabase'
import { Session } from '@supabase/supabase-js'
import {Picker} from '@react-native-picker/picker';
import { styles } from './styles';
import { ChatScreen } from '../chatScreen';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';






interface UserDetails {
    uid: any;
    id: any;
    name: string;
    lastname: string;
    courseName: string;
    photobase64?:string;
   
   
  }

  interface UserDetailsWithLastMessage extends UserDetails {
    lastMessage?: LastMessage;
  }

  type User = {
    
    id: any;
    name: string;
    lastname: string;
    courseName: string;
    courseId?:string;
    photobase64?:string;
  };


  type LastMessage = {
    id: any;
    sender_id: any;
    receiver_id: any;
    created_at: any;
    messages: any;
  };
  
  
  type RootStackParamList = {
    MessageList: { user: User};
    ChatScreen: { contactId: string; username: string; user: Session; currentUser: Session };
    session: Session;
  };
  
  type UserProfileScreenRouteProp = RouteProp<RootStackParamList, 'MessageList'>;
  
  type Props = {
    route: UserProfileScreenRouteProp;
  };
  




  export function MessageList({ route }: any) {
    const navigation = useNavigation<StackTypes>();
    const [userDetails, setUserDetails] = useState<UserDetails[]>([]);
    const [lastMessages, setLastMessages] = useState<any>([]);
    const [loading, setLoading] = useState(true)
    const currentUser = route.params.currentUser;
  
    useEffect(() => {
      const fetchUserDetails = async () => {
        try {
          const { data: users, error } = await supabase
            .from('users')
            .select('id, uid, name, lastname, courseName, photobase64')
            .not('uid', 'eq', currentUser.user.id);
  
          if (error) {
            throw error;
          }
  
          if (users) {
            
            const formattedUsers: UserDetails[] = users.map((user: any) => ({
              id: user.id,
              uid: user.uid,
              name: user.name,
              lastname: user.lastname,
              courseName: user.courseName,
              photobase64: user.photobase64,
            }));

            
            
            setUserDetails(formattedUsers);
            fetchLastMessages(formattedUsers)
            
          }
        } catch (error) {
          console.error(error);
        }
      };
  
      const fetchLastMessages = async (users: UserDetails[]) => {
        try {
          const allLastMessages: LastMessage[] = [];
  
          for (const user of users) {
            const { data, error } = await supabase
              .from('chatMessages')
              .select('id, sender_id, receiver_id, created_at, messages')
              .or(`sender_id.eq.${user.uid},receiver_id.eq.${user.uid}`)
              .or(`sender_id.eq.${currentUser.user.id},receiver_id.eq.${currentUser.user.id}`)
              .order('created_at', { ascending: false })
              .limit(1);
  
            if (error) {
              throw error;
            }
  
            if (data && data.length > 0) {
              allLastMessages.push(data[0]);
            }
          }

          setLastMessages(allLastMessages);
        } catch (error) {
          console.error("Error fetching last messages:", error);
        }

       

      };

     

      const channel = supabase
      .channel("Messages")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "chatMessages",
          
        },
        (payload:any) => {
          
          const newMessage = payload.new;
          
          setLastMessages((prevMessages: any) => [newMessage, ...prevMessages]);
        }
      )
      .subscribe();

    fetchUserDetails();

    return () => {supabase.removeChannel(channel);};

  
    }, [currentUser.user.id]);





    const filteredUsers = useMemo(() => {
      return userDetails
        .filter((user) => {
          return lastMessages.some(
            (msg:any) => msg.sender_id === user.uid || msg.receiver_id === user.uid
          );
        })
        .map((user) => {
          const lastMessage = lastMessages.find(
            (msg:any) => msg.sender_id === user.uid || msg.receiver_id === user.uid
          );
          return { ...user, lastMessage };
        });
    }, [userDetails, lastMessages]);
  
    const renderUserItem = ({ item }: { item: UserDetailsWithLastMessage }) => (
      <TouchableOpacity
        onPress={() => handleUserProfileNavigation(item)}
        style={styles.containerMessage}
      >
        <View style={styles.messageInfo}>
          {item.photobase64 ? (
            <Image source={{ uri: `${item.photobase64}` }} style={styles.userPhoto} />
          ) : (
            <Text>Foto</Text>
          )}
          <View style={styles.nameUserAndMessage}>
            <Text>{item.name} {item.lastname}</Text>
            {item.lastMessage ? (
              <Text>{item.lastMessage.messages}</Text>
            ) : (
              <Text>Sem mensagens</Text>
            )}
          </View>
        </View>
      </TouchableOpacity>

      
    );
  
    const handleUserProfileNavigation = (user: UserDetails) => {
      const userWithSession = {
        user,
        currentUser,
      };
      navigation.navigate('ChatScreen', userWithSession);
    };
  
    return (
      
      <View style={{ flex: 1 }}>
        <View style={styles.containerNav}>
            <TouchableOpacity style={styles.buttonback} onPress={() => navigation.goBack()}>
              <Icon name='arrowleft' size={30} style={{fontWeight:'bold', color: 'black'}} />
              <Text style={styles.textback}>Voltar</Text>
            </TouchableOpacity>
          </View>

        <FlatList
          data={filteredUsers}
          renderItem={renderUserItem}
          keyExtractor={(item) => item.id.toString()}
        />
      </View>
    );
  }