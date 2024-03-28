import React, { useState } from 'react';
import { Text, View, TouchableOpacity, Alert, TextInput, ImageBackground } from "react-native"
import { styles } from "./styles";
import { supabase } from '../../../../lib/supabase';
import { Session } from '@supabase/supabase-js';
import { Post } from '../../../../@types/posts';
import { Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export const PostEdit = (
    {
        postId,
        postAuthor,
        post,
        setPost,
        setIsModalVisible,
        session,
        objectOpened,
        openModal,
        setObjectOpened,
      }:
      {
        postId:string,
        postAuthor:any,
        post:Post,
        setPost:any,
        setIsModalVisible:any,
        session:Session,
        openModal:any
        objectOpened:any,
        setObjectOpened:any,
      }
) => {
    const {id, description, photobase64, commentsQuantity, likesQuantity } = post
    const [postDescription, setPostDescription] = useState(description)
    const [image, setImage] = useState(photobase64);
    const [updateError, setUpdateError] = useState<any>('')

    const updateCurrentPost = (description:string, image:any) => {
      setPost((prevPost:Post) => ({
          ...prevPost, 
          description:description,
          photobase64:image
        })
      )
    }
    const editPost = async () => {
      try {
        if(image){
          const {data, error} = await supabase 
            .from('posts')
            .update({description:postDescription, photobase64:image})
            .eq('id', id)
          if(error){
            setUpdateError(error)
            setPost(postDescription)
            return (console.log(updateError))
          }
          
        }else{
          const {data, error} = await supabase 
            .from('posts')
            .update({description:postDescription, photobase64:null})
            .eq('id', id)
          if(error){
            setUpdateError(error)
            return (console.log(updateError))
          }
        }
        
        updateCurrentPost(postDescription, image)
        setObjectOpened('')
        setIsModalVisible(false)
      } catch (error) {
          console.log(error)
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
    return (
        <View style={styles.postCardContainer}>
          <View style={styles.titleContainer}>
                <Text style={styles.modalTitle}>Editar post</Text>
                <TouchableOpacity 
                    onPress={() => {
                        setIsModalVisible(false)
                        setObjectOpened('')
                    }}
                >
                    <Text>X</Text>
                </TouchableOpacity>
            </View>
          <View style={styles.userContainer}>
            <View style={styles.userInfoContainer}>
              <Image style={styles.userImage} source={{uri: `${postAuthor.photobase64 }`}} />
              <TouchableOpacity style={styles.userInfo} >
                <Text style={styles.userName}>{postAuthor.name}</Text>
                <Text style={styles.userCourse}>{postAuthor.courseName}</Text>
              </TouchableOpacity>
            </View>
          </View>
    
          <View style={styles.postContainer}>
            <TextInput
                style={styles.postDescription}
                cursorColor={'black'}
                multiline={true}
                numberOfLines={1}
                onChangeText={(text) => setPostDescription(text)}
                value={postDescription}
            />
            {image && 
              <>
              <View style={styles.removeImageContainer}>
                <TouchableOpacity style={styles.removeImageButton} onPress={() => setImage('')}>
                  <Text style={styles.removeImageText}>x</Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity onPress={() => takeImage()}>
                <Image source={{ uri: image }} style={styles.postCardImage} />
              </TouchableOpacity>
              </>
            }
            {!image &&
              <TouchableOpacity style={styles.postImageToChoose} onPress={() => takeImage()}>
                <ImageBackground
                  source={{uri:'https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png'}} 
                  resizeMode="cover" 
                  style={styles.postCardImage}
                >
                  <Text style={styles.addImageText}>Adicionar uma imagem</Text> 
                </ImageBackground>
                <View style={styles.overlay}></View>
              </TouchableOpacity>
            }
          </View>
          <View style={styles.publishButtonContainer}>
            <TouchableOpacity style={styles.publishButton} onPress={() => editPost()}>
                <Text style={styles.publishButtonText}>Publicar</Text>
            </TouchableOpacity>
          </View>
        </View>
    )
}