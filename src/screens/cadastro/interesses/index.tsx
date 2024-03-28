import 'react-native-url-polyfill/auto'
import React, { useState, useEffect } from 'react'
import { SafeAreaView, StatusBar, View, Text, TextInput, StyleSheet, Button, TouchableOpacity, ScrollView, Alert } from 'react-native'
import stylesInteresses from './stylesInteresses';
import Icon from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
import { StackTypes } from '../../../routers/stack';
import StyleDesenho from './StyleDesenho';
import myStatusBar from '../../../components/stylesGlobal/statusBarProgress';
import myPrincipalContainer from '../../../components/stylesGlobal/myPrincipalContainer';
import { supabase } from '../../../lib/supabase';
import { Interest } from '../../../@types/interest';


export function Interesses(props:any) {
  const userData = props.route.params.userData
  const navigation = useNavigation<StackTypes>()
  const [selectedInterests, setSelectedInterests] = useState<any>([]);
  const [interests, setInterests ] = useState<Interest[]>([])
  const [cursoInteresse, setCursoInteresse] = useState<{
    curso: string;
    id: number;
  } | null>(null);

  useEffect( () => {
    const fetchInterests = async () => {
      try {
        const {data, error} = await supabase
          .from('interests')
          .select()

        if(error) {
          console.log(error)
          return
        }

        if(data) {
          setInterests(data)
        }
      } catch (error) {
        console.log('ocorreu um erro inseperado: ', error)
      }

    }
  fetchInterests()
  }, [])

  const interestNextStep = async () => {
    try {
      // Verifica se há interesses selecionados
      if (selectedInterests.length <= 1) {
        Alert.alert('Selecione pelo menos dois interesses antes de prosseguir.');
        return;
      }
      props.navigation.navigate('friendSuggestion', {userData, selectedInterests});
    } catch (error) {
      console.error('Erro inesperado:', error);
    }
  };
  

  const toggleInterest = (interest:Interest) => {
    if (selectedInterests.includes(interest.id)) {
      setSelectedInterests((prevSelected:Interest[]) =>
        prevSelected.filter((interestId:any) => interestId !== interest.id)
      );
    } else {
      setSelectedInterests((prevSelected:Interest[]) => [...prevSelected, interest.id]);
    }
  };
  return(

    <ScrollView>
      <StyleDesenho/>

        <View style={myPrincipalContainer.containerPrincipalCadastro}>

          <View style={myStatusBar.statusBarProgress}>
            <View style={{backgroundColor: '#4FC5C5', borderRadius: 30, height: 7, width: 85, marginRight: 7}}><Text></Text></View>
            <View style={{backgroundColor: '#4FC5C5', borderRadius: 30, height: 7, width: 85, marginRight: 7}}><Text></Text></View>
            <View style={{backgroundColor: '#d9d9d9', borderRadius: 30, height: 7, width: 85, marginRight: 7}}><Text></Text></View>
          </View>

          <View style={stylesInteresses.containerNav}>
            <TouchableOpacity style={stylesInteresses.buttonback} onPress={() => navigation.navigate('Cadastro')}>
              <Icon name='arrowleft' size={30} style={{fontWeight:'bold', color: 'white'}} />
              <Text style={stylesInteresses.textback}>Voltar</Text>
            </TouchableOpacity>
          </View>

          <View style={stylesInteresses.containerPrincipalCadastro}>

            <View style={stylesInteresses.containerInteressesTitulo}>
              <Text style={stylesInteresses.cadastroTitulo2}>Cadastro</Text>
            </View>

            <View style={stylesInteresses.containerSubtituloPadrao}>
              <Text style={stylesInteresses.subtituloPadrãoCadastro}>Quais assuntos você tem interesse?</Text>
            </View>

            <View style={stylesInteresses.containerSubtituloPadrao2}>
              <Text style={stylesInteresses.subtituloPadrãoCadastro2}>Escolha ao menos dois.</Text>
            </View>
            
            <View style={stylesInteresses.containerInteresses}>
              {interests.map((interest) => (
                <TouchableOpacity 
                  key={interest.id} 
                  style={[
                    stylesInteresses.buttonInteresse,
                    selectedInterests.includes(interest.id)
                      ? stylesInteresses.buttonInteresseSelected
                      : null,
                  ]}
                  onPress={() => toggleInterest(interest)}
                >
                  <Text style={stylesInteresses.textButtonInteresse}>{interest.interestName}</Text>
                </TouchableOpacity>
              ))}
            </View>

            <View style={stylesInteresses.containerButtons}>
            
              <View style={stylesInteresses.containerInteressesButtons}>
                <TouchableOpacity style={stylesInteresses.interessesButtonsSalvar} onPress={() => interestNextStep()}>
                  <Text style={stylesInteresses.interessesButtonsTextSalvar}>Salvar</Text>
                </TouchableOpacity>
              </View>
            
            </View>

          </View>

        </View>
      
        <StatusBar backgroundColor='#215151' translucent barStyle={'light-content'}/>
      
    </ScrollView>
  );
}

