import * as React from 'react';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Session } from '@supabase/supabase-js';
import { Feather, Entypo} from '@expo/vector-icons';
import { Feed } from '../screens/feed';
import { FriendList } from '../screens/friendRequestList';
import { Postagem } from '../screens/newPostScreen';
import { ConfigureProfile } from '../screens/configureProfile';
import { ProfileUser } from '../screens/profileUser';

const Tab = createBottomTabNavigator();

export function TabRoutes({ session }: { session: Session }){
  return(
      <Tab.Navigator screenOptions={{ headerShown: false}}>
        <Tab.Screen 
            name="Home"
            children={() => <Feed session={session}/>}
            options={{
                tabBarIcon: ({color , size}) => <Feather name="home" color={color} size ={size}/>
            }}
        />
    
        <Tab.Screen 
            name="Buscar amigos"
            children={() => <FriendList session={session}/>}
            options={{
                tabBarIcon: ({color , size}) => <Feather name="users" color={color} size ={size}/>
            }}
        />

        <Tab.Screen 
            name="Novo"
            children={ () => <Postagem session={session}/> } 
            options={{ 
                tabBarIcon: ({color , size}) => <Entypo name="plus" color={color} size={size} />
            }}
        />

        <Tab.Screen 
            name="Configurações"
            children={()=> <ConfigureProfile session={session}/>}
            options={{
                tabBarIcon: ({color , size}) => <Feather name="settings" color={color} size ={size}/>
            }}
        >
        </Tab.Screen>

        <Tab.Screen 
            name="Perfil"
            children={()=> <ProfileUser session={session}/>}
            options={{
                tabBarIcon: ({color , size}) => <Feather name="user" color={color} size ={size}/>
            }}
        >
        </Tab.Screen>
      </Tab.Navigator>
  )
}   