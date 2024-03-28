import React, { useState, useEffect, useCallback } from 'react';
import { GiftedChat, IMessage, Bubble, InputToolbar, Send } from 'react-native-gifted-chat';
import { supabase } from '../../lib/supabase';
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useNavigation, RouteProp } from '@react-navigation/native';
import { Session } from '@supabase/supabase-js'
import { Alert, Image, Text, TouchableOpacity, View } from 'react-native';
import { Avatar } from 'react-native-elements';
import { theme } from '../../theme';
import { styles } from './styles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/AntDesign';
import { StackTypes } from '../../routers/stack';
import moment from 'moment-timezone';


export type RootStackScreenProps<Screen extends keyof RootStackParamList> = NativeStackScreenProps<RootStackParamList, Screen>;

type User = {
  id: string;
  name: string;
  lastname: string;
  courseName: string;
  courseId?:string;
  photobase64?:string;
  
};

interface CustomMessage extends IMessage {
  _id: string;
  userId: string;
  contactId: string;
  text: string;
  createdAt: Date;
}

type RootStackParamList = {
  UserProfile: { user: User };
  ChatScreen: { contactId: string; username: string; user: Session; currentUser: Session };
  session: Session;
};

export interface Database {
  public: {
    Tables: {
      messages: {
        Row: {
          id: number
          created_at: string
          receiver_id: string
          sender_id: string
          messages: string
        }
        Insert: {
          id?: number
          created_at?: string
          receiver_id: string
          sender_id: string
          messages: string
        }
        Update: {
          id?: number
          created_at?: string
          receiver_id?: string
          sender_id?: string
          messages?: string
        }
      }
    }
  }
}

const formatTime = (createdAt: Date) => {
  const options: Intl.DateTimeFormatOptions = {
   hour: 'numeric',
   minute: 'numeric',
   hour12: false,
   timeZone: 'America/Sao_Paulo', 
 };

 return new Intl.DateTimeFormat('default', options).format(createdAt);
};
export const ChatScreen = ({ route }: any)  => {
  
  const { user }:{id: any, username:any, user: any} = route.params;
  const { currentUser }:{id: any, username:any, currentUser: Session} = route.params;
  const contactId = user.uid
  const userId = currentUser.user.id
  const [messages, setMessages] = useState<any>([]);
  const navigation = useNavigation<StackTypes>()

  
  useEffect(() => {
    const fetchMessages = async (userId: string, contactId: string) => {
      const { data, error } = await supabase
        .from("chatMessages")
        .select("*")
        .or(`sender_id.eq.${userId},receiver_id.eq.${userId}`)
        .or(`sender_id.eq.${contactId},receiver_id.eq.${contactId}`)
        .order("created_at", { ascending: false });
      if (error) {
        console.log("error", error.message);
        return [];
      } else {
        return data;
      }
    };

    const channel = supabase
      .channel("chatMessages")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "chatMessages",
          filter: `sender_id=eq.${contactId}`,
        },
        (payload) => {
          const newMessage = payload.new;
          if (newMessage.receiver_id === currentUser.user.id) {
            setMessages((prevMessages:any) => [newMessage, ...prevMessages]);
          }
        }
      )
      .subscribe();

    fetchMessages(userId, contactId).then(setMessages)
    return () => {supabase.removeChannel(channel);};
  }, [userId, contactId]);

  const onSend = useCallback(async (messages = []) => {
    const [message] = messages;
    const { text } = message;

    const { error, data } = await supabase
      .from("chatMessages")
      .insert({
        sender_id: currentUser?.user.id || "",
        receiver_id: contactId,
        messages: text,
      })
      .select("*");
    if (error) {
      Alert.alert("Server Error", error.message);
    } else {
      setMessages((prevMessages:any) => [data[0], ...prevMessages]);
    }
  }, []);

  const renderBubble = (props: any) => {
    const { currentMessage } = props;


    return (
      <Bubble
        {...props}
        textStyle={{
          right:styles.bubbleText,
          left:styles.bubbleText,
        }}
        wrapperStyle={{
          right: styles.bubbleStyleRight,
          left: styles.bubbleStyleLeft
        }}
        renderTime={() => (
          <Text style={styles.messageTime}>
            {formatTime(currentMessage.createdAt)}
          </Text>
        )}
        renderAvatar={() => (
          <Image
            source={{ uri: route.params.user.photobase64 }} // Replace with the actual prop name for the profile picture URL
          />
        )}
       
      />
    );
  };

  const renderInputToolbar = (props: any) => {
    // Customize the style of the input toolbar
    return (
      <InputToolbar
        {...props}
        containerStyle={styles.inputBar}
        placeholder="Digite sua mensagem..." // Change this to your desired placeholder text

      />
    );
  };

  const renderSend = (props: any) => {
    // Customize the send button
    return (
      <Send {...props}>
        <View style={styles.sendButton}>
          <Ionicons 
            name={'send'} 
            color={'#1EA0A1'}
            size={18}
          />
        </View>
      </Send>
    );
  };

  return (
    <>
    <View style={styles.containerNav}>
      <TouchableOpacity style={styles.buttonback} onPress={() =>  navigation.goBack()}>
        <Icon name='arrowleft' size={30} style={{fontWeight:'bold'}} />
        <Text style={styles.textback}>Voltar</Text>
      </TouchableOpacity>
    </View>

    <GiftedChat
      messages={messages.map((message:any) => ({
        _id: message.id,
        text: message.messages,
        createdAt: new Date(message.created_at),
        user: { 
          _id: message.sender_id,
          avatar: route.params.user.id === message.sender_id
            ? null
            : route.params.user.photobase64, 
        },
      }))}

      onSend={(messages: any) => onSend(messages)}
      user={{
        _id: currentUser?.user.id|| "",
        avatar: route.params.user.photobase64 
      }}

      showAvatarForEveryMessage={true}

      renderBubble={renderBubble}
      renderInputToolbar={renderInputToolbar}
      renderSend={renderSend}
    />
    </>
    
  );
};

