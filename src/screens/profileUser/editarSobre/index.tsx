import 'react-native-url-polyfill/auto'
import React, { useState, useEffect } from 'react'
import { SafeAreaView, StatusBar, View, Text, TextInput, StyleSheet, Button, TouchableOpacity, ScrollView, Alert } from 'react-native'
import { useFonts, Poppins_700Bold, Poppins_400Regular, Poppins_500Medium } from '@expo-google-fonts/poppins';
import stylesEditarSobre from './stylesEditarSobre';
import Icon from 'react-native-vector-icons/AntDesign';
import Icon2 from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import { StackTypes } from '../../../routers/stack';
import {Picker} from '@react-native-picker/picker';
import data from './db.json';
import myPrincipalContainer from '../../../components/stylesGlobal/myPrincipalContainer';
import { supabase } from '../../../lib/supabase';



export function EditarSobre(props:any) {
  const navigation = useNavigation<StackTypes>()
  const [aboutUser, setAboutUser] = useState(props.route.params.userAbout)
 
  const updateAbout = async () => {
    if(!aboutUser && aboutUser != '') return Alert.alert('Descrição inválida', 'O valor inserido é inválido.')
    try {
      const {data, error} = await supabase 
      .from('users')
      .update({aboutMe: aboutUser}) 
      .eq('uid', props.route.params.session.user.id)

      if(error) return console.log(error)

      Alert.alert('Sucesso!', 'Parabéns por inserir suas informações :)')
      navigation.goBack()
    } catch (error) {
      console.log(error)
    }
  }
  return(
    <ScrollView>
      <View style={myPrincipalContainer.containerPrincipal2}>

        <View style={stylesEditarSobre.containerNav}>
          <TouchableOpacity style={stylesEditarSobre.buttonback} onPress={() => navigation.goBack()}>
            <Icon name='arrowleft' size={30} style={{fontWeight:'bold'}}/>
            <Text style={stylesEditarSobre.textback}>Voltar</Text>
          </TouchableOpacity>
        </View>

        <View style={myPrincipalContainer.subcontainerPrincipalConteudo}>

          <View style={stylesEditarSobre.containerEditarSobreTitulo}>
            <Text style={stylesEditarSobre.sobreTitulo}>Sobre</Text>
          </View>

          <View style={stylesEditarSobre.containerEditarSobreInputs}>
            <View style={stylesEditarSobre.containerInput}>
              <Text style={stylesEditarSobre.labelInput}>Conte-nos um pouco sobre você</Text>
              <TextInput style={stylesEditarSobre.input} 
                cursorColor={'black'}
                multiline={true}
                numberOfLines={4}
                value={aboutUser}
                onChangeText={value => setAboutUser(value)}
                placeholder='...'
              />
            </View>
          </View>

          <View style={stylesEditarSobre.containerEditarSobreButtons}>
          
            <View style={stylesEditarSobre.containerSobreButtons}>

              <TouchableOpacity style={stylesEditarSobre.sobreButtonsCancelar} onPress={() => navigation.goBack()}>
                 <Text style={stylesEditarSobre.sobreButtonsTextCancelar}>Cancelar</Text>
              </TouchableOpacity>

              <TouchableOpacity style={stylesEditarSobre.sobreButtonsSalvar} onPress={() => updateAbout()}>
                 <Text style={stylesEditarSobre.sobreButtonsTextSalvar}>Salvar</Text>
              </TouchableOpacity>

            </View>
          
          </View>

        </View>
        <StatusBar backgroundColor='#fff' translucent barStyle={'dark-content'}/>

      </View>
    </ScrollView>
  );
}

