import React, { useEffect, useState } from 'react';
import { Text, View, TouchableOpacity, TextInput, FlatList, ListRenderItemInfo, ListRenderItem, Image } from "react-native"
import { styles } from "./styles";
import {styles as userStyles} from '../styles';
import { supabase } from '../../../lib/supabase';
import { postComments } from '../../../@types/postComments';
import { Divider } from 'react-native-elements';
import { Session } from '@supabase/supabase-js';

export const PostComments = (
  {
    postId,
    setIsModalVisible,
    session,
    memoryCommentsQuantity,
    setMemoryCommentsQuantity,
    objectOpened,
    setObjectOpened,
  }:
  {
    postId:string,
    setIsModalVisible:any,
    session:Session,
    memoryCommentsQuantity:any,
    setMemoryCommentsQuantity:any,
    objectOpened:any,
    setObjectOpened:any
  }
  
  ) => {
  const [comments, setComments] = useState<postComments[]>();
  const [newComment, setNewComment] = useState<string>('');
  const fetchComments = async () => {
    try {
      const {data:postCommentsData, error: postCommentsError} = await supabase
        .from('postComments')
        .select()
        .eq('postId', postId)
        
      if(postCommentsError) console.log(postCommentsError)

      const commentsWithAuthor = []
      if(postCommentsData) {
        for (const comment of postCommentsData) {
          const { data: userData, error: userError } = await supabase
            .from('users')
            .select()
            .eq('uid', comment.authorId)
            .single();

          if (userError) {
            console.log(userError);
            continue;
          }

          if (userData) {
            commentsWithAuthor.push({
              ...comment,
              author: userData, 
            });
          }
        }
        setComments(commentsWithAuthor)
      }
    
    
    } catch (error) {
      console.error('Erro ao buscar comentários:', error);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [postId]);

  const flatListSeparator = () => {
    return(<Divider/>)
  }
  
  const addNewComment = async  (postId:string, newComment:string) => {
    try {
      const { data, error } = await supabase
        .from('postComments')
        .insert({ authorId: session.user.id, postId: postId, content:newComment });
  
      if (error) {
        console.error('Erro ao adicionar comentário:', error.message);
      } else {
        const { data: postData, error: postError } = await supabase.rpc('increment_column_value', {
          table_name:'posts',
          column_name:'commentsQuantity',
          row_id:postId
        })
        
        if(postError)console.log(postError)
        if(postData) {
          setMemoryCommentsQuantity(memoryCommentsQuantity+1)
          console.log('comment quantity incremented: ', postData)
        }
        
        fetchComments()
        setNewComment('')
        console.log('Comentário adicionado com sucesso:', data);
      }
    } catch (e:any) {
      console.error('Erro inesperado:', e.message);
    }

  }

  const removeComment = async (comment:postComments) =>{
    try {
      const {data, error } = await supabase
        .from('postComments')
        .delete()
        .eq('id', comment.id) 
  
      if (error) {
        console.error('Erro ao adicionar comentário:', error.message);
      } else {
        const { data: postData, error: postError } = await supabase.rpc('decrement_column_value', {
          table_name:'posts',
          column_name:'commentsQuantity',
          row_id:postId
        })
        if(postError)console.log(postError)
        if(postData >= 0) {
          setMemoryCommentsQuantity(memoryCommentsQuantity-1)
          console.log('comment quantity decremented: ', postData)
        } 

        fetchComments()
      }
    } catch (e:any) {
      console.error('Erro inesperado:', e.message);
    }
  }

  const renderComment = (comment:postComments) => {
    return(
      <View style={styles.commentContainer}>
        <View style={styles.userAndCommentContainer}>

          <View style={styles.userInfo}>
            <Image style={userStyles.userImage} source={{uri: `${comment.author.photobase64 }`}} />
            <Text>{comment.author.name} {comment.author.lastname}</Text>
          </View>

          <Text style={styles.comment}>{comment.content}</Text>
        </View>
        {
        comment.author.uid === session.user.id&&
        <TouchableOpacity onPress={() => removeComment(comment)}>
          <Text style={styles.deleteCommentButton}>X</Text>
        </TouchableOpacity>
       
        }
      </View>
    )
  }
  return (
    <View style={styles.container}>
      
        <View style={styles.titleContainer}>
          <Text style={styles.commentTitle}>Comentários</Text>
          <TouchableOpacity 
            onPress={() => {
              setIsModalVisible(false)
              setObjectOpened('')
            }}
          >
            <Text>X</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.newCommentContainer}>
          <TextInput 
            multiline
            numberOfLines={4}
            maxLength={400}
            editable
            value={newComment}
            placeholder="Insira um comentário"
            onChangeText={text => setNewComment(text)}
            style={styles.commentInput} 
          />
          <TouchableOpacity style={styles.commentButton} onPress={() => addNewComment(postId, newComment)}>
              <Text style={styles.buttonText}>Comentar</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.flatListContainer}>
          <FlatList
              data={comments}
              renderItem={(comment:ListRenderItemInfo<postComments>) => renderComment(comment.item)}
              keyExtractor={(comment) => comment.id.toString()}
              style={styles.flatList}
              ItemSeparatorComponent={flatListSeparator}
              
          />
        </View>
      
    </View>
  )
}