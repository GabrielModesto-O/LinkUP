import React, { useEffect, useState } from 'react';
import { StyleSheet, StatusBar, Text, TouchableOpacity, View ,Image, ScrollView, Alert } from 'react-native';
import { styles } from './styles';
import Icon from 'react-native-vector-icons/AntDesign';
import Icon2 from 'react-native-vector-icons/MaterialIcons';
import Icon3 from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon4 from 'react-native-vector-icons/FontAwesome5';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { StackTypes } from '../../routers/stack';
import myPrincipalContainer from '../../components/stylesGlobal/myPrincipalContainer';
import navigatorBar from './../../components/stylesGlobal/navigatorBar';
import viewColor from '../../components/stylesGlobal/myColors';
import { Session } from '@supabase/supabase-js';
import { supabase } from '../../lib/supabase';
import Modal from 'react-native-modal'
import { Privacy } from './Privacy';

export  function ConfigureProfile ({session}: {session:Session})  {
  const sessionToPass:any = session
  const [loading, setLoading] = useState(true)
  const [name, setName] = useState('')
  const [lastName, setLastname] = useState('')
  const [image, setImage] = useState<string>('')
  const [objectOpened, setObjectOpened] = useState<string>('')
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  const navigation = useNavigation<StackTypes>()
  async function logOut() {
    await supabase.auth.signOut()
    navigation.navigate('InitialScreen')
  } 
  
  useEffect(() => {
    if (session) getProfile()
  }, [session])


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
        setName(data.name)
        setLastname(data.lastname)
        setImage(data.photobase64)
      }
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message)
      }
    } finally {
      setLoading(false)
    }
  }
  
  const openModal = (objectToOpen:string) => {
    if(objectToOpen === 'editProfile') setObjectOpened(objectToOpen)
    if(objectToOpen === 'security') setObjectOpened(objectToOpen)
    if(objectToOpen === 'privacy') setObjectOpened(objectToOpen)
    if(objectToOpen === 'terms-and-policys') setObjectOpened(objectToOpen)
    if(objectToOpen === 'exit') setObjectOpened(objectToOpen)
    setIsModalVisible(true)
  }
  return (
    <ScrollView>
      <Modal
        isVisible={isModalVisible} 
        onBackdropPress={() => {
          setIsModalVisible(false)
          setObjectOpened('')
        }} 
        coverScreen={true}
        backdropOpacity={0}
        style={styles.modal}
      >
        {
          objectOpened === 'privacy' &&
          <Privacy
              setIsModalVisible={setIsModalVisible} 
              setObjectOpened={setObjectOpened}
              objectOpened={objectOpened}
              session={session}
  
          />
        }
      </Modal>
      <View style={myPrincipalContainer.containerPrincipal2}>

        <View style={navigatorBar.containerNav}>
          <TouchableOpacity style={navigatorBar.buttonback} /*onPress={() => navigation.goBack()}*/>
            <Icon name='arrowleft' size={30} style={{fontWeight:'bold', color: viewColor.padraoText1.color}} />
            <Text style={navigatorBar.textback}>Voltar</Text>
          </TouchableOpacity>
        </View>

        <View style={myPrincipalContainer.subcontainerPrincipalConteudo}>

          <View style={styles.containerTitulo}>
              <Text style={styles.titulo}>Configurações</Text>
          </View>


          <View style={styles.containerPrincipalFoto}>
            <View style={styles.containerFoto}>
              <Image source={{ uri: image }} style={styles.photo}/>
            </View>

            <View style={styles.containerInfoName}>
            
              <View style={styles.nameUser}>
              <Text style={styles.textNameUser}>{name} {lastName}</Text>
              </View>
              <View style={styles.emailUser}>
                <Text style={styles.textEmailUser}>{session.user.email}</Text>
              </View>
            
            </View>
          </View>

          <View style={styles.containerPrincipalButtonsConfiguracoes}>

            <View style={styles.containerConfiguracao}>

              <View style={styles.containerContiguracaoTitulo}>
                <Text style={styles.textTituloConfiguracoes}>Conta</Text>
              </View>

              <TouchableOpacity style={styles.containerButtonConfiguracoes} onPress={() => navigation.navigate('EditarPerfil', sessionToPass)}>
                <View style={styles.containerIconConfiguracoes}>
                  <Icon3 style={styles.iconConfiguracoes} size={25} name='account-edit'/>
                </View>

                <View style={styles.containerTextConfiguracoes }>
                  <Text style={styles.textButtonConfiguracoes}>Editar Perfil</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity style={styles.containerButtonConfiguracoes}>
                <View style={styles.containerIconConfiguracoes}>
                  <Icon2 style={styles.iconConfiguracoes} size={20} name='shield'/>
                </View>

                <View style={styles.containerTextConfiguracoes}>
                  <Text style={styles.textButtonConfiguracoes}>Segurança</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity style={styles.containerButtonConfiguracoes} onPress={() => openModal('privacy')}>
                <View style={styles.containerIconConfiguracoes}>
                  <Icon2 style={styles.iconConfiguracoes} size={20} name='privacy-tip'/>
                </View>

                <View style={styles.containerTextConfiguracoes}>
                  <Text style={styles.textButtonConfiguracoes}>Privacidade</Text>
                </View>
              </TouchableOpacity>

              {/* <TouchableOpacity style={styles.containerButtonConfiguracoes}>
                <View style={styles.containerIconConfiguracoes}>
                  <Icon3 style={styles.iconConfiguracoes} size={25} name='head-heart'/>
                </View>

                <View style={styles.containerTextConfiguracoes}>
                  <Text style={styles.textButtonConfiguracoes}>Tema</Text>
                </View>
              </TouchableOpacity> */}

            </View>

          </View>

          <View style={styles.containerPrincipalButtonsConfiguracoes}>

            <View style={styles.containerConfiguracao}>
              <View style={styles.containerContiguracaoTitulo}>
                <Text style={styles.textTituloConfiguracoes}>Suporte</Text>
              </View>

              <TouchableOpacity style={styles.containerButtonConfiguracoes}>
                <View style={styles.containerIconConfiguracoes}>
                  <Icon3 style={styles.iconConfiguracoes} size={25} name='text-box'/>
                </View>

                <View style={styles.containerTextConfiguracoes}>
                  <Text style={styles.textButtonConfiguracoes}>Termos e políticas</Text>
                </View>
              </TouchableOpacity>

            </View>

          </View>

          <View style={styles.containerPrincipalButtonsConfiguracoes}>

            <View style={styles.containerConfiguracao}>
              <View style={styles.containerContiguracaoTitulo}>
                <Text style={styles.textTituloConfiguracoes}>Ações</Text>
              </View>

              <TouchableOpacity style={styles.containerButtonConfiguracoes} onPress={() => logOut()}>
                <View style={styles.containerIconConfiguracoes}>
                  <Icon4 style={styles.iconConfiguracoes} size={20} name='sign-out-alt'/>
                </View>

                <View style={styles.containerTextConfiguracoes}>
                  <Text style={styles.textButtonConfiguracoes}>Sair</Text>
                </View>
              </TouchableOpacity>
            </View>

          </View>

        </View>

        <StatusBar backgroundColor='#fff' translucent barStyle={'dark-content'}/>

      </View>
    </ScrollView>
  );
};





