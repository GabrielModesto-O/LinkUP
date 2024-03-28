import 'react-native-url-polyfill/auto'
import React, { useState, useEffect, useRef } from 'react'
import { SafeAreaView, StatusBar, View, Text, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, Pressable, Image, ImageBackground, Alert } from 'react-native'
import { styles } from './styles';
import Icon from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
import { StackTypes } from '../../routers/stack';
import * as ImagePicker from 'expo-image-picker';
import { FontAwesome } from '@expo/vector-icons';
import { Camera } from 'expo-camera';
import { Session } from '@supabase/supabase-js';
import { supabase } from '../../lib/supabase';
import { User } from '../../@types/user';

export function Postagem({session} : {session:Session}) {
  const camRef = useRef<any>(null);
  const navigation = useNavigation<StackTypes>()
  const [image, setImage] = useState<string | null>(null);
  const [hasPermission, setHasPermission] = useState(false);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [capturedPhoto, setcapturedPhoto] = useState(null);
  const [open, setOpen] = useState(false);
  const [cameraOpen, setCameraOpen] = useState(false)
  const [user, setUser] = useState<User>()
  const [postDescription, setPostDescription] = useState('')
  const [postImage, setPostImage] = useState('')
  const [publishError, setPublishError] = useState<any>('')
  
  async function getProfile() {
    try {
      const { data, error, status } = await supabase
        .from('users')
        .select()
        .eq('uid', session.user.id)
        .single()

      if (error) throw error
      if (data) setUser(data)
    } catch (error) {
      console.log(error)
    } 
  }

  useEffect(() => {
    getProfile()
  },[])
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      // aspect: [4, 3],
      quality: 1,
    });


    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  async function takePicture() {
    if (camRef) {
      const data = await camRef.current.takePictureAsync();
      setcapturedPhoto(data.uri);
      setOpen(true);
    }
  }

  const takeImage = async () => {
    // No permissions request is necessary for launching the image library
    let result:any = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64:true
    });
    if (!result.canceled) {
      setImage(`${'data:image/png;base64,'+result.assets[0].base64}`);
    }
  };

  const publishPost = async () => {
    if(!postDescription && !image){
        Alert.alert('Você precisa inserir uma descrição ou imagem.')
      return
    }
    try {
      if(image){
        const {data, error} = await supabase 
        .from('posts')
        .insert({
          description:postDescription,
          photobase64:image,
          author:session.user.id
        })

        if(error) {
          setPublishError(error)
          return console.log(error)
        }
      }else{
        const {data, error} = await supabase 
        .from('posts')
        .insert({
          description:postDescription,
          author:session.user.id
        })

        if(error) {
          setPublishError(error)
          return console.log(error)
        }
      }
      
      if(!publishError){
        Alert.alert('Post publicado com sucesso')
        setPostDescription('')
        setImage('')
      }

    } catch (error) {
      console.log(error)
    }
  }

return (
  <ScrollView style={styles.container} >
    <View>
    {
    /* { cameraOpen && 
      <View style={styles.container}>
        <Camera style={styles.camera1} type={type} ref={camRef}>
          <View style={styles.buttonContainer1}>
            <TouchableOpacity
              style={styles.button1}
              onPress={() => {
                setType(
                  type == Camera.Constants.back
                    ? Camera.Constants.Type.front
                    : Camera.Constants.Type.back
                );
              }}>
              <Text style={styles.text1}><FontAwesome name="retweet" size={30} color="¨#FFF" /></Text>
              <Text style={styles.textCamera}><FontAwesome name="camera" size={30} color="¨#FFF" /></Text>
            </TouchableOpacity>
          </View>
        </Camera>

        <TouchableOpacity style={styles.buttonCamera} onPress={takePicture}>
          <FontAwesome name="camera" size={23} color="¨#FFF" />
        </TouchableOpacity>


        {capturedPhoto &&

          <Modal
            animationType="slide"
            transparent={false}
            visible={open}
          >
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', margin: 20 }}>
              <TouchableOpacity style={{ margin: 10 }} onPress={() => setOpen(false)}>
                <FontAwesome name="window-close" size={50} color="#FF0000" />
              </TouchableOpacity>

              <Image style={{ width: '100%', height: 300, borderRadius: 20 }}
                source={{ uri: capturedPhoto }}
              />

            </View>
          </Modal>
        }
      </View>
    } */
    }
    </View>
   
    <View style={styles.titleContainer}>
      <Text style={styles.title}>Faça sua publicação</Text>
    </View>
    <View style={styles.contentContainer}>
      <View style={styles.userInfoContainer}>
        {user &&
          <>
            <Image style={styles.userImage} source={{uri: `${user.photobase64 }`}} />
            <TouchableOpacity style={styles.userInfo}>
              <Text style={styles.userName}>{user.name}</Text>
              <Text style={styles.userCourse}>{user.courseName}</Text>
            </TouchableOpacity>
          </>
        }
      </View>
      <View>
        <KeyboardAvoidingView behavior="padding" style={styles.keyboardContainer}>
          <View style={styles.postDataContainer}>
            <TextInput
              style={styles.postDescription}
              cursorColor={'black'}
              multiline={true}
              numberOfLines={8}
              onChangeText={(text) => setPostDescription(text)}
              value={postDescription}
              placeholder='No que você está pensando?'
            />
            {image && 
              <>
              <View style={styles.removeImageContainer}>
                <TouchableOpacity style={styles.removeImageButton} onPress={() => setImage('')}>
                  <Text style={styles.removeImageText}>x</Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity style={styles.imageContainer} onPress={() => takeImage()}>
                <Image source={{ uri: image }} style={styles.image} />
              </TouchableOpacity>
              </>
            }
            {!image &&
              <TouchableOpacity style={styles.postImageToChoose} onPress={() => takeImage()}>
                <ImageBackground 
                  source={{uri:'https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png'}} 
                  resizeMode="cover" 
                  style={styles.imagePlaceholder}
                >
                  <Text style={styles.addImageText}>Adicionar uma imagem</Text> 
                </ImageBackground>
                <View style={styles.overlay}></View>
              </TouchableOpacity>

            }

          </View>

          <View style={styles.footer}>
            <View style={styles.iconsContainer}>
              <Pressable onPress={pickImage}>
                <FontAwesome
                  name="image"
                  size={24}
                  color="black"
                  style={styles.iconButton}
                />
              </Pressable>
              <Pressable onPress={() => setCameraOpen(true)}>
                <FontAwesome
                  name="camera"
                  size={24}
                  color="black"
                  style={styles.iconButton}
                />
              </Pressable>

              <Pressable onPress={() => setCameraOpen(false)}>
                <FontAwesome
                  name="link"
                  size={24}
                  color="black"
                  style={styles.iconButton}
                />
              </Pressable>
            </View>
            <TouchableOpacity style={styles.publishButton} onPress={() => publishPost()}>
              <Text style={styles.publishButtonText}>Publicar</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </View>
    </View>
    <StatusBar backgroundColor='#215151' translucent barStyle={'light-content'}/>  
  </ScrollView>
  )
}