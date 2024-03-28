import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, StatusBar, TextInput, TouchableOpacity, ScrollView, Alert, Button, Image} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp, createNativeStackNavigator } from '@react-navigation/native-stack';
import { StackTypes } from '../../routers/stack';

import { styles } from './stylesCadastro'
import { supabase } from '../../lib/supabase'
import { Session } from '@supabase/supabase-js'
import {Picker} from '@react-native-picker/picker';
import navigatorBar from './../../components/stylesGlobal/navigatorBar';
import viewColor from '../../components/stylesGlobal/myColors';
import myInputs from '../../components/stylesGlobal/inputs';
import myButtons from '../../components/stylesGlobal/myButtons';
import myPrincipalContainer from '../../components/stylesGlobal/myPrincipalContainer';
import myStatusBar from '../../components/stylesGlobal/statusBarProgress';
import StyleDesenho from './StyleDesenho';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import * as ImagePicker from 'expo-image-picker'
import { registerStyle } from './registerStyle';


type RootStackParamList = {
  Interesses: { userId: string };
};
type InteressesScreenRouteProp = RouteProp<RootStackParamList, 'Interesses'>;

type Props = {
  route: InteressesScreenRouteProp;
};
export default function Cadastro(props:any) {
    const navigation = useNavigation<StackTypes>();
    const [loading, setLoading] = useState(true)
    const [textoInput, setTextoInput] = useState(''); 
    const [botaoAtivo, setBotaoAtivo] = useState(true); 
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [courseName, setCourseName] = useState<any>([{}]);
    const [courseSelected, setCourseSelected] = useState<any>('');
    const [lastname, setLastname] = useState('')
    const [password, setPassword] = useState('')
    const [courseId, setCourseId] = useState('')
    
    const [image, setImage] = useState<any>(null);
    useEffect(() => {
      fetchCourse();
    }, []);

    const pickImage = async () => {
      // No permissions request is necessary for launching the image library
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
  
      console.log(result);
  
      if (!result.canceled) {
        setImage(result.assets[0].uri);
      }
    };

    async function fetchCourse() {
      try {
        setLoading(true)
  
        const { data, error, status } = await supabase
          .from('courses')
          .select()
        if (error && status !== 406) {
          throw error
        }
  
        if (data) {
          const courseNames = data.map(course => 
            course
          )
          setCourseName(courseNames)
        }
      } catch (error) {
        if (error instanceof Error) {
          Alert.alert(error.message)
        }
      } finally {
        setLoading(false)
      }
    }

    const handleInputChange = (texto: string) => {

      setTextoInput(texto);
      
      setBotaoAtivo(texto.trim() !== '');
    
    };

  
    async function registerNewUser() {
      if(name && lastname && courseSelected && email && password){
          const userData = {
            name,
            lastname,
            courseSelected,
            email, 
            password
          }
          console.log(userData)
          setLoading(false)
          props.navigation.navigate('Interesses', {userData})
      } else{
        Alert.alert('Preencha todos os campos')
      }
    }

  return (
    <ScrollView style={styles.scrollViewContainer}>
      <StyleDesenho/>

        <View style={myPrincipalContainer.containerPrincipalCadastro}>

          <View style={myStatusBar.statusBarProgress}>
            <View style={{backgroundColor: '#4FC5C5', borderRadius: 30, height: 7, width: 85, marginRight: 7}}><Text></Text></View>
            <View style={{backgroundColor: '#d9d9d9', borderRadius: 30, height: 7, width: 85, marginRight: 7}}><Text></Text></View>
            <View style={{backgroundColor: '#d9d9d9', borderRadius: 30, height: 7, width: 85, marginRight: 7}}><Text></Text></View>
          </View>

          <View style={navigatorBar.containerNav}>
            <TouchableOpacity style={navigatorBar.buttonback} onPress={() => navigation.goBack()}>
              <Icon name='arrowleft' size={30} style={{fontWeight:'bold', color: viewColor.padraoText2.color}} />
              <Text style={navigatorBar.textback2}>Voltar</Text>
            </TouchableOpacity>
          </View>

          <View style={myPrincipalContainer.subcontainerPrincipal}>
            
            <View style={styles.containerTitulo}>
              <Text style={styles.cadastroTitulo}>Cadastro</Text>
            </View>

            <View style={myInputs.containerPrincipalInputs}>
              <View style={myInputs.containerInput}>
                <Text style={myInputs.textInput}>Nome</Text>
                <TextInput style={myInputs.input} onChangeText={(text) => setName(text)} value={name}/>
              </View>

              <View style={myInputs.containerInput}>
                <Text style={myInputs.textInput}>Sobrenome</Text>
                <TextInput style={myInputs.input} onChangeText={(text) => setLastname(text)} value={lastname}/>
              </View>

              <View style={myInputs.containerInput}>
                <Text style={myInputs.textInput}>Nome do Curso</Text>
                <View style={myInputs.inputPicker}>
                  <Picker 
                    style={myInputs.picker}
                    selectedValue={courseSelected}
                    onValueChange={(itemValue) =>  {
                      return setCourseSelected(itemValue)
                    }}
                  > 
                    <Picker.Item label={''}  value={null} />
                    {Array.isArray(courseName) && courseName.map((course, index)=> {
                      const courseToStringJson = JSON.stringify(course)
                      return (<Picker.Item label={course.courseName}  value={courseToStringJson} key={index.toString()} />)
                    })}
                  </Picker>
                </View>
              </View>

              <View style={myInputs.containerInput}>
                <Text style={myInputs.textInput}>E-mail</Text>
                <TextInput style={myInputs.input} onChangeText={(text) => setEmail(text)} value={email}/>
              </View>

              <View style={myInputs.containerInput}>
                <Text style={myInputs.textInput}>Senha</Text>
                <TextInput secureTextEntry={true} style={myInputs.input} onChangeText={(text) => setPassword(text)} value={password}/>
              </View>
                
            </View>

            <View style={myButtons.containerButton}>
                <TouchableOpacity 
                  style={[myButtons.buttonDefault,]} 
                  disabled={loading} 
                  onPress={() => registerNewUser()}
                >
                  <Text style={styles.avancar}>Avançar</Text>
                </TouchableOpacity>
            </View>

          </View>

        </View>
        <StatusBar backgroundColor='#215151' translucent barStyle={'light-content'}/>     
    </ScrollView>  
  );
}

