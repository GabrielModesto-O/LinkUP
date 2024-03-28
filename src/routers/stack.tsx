import * as React from 'react';
import { NavigationContainer, RouteProp, useRoute } from '@react-navigation/native';
import { createNativeStackNavigator, NativeStackNavigationProp} from '@react-navigation/native-stack';
import ConsultaMatricula from '../screens/consulta_matricula';
import Cadastro from '../screens/cadastro';
import {InitialScreen} from '../screens/initialScreen';
import {Login} from '../screens/login'
import {ConfigureProfile} from '../screens/configureProfile'
import { FriendList } from '../screens/friendRequestList';
import { Feed } from '../screens/feed';
import { EditarCurso } from '../screens/profileUser/editarCurso';
import { AdicionarCurso } from '../screens/profileUser/adicionarCurso';
import { EditarSobre } from '../screens/profileUser/editarSobre';
import { ProfileUser } from '../screens/profileUser';
import { UserProfile  } from '../screens/userProfile';
import { Session } from '@supabase/supabase-js';
import { Interesses } from '../screens/cadastro/interesses';
import { Postagem } from '../screens/newPostScreen';
import { TabRoutes } from './tabRoutes';
import { EditarPerfil } from '../screens/profileEdit'
import { FriendSuggestion } from '../screens/cadastro/FriendSuggestion';
import { ChatScreen } from '../screens/chatScreen';
import { MessageList } from '../screens/messageList';
import { Message } from '../components/message';


type ParamListBase = {
    Perfil: { session: Session };
    
  };
const Stack = createNativeStackNavigator();

type User = {
  id: string;
  name: string;
};

type Stacknavigation = {
    Cadastro: undefined,
    ConsultaMatricula: undefined,
    Login:undefined,
    ConfigureProfile:undefined,
    FriendList:undefined,
    ChatScreen: { user: User },
    EditarCurso: undefined,
    AdicionarCurso: undefined,
    EditarSobre: undefined,
    ProfileUser: undefined,
    UserProfile: { user: User },
    InitialScreen: undefined,
    Interesses: undefined,
    Postagem: undefined,
    Profile: undefined,
    EditarPerfil: undefined,
    FriendSuggestion: undefined,
    MessageList: { user: User },
    Message: undefined,

}
export type StackTypes = NativeStackNavigationProp<Stacknavigation>

export default function StackComponent() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
      
        <Stack.Screen name="InitialScreen" component={InitialScreen} />
        <Stack.Screen name="Cadastro" component={Cadastro} />
        <Stack.Screen name="Interesses" component={Interesses}  />
        <Stack.Screen name="friendSuggestion" component={FriendSuggestion} />
        <Stack.Screen name="ProfileUser" component={ProfileUser}  />
        <Stack.Screen name="Feed" component={Feed}  />
        <Stack.Screen name="UserProfile" component={UserProfile} /> 
        <Stack.Screen name="FirstRegister" component={ConsultaMatricula}  />
        <Stack.Screen name="FriendList" component={FriendList} />
        <Stack.Screen name="Postagem" component={Postagem}  />
        <Stack.Screen name="EditarSobre" component={EditarSobre}  />
        <Stack.Screen name="AdicionarCurso" component={AdicionarCurso}  />
        <Stack.Screen name="EditarCurso" component={EditarCurso} />
        <Stack.Screen name="Configuracoes" component={ConfigureProfile} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="TabRoutes" component={TabRoutes} />
        <Stack.Screen name="EditarPerfil" component={EditarPerfil} />
        <Stack.Screen name="ChatScreen" component={ChatScreen} />
        <Stack.Screen name="MessageList" component={MessageList} />
        
      </Stack.Navigator>
    </NavigationContainer>
  );
}