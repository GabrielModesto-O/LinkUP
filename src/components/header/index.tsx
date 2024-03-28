import React from 'react';
import {Text, View, TouchableOpacity} from "react-native"
import { supabase } from '../../lib/supabase';
import AntDesignIcon from 'react-native-vector-icons/AntDesign'
import Icon from 'react-native-vector-icons/Ionicons'
import { useNavigation, RouteProp } from '@react-navigation/native';
import { StackTypes } from '../../routers/stack';
import { styles } from "./styles";
import {theme} from "../../theme";
import { PostCard } from '../PostCard';
import { Session } from '@supabase/supabase-js';
import { User } from '../../@types/user';



export const Header = ({ session, user }: { session: Session; user: User }) => {
    
    const  handleUserProfileNavigation = () => {
          const userWithSession = {
            user,
            currentUser:session
          }
          navigation.navigate('MessageList', userWithSession )
        }
    
    const navigation = useNavigation<StackTypes>();
    return (
        <View style={styles.header}>
            <TouchableOpacity style={styles.logoContainer}>
                <Text style={styles.logoText}>Link.UP</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.chatIconContainer} onPress={() => handleUserProfileNavigation()}>
                <Icon name='chatbubbles'  style={styles.chatIcon}/>
                <Text style={styles.upText}>Up</Text>
            </TouchableOpacity>
        </View>
    )
}
