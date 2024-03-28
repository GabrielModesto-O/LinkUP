import 'react-native-url-polyfill/auto'
import React, { useState, useEffect } from 'react'
import { SafeAreaView, StatusBar, View, Text, TextInput, StyleSheet, Button, TouchableOpacity, ScrollView, Alert, Image } from 'react-native'
import { useFonts, Poppins_700Bold, Poppins_400Regular, Poppins_500Medium } from '@expo-google-fonts/poppins';
import stylesEditarPerfil from './stylesEditarPerfil';
import Icon from 'react-native-vector-icons/AntDesign';
import Icon2 from 'react-native-vector-icons/MaterialIcons';
import Icon3 from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import { StackTypes } from '../../routers/stack';
import {Picker} from '@react-native-picker/picker';
import data from './db.json';
import { supabase } from '../../lib/supabase';
import { Session } from '@supabase/supabase-js';
import navigatorBar from './../../components/stylesGlobal/navigatorBar';
import viewColor from '../../components/stylesGlobal/myColors';
import myInputs from '../../components/stylesGlobal/inputs';
import myButtons from '../../components/stylesGlobal/myButtons';
import myPrincipalContainer from '../../components/stylesGlobal/myPrincipalContainer';
import { User } from '../../@types/user';
import {styles} from './styles'
import * as ImagePicker from 'expo-image-picker'

export function EditarPerfil(props:any) {
  let session = props.session 
  'route' in props? session = props.route.params: ''
  const [email, setEmail] = useState(session.user.email)
  const [password, setPassword] = useState<string>()
  const [user, setUser] = useState<User>(session.user)
  const [image, setImage] = useState<any>(user.photobase64);
  const navigation = useNavigation<StackTypes>()
  const [loading, setLoading] = useState(true)
  const [supabaseError, setSupabaseError] = useState<any>()
  const [paisNome, setPaisNome] = useState<{
    pais: any;
    value: any;
    id: any;
  } | null>(null);
  const [cidadeNome, setCidadeNome] = useState<{
    cidade: any;
    value: any;
    id: any;
  } | null>(null);
    
    async function getProfile() {
      try {
        setLoading(true)
        if (!session?.user) throw new Error('No user on the session!')
  
        const { data, error, status } = await supabase
          .from('users')
          .select()
          .eq('uid', session.user.id)
          .single()
        if (error && status !== 406) {
          throw error
        }
  
        if (data) {
          setImage(data.photobase64)
          setUser(data)
        }
      } catch (error) {
        if (error instanceof Error) {
          Alert.alert(error.message)
        }
      } finally {
        setLoading(false)
      }
    }

    useEffect(() => {
      if (session) getProfile()
    }, [session])

    useEffect(() => {
      try {
        const myPais = data.paises[0];
        setPaisNome(myPais);
      } catch (error) {
        console.error('Erro ao carregar dados:', error);
      }
    }, []);

 
    
    useEffect(() => {
      try {
        const myCity = data.cidades[0];
        setCidadeNome(myCity);
      } catch (error) {
        console.error('Erro ao carregar dados:', error);
      }
    }, []);


  
    const updateUser = async () => {
      try {
        if(password){
          const {data:userFromUpdate, error} = await supabase.auth.updateUser(
            {
              password
            }
          )  
          if(error){
            setSupabaseError(error)
            console.log(error.status)
            if(error.status == 422) Alert.alert('Senha inválida', 'Sua senha deve ter no mínimo 6 caracteres e deve ser diferente da anterior')
            return
          }
          setSupabaseError('')
          console.log(userFromUpdate)
        }
        
        const {data, error:userError} = await supabase
          .from('users')
          .update({
            name:user.name,
            lastname:user.lastname,
            photobase64:image, 
            birthday:user.birthday,
            country:paisNome?.pais, 
            city:cidadeNome?.cidade
          })
          .eq('uid', session.user.id)

        if(supabaseError || userError){
          console.log(supabaseError, userError)
          return
        }

        Alert.alert("Dados atualizados com sucesso")
      } catch (error) {
        console.log(error) 
      }
    }

    const changeImage = async () => {
      // No permissions request is necessary for launching the image library
      let result:any = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
        base64:true
      });
  
      if (!result.canceled) {
        setImage(`${'data:image/png;base64,'+result.base64}`);
      }
    };
  return(
    <ScrollView>
      <View style={myPrincipalContainer.containerPrincipal2}>

        <View style={navigatorBar.containerNav}>
          <TouchableOpacity style={navigatorBar.buttonback} onPress={() => navigation.goBack()}>
            <Icon name='arrowleft' size={30} style={{fontWeight:'bold', color: viewColor.padraoText1.color}} />
            <Text style={navigatorBar.textback}>Voltar</Text>
          </TouchableOpacity>
        </View>

        <View style={myPrincipalContainer.subcontainerPrincipalConteudo}> 
            <View style={stylesEditarPerfil.containerPrincipalFoto}>
              <View style={stylesEditarPerfil.containerFoto}>
                  <Image source={{ uri:image }} style={styles.photo} />
                  <TouchableOpacity style={stylesEditarPerfil.containerIconEditarFoto}  onPress={changeImage}>
                    <Icon2 style={stylesEditarPerfil.iconEditFoto} name='edit' size={35} /*onPress={() => navigation.navigate('')}*/ />
                  </TouchableOpacity> 
                </View>
            </View>

            <View style={stylesEditarPerfil.containerInputs}>

              <View style={stylesEditarPerfil.containerInput}>
                  <Text style={stylesEditarPerfil.labelInput}>Nome</Text>
                  <TextInput 
                    style={stylesEditarPerfil.input} 
                    cursorColor={'black'}
                    value={user.name}
                    onChangeText={(name) => setUser(prevUser => ({...prevUser, name}))}
                  />
              </View>

              <View style={stylesEditarPerfil.containerInput}>
                  <Text style={stylesEditarPerfil.labelInput}>Sobrenome</Text>
                  <TextInput 
                    style={stylesEditarPerfil.input} 
                    cursorColor={'black'}
                    value={user.lastname}
                    onChangeText={(lastname) => setUser(prevUser => ({...prevUser, lastname}))}
                  />
              </View>

              <View style={stylesEditarPerfil.containerInput}>
                  <Text style={stylesEditarPerfil.labelInput}>E-mail</Text>
                  <TextInput 
                    style={stylesEditarPerfil.input} 
                    cursorColor={'black'}
                    value={email}
                    editable={false}
                    selectTextOnFocus={false}
                  />
              </View>

              <View style={stylesEditarPerfil.containerInput}>
                  <Text style={stylesEditarPerfil.labelInput}>Senha</Text>
                  <TextInput 
                    style={stylesEditarPerfil.input} 
                    cursorColor={'black'}
                    value={password}
                    secureTextEntry={true}
                    onChangeText={(password) => setPassword(password)}
                  />
              </View>

              
              <View style={stylesEditarPerfil.containerInput}>
                  <Text style={stylesEditarPerfil.labelInput}>País</Text>
                  <View style={stylesEditarPerfil.inputPicker}>
                      <Picker 
                          style={stylesEditarPerfil.picker}
                          selectedValue={paisNome}
                          onValueChange={(itemValue, itemIndex) => setPaisNome(itemValue)}
                      >
                          {data.paises.map((paises) => (
                            <Picker.Item label={paises.pais} value={paises.value} key={paises.id}  />
                          ))}
                      </Picker>
                  </View>
              </View>

              <View style={stylesEditarPerfil.containerInput}>
                  <Text style={stylesEditarPerfil.labelInput}>Cidade</Text>
                  <View style={stylesEditarPerfil.inputPicker}>
                      <Picker 
                          style={stylesEditarPerfil.picker}
                          selectedValue={cidadeNome}
                          onValueChange={(itemValue, itemIndex) => setCidadeNome(itemValue)}
                      >
                          {data.cidades.map((cidades) => (
                            <Picker.Item label={cidades.cidade} value={cidades.value} key={cidades.id}  />
                          ))}
                      </Picker>
                  </View>
              </View>

              <View style={stylesEditarPerfil.containerInput}>
                  <Text style={stylesEditarPerfil.labelInput}>Data de Nascimento</Text>
                 
                  <TextInput 
                    style={stylesEditarPerfil.input} 
                    cursorColor={'black'}
                    value={user.birthday}
                    onChangeText={(birthday) => setUser(prevUser => ({...prevUser, birthday}))}
                  />
              </View>

          </View>

          <View style={stylesEditarPerfil.containerButton}>
            <TouchableOpacity style={stylesEditarPerfil.buttonSalvar} onPress={() => updateUser()}>
                <Text style={stylesEditarPerfil.buttonTextSalvar}>Salvar</Text>
            </TouchableOpacity>
          </View>
        
        </View>

        <StatusBar backgroundColor='#fff' translucent barStyle={'dark-content'}/>

      </View>
    </ScrollView>
  );
}

