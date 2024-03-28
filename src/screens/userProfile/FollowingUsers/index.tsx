import { supabase } from '../../../lib/supabase';
import React, { useState, useEffect } from 'react'
import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
import { Session } from '@supabase/supabase-js';
import { styles } from './styles';
import { User } from '../../../@types/user';
import { useNavigation } from '@react-navigation/native';
import { StackTypes } from '../../../routers/stack';


  


export function FollowingUsers({followingUser, session}:{followingUser:User[], session:Session}) {
  const navigation = useNavigation<StackTypes>()
  
  const RenderItem = ({ item, index }: { item: User; index: number }) => {
    const [isAddButtonPressed, setIsAddButtonPressed] = useState<boolean>(false)
    
    const  handleUserProfileNavigation = () => {
      const userWithSession:any = {
        user:item,
        currentUser:session
      }
      navigation.navigate('UserProfile', userWithSession )
    }
    return (
      <View style={styles.itemContainer}>
        <Image style={styles.profilePic} source={{ uri: item.photobase64 }} />
        <View style={styles.textContainer}>
          <View style={styles.friendNameContainer}>
            <Text style={styles.friendName}>{item.name} </Text>
            <Text style={styles.friendName}>{item.lastname}</Text>
          </View>
          <Text style={styles.friendCourse}>{item.courseName}</Text>
        </View>

        <View style={styles.itemButtonContainer}>
          { session.user.id != item.uid &&
            <TouchableOpacity style={[styles.button, styles.acceptButton]} onPress={() => handleUserProfileNavigation()}>
              <Text style={styles.buttonText}>Acessar perfil</Text>
            </TouchableOpacity>
          }
        </View>
      </View>
    );
  };
  
  return (
    <View style={styles.container}>
      <View style={styles.userSuggestionContainer} >
        {followingUser.length > 0 &&
          <FlatList
            data={followingUser}
            style={styles.flatList}
            renderItem={({ item, index }) => <RenderItem item={item} index={index} />}
            keyExtractor={(friend:User) => friend.uid.toString()}
          /> 
        }
        {followingUser.length === 0 &&
          <Text>Este usuário ainda não segue ninguém.</Text>
        }
      </View>
    </View>
    
  );
}

