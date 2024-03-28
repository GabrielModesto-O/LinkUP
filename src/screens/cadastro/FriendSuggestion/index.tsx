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
import { RenderItem } from './RenderItem';

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
export function FriendSuggestion(props:any) {
  //console.log(props.route.params.userId)
  const selectedInterests = props.route.params.selectedInterests
  const userData = props.route.params.userData
  const selectedCourse = JSON.parse(userData.courseSelected)
  const navigation = useNavigation<StackTypes>()

  const [loading, setLoading] = useState(true)
  const [users, setUsers] = useState<any>(null)
  const [friendRequests, setFriendRequests] = useState<FriendRequest[]>([]);
  useEffect(()=>{
    const fetchUsers = async () => {
      try {
        const {data, error} = await supabase 
        .from('users')
        .select()
      
        if(error) {
          console.log(error)
          return 
        }
        
        if(data){
          const usersWithAddButtonClicked:any = []
          for(const user of data){
            usersWithAddButtonClicked.push({
              ...user,
              isRequested:false
            })
          }

          console
          setUsers(usersWithAddButtonClicked)
        }
      } catch (error) {
        console.log(error)
      }
      
    }
    fetchUsers()
  }, [])

  
  const finishRegister = async () => {
      try {
        if (selectedInterests.length === 0) {
          Alert.alert('Volte e selecione pelo menos um interesse antes de prosseguir.');
          return;
        }
        if(userData.name && userData.lastname && userData.courseSelected && userData.email && userData.password && selectedCourse){
          setLoading(true)
          const {data: { session }, error} = await supabase.auth.signUp({
            email: userData.email,
            password: userData.password,
          })
      
          if (error) {
            setLoading(false)
            return Alert.alert(error.message)
          }
          if (!session) Alert.alert('Verifique seu e-mail')
          setLoading(false)
    
          const userId = session?.user.id;
    
          const { error: userError } = await supabase
            .from('users')
            .insert([
              { 
                uid: userId, 
                name: userData.name,
                lastname: userData.lastname,
                courseName: selectedCourse.courseName,
                courseId: selectedCourse.id
              }
            ]);
    
          if (userError) {
            Alert.alert('Error adding user data:', userError.message);
          } else {
            const userInterestsData: Interest[] = selectedInterests.map((interestId: string) => ({
              userId,
              interestId,
            }));
            
            // Insere os dados na tabela 'userInterests'
            const { data, error } = await supabase
              .from('userInterests')
              .upsert(userInterestsData, {
                onConflict: ['userId', 'interestId'].join(','), // Combina as strings em uma única string
              });
        
            if (error) {
              console.error('Erro ao inserir interesses do usuário:', error);
              return;
            }

            const friendRequestArray = friendRequests.map((friend:FriendRequest) => ({
              userId:userId, 
              friendId: friend.uid
            }))

            console.log('array======', friendRequestArray)
            const { data:friendRequestData, error:friendRequestError } = await supabase
              .from('friendsList')
              .upsert(friendRequestArray, {
                onConflict: ['userId', 'friendId'].join(',')
              });
        
            if (friendRequestError) {
              console.error('Erro ao inserir interesses do usuário:', error);
              return;
            }
            props.navigation.popToTop();
            props.navigation.navigate('Login');
          }
        }else{
          Alert.alert('Ocorreu um erro, cadastre-se novamente')
          props.navigation.navigate('InitialScreen')
        } 
      }catch (error) {console.error('Erro inesperado:', error);} 
  };
  
  const handleFriendToStage = (friend:FriendRequest) => {
    const friendExists = friendRequests.some((existingFriend) => existingFriend.uid === friend.uid);

    if (friendExists) {
      setFriendRequests((prevFriendRequests) =>
        prevFriendRequests.filter((existingFriend) => existingFriend.uid !== friend.uid)
      );
    } else {
      setFriendRequests((prevFriendRequests) => [...prevFriendRequests, friend]);
    }
  }

  return(

    <SafeAreaView style={{flex:1}}>
      <StyleDesenho/>
        <View style={myPrincipalContainer.containerPrincipalCadastro}>

          <View style={myStatusBar.statusBarProgress}>
            <View style={{backgroundColor: '#4FC5C5', borderRadius: 30, height: 7, width: 85, marginRight: 7}}><Text></Text></View>
            <View style={{backgroundColor: '#4FC5C5', borderRadius: 30, height: 7, width: 85, marginRight: 7}}><Text></Text></View>
            <View style={{backgroundColor: '#4FC5C5', borderRadius: 30, height: 7, width: 85, marginRight: 7}}><Text></Text></View>
          </View>

          <View style={stylesInteresses.containerNav}>
            <TouchableOpacity style={stylesInteresses.buttonback} onPress={() => navigation.goBack()}>
              <Icon name='arrowleft' size={30} style={{fontWeight:'bold', color: 'white'}} />
              <Text style={stylesInteresses.textback}>Voltar</Text>
            </TouchableOpacity>
          </View>

          <View style={stylesInteresses.containerPrincipalCadastro}>

            <View style={stylesInteresses.containerInteressesTitulo}>
              <Text style={stylesInteresses.cadastroTitulo2}>Cadastro</Text>
            </View>

            <View style={stylesInteresses.containerSubtituloPadrao}>
              <Text style={stylesInteresses.subtituloPadrãoCadastro}>Pessoas que você</Text>
              <Text style={stylesInteresses.subtituloPadrãoCadastro}>talvez conheça</Text>
            </View>
              
          
            <View style={styles.userSuggestionContainer} >
              <FlatList
                data={users}
                style={styles.flatList}
                renderItem={({ item, index }) => <RenderItem item={item} index={index} handleFriendToStage={handleFriendToStage} />}
                keyExtractor={(user) => user.uid.toString()}
              />
            </View>
           
              <View style={stylesInteresses.containerInteressesButtons}>
                <TouchableOpacity style={stylesInteresses.interessesButtonsSalvar} onPress={() => finishRegister()}>
                  <Text style={stylesInteresses.interessesButtonsTextSalvar}>Avançar</Text>
                </TouchableOpacity>
              </View>
           
          </View>

        </View>
      
        <StatusBar backgroundColor='#215151' translucent barStyle={'light-content'}/>
      
    </SafeAreaView>
  );
}

