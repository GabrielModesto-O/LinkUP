import React, { useEffect, useState } from 'react';
import { Image, Text, View, TouchableOpacity} from "react-native"
import AntDesignIcon from 'react-native-vector-icons/AntDesign'
import Icon from 'react-native-vector-icons/Octicons';
import EntypoIcons from 'react-native-vector-icons/Entypo';
import { styles } from "./styles";
import {theme} from "../../theme";
import { StackTypes } from '../../routers/stack';
import { User } from '../../@types/user';
import { supabase } from '../../lib/supabase';
import { Session } from '@supabase/supabase-js';
import { PostComments } from './PostComments';
import { useNavigation } from '@react-navigation/native';
import Modal from 'react-native-modal'
import { PostOptions } from './PostOptions';
import { PostEdit } from './PostOptions/PostEdit';



export const PostCard = (
  {
    currentPost,
    postAuthor,
    session,
  }:{
    currentPost:any
    postAuthor:User,
    session:Session,
  }

) => {

  const [post, setPost] = useState<any>(currentPost)
  const {id, description, photobase64, commentsQuantity, likesQuantity } = post
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [memoryLikesQuantity, setMemoryLikesQuantity] = useState<number>(likesQuantity)
  const [memoryCommentsQuantity, setMemoryCommentsQuantity] = useState<number>(commentsQuantity)
  const [objectOpened, setObjectOpened] = useState<string>('')
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [isFriend, setIsFriend] = useState<boolean>(false)
  const [currentUserIsFollowed, setCurrentUserIsFollowed] = useState<boolean>(false)
  const [isRequested, setIsRequested] = useState<boolean>(false)
  const user:User = postAuthor
  const navigation = useNavigation<StackTypes>()
  const [postIsHidden, setPostIsHidden] = useState<boolean>(false)

  useEffect(() => { 
    // Função para verificar se o usuário curtiu o post
    const checkIfUserLikedPost = async () => {
      try {
        // Consulta para verificar se há uma entrada na tabela postLikes
        const { data, error } = await supabase
          .from('postLikes')
          .select('userId')
          .eq('postId', id)
          .eq('userId', session.user.id);

        if (error) {
          console.error('Erro ao consultar o Supabase:', error.message);
          return;
        }

        // Se houver uma correspondência, o usuário curtiu o post
        const userLikedPost = data.length > 0;
        setIsLiked(userLikedPost);
      } catch (error:any) {
        console.error('Erro inesperado:', error.message);
      }
    };

    // Chamando a função ao iniciar o componente
    checkIfUserLikedPost();
  }, [id, session.user.id]);

  const checkIfIsFriend = async () => {
    try {
      const {data, error} = await supabase 
        .from('friendsList')
        .select()
        .eq('userId', session.user.id)
        .eq('friendId', postAuthor.uid)
      
      
      if(error) return console.log(error);
      
      if(data.length > 0) {
        setIsFriend(true)
      }
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {checkIfIsFriend()}, [session.user.id, postAuthor.uid])


  const checkIfIsFollowed = async () => {
    try {
      const {data, error} = await supabase 
        .from('friendsList')
        .select()
        .eq('userId', postAuthor.uid)
        .eq('friendId', session.user.id)
      
      
      if(error) return console.log(error);
      
      if(data.length > 0) {
        setCurrentUserIsFollowed(true)
      }else{
        setCurrentUserIsFollowed(false)
      }
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {checkIfIsFollowed()}, [session.user.id, postAuthor.uid])

  const addFriend = async (session:Session, friendUser: User) => {
    try {
      const { data, error } = await supabase
        .from('friendsList')
        .insert({ userId: session.user.id, friendId: friendUser.uid });
  
      if (error) {
        console.error('Erro ao adicionar amigo:', error.message);
      } else {
        setIsRequested(true)
        console.log('Amigo adicionado com sucesso:', data);
      }
    } catch (e:any) {
      console.error('Erro inesperado:', e.message);
    }
  };
  const removeRequest = async (session:Session, friendUser: User) => {
    try {
      const { data, error } = await supabase
        .from('friendsList')
        .delete()
        .eq('userId', session.user.id)
        .eq('friendId', friendUser.uid);
  
      if (error) {
        console.error('Erro ao cancelar solicitação:', error.message);
      } else {
        setIsRequested(false)
        console.log('Solicitação cancelada com sucesso:', data);
      }
    } catch (e:any) {
      console.error('Erro inesperado:', e.message);
    }
  };

  const openModal = (objectToOpen:string) => {
    if(objectToOpen === 'comments') setObjectOpened('comments')
    if(objectToOpen === 'postOptions') setObjectOpened('postOptions')
    if(objectToOpen === 'postOptionsEdit') setObjectOpened('postOptionsEdit')
    setIsModalVisible(true)
  }

  const likeCurrentPost = async (id:string) => {
    setIsLiked(true)
    setMemoryLikesQuantity(memoryLikesQuantity+1)
    try {
      const {data:postCommentsData, error:postCommentsError} = await supabase 
        .from('postLikes')
        .insert({postId:id, userId:session.user.id})

      if(postCommentsError)console.log(postCommentsError)
      const { data: postData, error: postError } = await supabase.rpc('increment_column_value', {
        table_name:'posts',
        column_name:'likesQuantity',
        row_id:id
      })

      if(postError) console.log(postError)

    } catch (error:any) {
      console.log(error.message)
    }
  }

  const dislikeCurrentPost = async (id:string) => {
    setIsLiked(false)
    setMemoryLikesQuantity(memoryLikesQuantity-1)
    
    try {
      const {data:postCommentsData, error:postCommentsError} = await supabase 
        .from('postLikes')
        .delete()
        .eq('postId', id)
        .eq('userId', session.user.id)
        
      if(postCommentsError)console.log(postCommentsError)

      const { data: postData, error: postError } = await supabase.rpc('decrement_column_value', {
        table_name:'posts',
        column_name:'likesQuantity',
        row_id:id
      })

      if(postError) console.log(postError)

    } catch (error:any) {
      console.log(error.message)
    }
    
  }

  const  handleUserProfileNavigation = () => {
    const userSession:any = session
    if(session.user.id === postAuthor.uid){navigation.navigate('ProfileUser', userSession)}
    else{
      const userWithSession = {
        user,
        currentUser:session
      }
      navigation.navigate('UserProfile', userWithSession )
    }
  }




  if(postIsHidden) return 
  return (
    <View style={styles.postCardContainer}>

      <Modal
        isVisible={isModalVisible} 
        onBackdropPress={() => {
          setIsModalVisible(false)
          setObjectOpened('')
        }} 
        coverScreen={true}
        backdropOpacity={0}
        style={styles.commentsModal}
      >
        {
          objectOpened === 'comments' &&
          <PostComments 
            postId={id} 
            setIsModalVisible={setIsModalVisible} 
            setObjectOpened={setObjectOpened}
            objectOpened={objectOpened}
            session={session}
            memoryCommentsQuantity={memoryCommentsQuantity}
            setMemoryCommentsQuantity={setMemoryCommentsQuantity}
          />
        }

        {
          objectOpened === 'postOptions' &&
          <PostOptions
            postId={id} 
            postAuthor={postAuthor}
            openModal={openModal}
            setIsModalVisible={setIsModalVisible} 
            setObjectOpened={setObjectOpened}
            setPostIsHidden={setPostIsHidden}
            objectOpened={objectOpened}
            session={session}

          />
        }
        
        {
          objectOpened === 'postOptionsEdit' &&
          <PostEdit
            postId={id} 
            setPost={setPost}
            post={post}
            postAuthor={postAuthor}
            openModal={openModal}
            setIsModalVisible={setIsModalVisible} 
            setObjectOpened={setObjectOpened}
            objectOpened={objectOpened}
            session={session}
          />
        }
        
      </Modal>
      
      <View style={styles.userContainer}>
        <View style={styles.userInfoContainer}>
          <Image style={styles.userImage} source={{uri: `${postAuthor.photobase64 }`}} />
          <TouchableOpacity style={styles.userInfo}  onPress={() => handleUserProfileNavigation()} >
            <Text style={styles.userName}>{postAuthor.name}</Text>
            <Text style={styles.userCourse}>{postAuthor.courseName}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.postButtonsContainer}>
          {
            !isFriend && !isRequested && postAuthor.uid !== session.user.id&&(
            <TouchableOpacity style={styles.addButton} onPress={() => addFriend(session, postAuthor)}>
              <Text style={styles.addButtonText}>Seguir</Text>
            </TouchableOpacity>
          )}
          {
            isRequested && !isFriend && postAuthor.uid !== session.user.id&&(
            <TouchableOpacity style={styles.addButton} onPress={() => removeRequest(session, postAuthor)}>
              <Text style={styles.addButtonText}>Cancelar</Text>
            </TouchableOpacity>
          )}
          {
            isFriend  && !isRequested && !currentUserIsFollowed && postAuthor.uid !== session.user.id&&(
            <Text style={styles.isFriendText}>Seguindo</Text>
          )}
          {
            isFriend  && currentUserIsFollowed && postAuthor.uid !== session.user.id&&(
            <Text style={styles.isFriendText}>Conectados</Text>
          )}

          <TouchableOpacity onPress={() => openModal('postOptions')}>
            <EntypoIcons name='dots-three-vertical' color={theme.COLORS.GRAY_700} style={styles.dotsIcon}/>
          </TouchableOpacity>
        </View>

      </View>

      <View style={styles.postContainer}>
        <Text style={styles.postDescription}>{description}</Text>
        {photobase64 &&  <Image style={styles.postCardImage} source={{uri: `${photobase64}`}} />}
        <View style={styles.postInteractionContainer}>
          {!isLiked&&
            <TouchableOpacity style={styles.likeIconContainer} onPress={() => likeCurrentPost(id)}>
                <AntDesignIcon 
                    name='hearto'
                    size={15}
                    color='black'
                    style={styles.likeIcon}
                />
                <Text style={styles.likesQuantity}>{memoryLikesQuantity}</Text>
            </TouchableOpacity>
          }
          
          {
            isLiked&&
            <TouchableOpacity style={styles.likeIconContainer} onPress={() => dislikeCurrentPost(id)}>
                <AntDesignIcon 
                    name='heart'
                    size={15}
                    color='red'
                    style={styles.likeIcon}
                />
                <Text style={styles.likesQuantity}>{memoryLikesQuantity}</Text>
            </TouchableOpacity>
          }
          
          <TouchableOpacity style={styles.commentIconContainer} onPress={() => openModal('comments')}>
            <Icon 
              name='comment'
              size={15}
              color='black'
              style={styles.commentIcon}
            />
            <Text style={styles.commentsQuantity}>{memoryCommentsQuantity}</Text>
          </TouchableOpacity>
        </View>

      </View>
    </View>
  )
}
