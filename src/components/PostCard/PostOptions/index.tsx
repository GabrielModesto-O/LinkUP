import React, { useState } from 'react';
import { Text, View, TouchableOpacity, Alert } from "react-native"
import { styles } from "./styles";
import { supabase } from '../../../lib/supabase';
import { Session } from '@supabase/supabase-js';
import Icon from 'react-native-vector-icons/FontAwesome'; 
import Modal from 'react-native-modal'


export const PostOptions = (
    {
        postId,
        postAuthor,
        setIsModalVisible,
        session,
        objectOpened,
        openModal,
        setObjectOpened,
        setPostIsHidden
      }:
      {
        postId:string,
        postAuthor:any,
        setIsModalVisible:any,
        session:Session,
        openModal:any
        objectOpened:any,
        setObjectOpened:any,
        setPostIsHidden:any
      }
) => {
    const [isEditModalVisible, setIsEditModalVisible] = useState<boolean>(false);

    const hidePost = async() => {
        try {
            const {data, error} = await supabase 
            .from('hiddenPostsList')
            .insert({postId:postId, userId: session.user.id})
            
            if(error) return console.log(error)
            setPostIsHidden(true)
            
        } catch (error) {
            console.log(error)
        }
    }

    const handlePostDelete = (postId:string) => {
        Alert.alert('Tem certeza que deseja deletar seu post?', 'Essa ação não poderá ser desfeita', [
            {
                text:'Deletar postagem',
                onPress:() => deleteFromDatabase(),
                style:'default'
            },
            {
                text:'Cancelar',
                onPress:() => {},
                style:'cancel'
            }
        ])
        const deleteFromDatabase = async () => {
            try {
                const {data, error } = await supabase
                  .from('posts')
                  .delete()
                  .eq('id', postId) 
            
                if (error) {
                  console.error('Erro ao deletar post:', error.message);
                  return
                } 
                setObjectOpened('')
                setIsModalVisible(false)
                setPostIsHidden(true)
              } catch (e:any) {
                console.error('Erro inesperado:', e.message);
              }
        }
    }

    const handlePostEdit = (postId:string) => {
        openModal('postOptionsEdit')
    }

    return (
        <View style={styles.container}>
            <View style={styles.titleContainer}>
                <Text style={styles.modalTitle}>Opções</Text>
                <TouchableOpacity 
                    onPress={() => {
                        setIsModalVisible(false)
                        setObjectOpened('')
                    }}
                >
                    <Text>X</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.allOptionsContainer}>
                {postAuthor.uid === session.user.id && (
                    <>
                    <View style={styles.card}>
                        <TouchableOpacity style={styles.optionContainer} onPress={() => handlePostEdit(postId)}>
                            <Icon name="edit" size={20} color="#3498db" />
                            <Text style={styles.optionText}>Editar</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.card}>
                        <TouchableOpacity style={styles.optionContainer} onPress={() => handlePostDelete(postId)}>
                            <Icon name="trash" size={20} color="#e74c3c" />
                            <Text style={styles.optionText}>Deletar</Text>
                        </TouchableOpacity>
                    </View>
                    </>
                )}

                <View style={styles.card}>
                    <TouchableOpacity style={styles.optionContainer} onPress={() => hidePost()}>
                    <Icon name="eye-slash" size={20} color="#2ecc71" />
                    <Text style={styles.optionText}>Ocultar</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.card}>
                    <TouchableOpacity style={styles.optionContainer}>
                    <Icon name="exclamation-circle" size={20} color="#e74c3c" />
                    <Text style={styles.optionText}>Denunciar</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}