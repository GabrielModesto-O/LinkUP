import React, { useEffect, useState } from 'react';
import { Text, View, TouchableOpacity, Alert, FlatList, ListRenderItem, Image } from "react-native"
import { styles } from "./styles";
import {styles as postStyles} from '../../../components/PostCard/styles'
import { supabase } from '../../../lib/supabase';
import { Session } from '@supabase/supabase-js';
import Icon from 'react-native-vector-icons/FontAwesome'; 
import { PostHidden } from '../../../@types/postHidden';
import { Post } from '../../../@types/posts';
import { useNavigation } from '@react-navigation/native';
import { StackTypes } from '../../../routers/stack';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import { Divider } from 'react-native-elements';


export const Privacy = (
{
    setIsModalVisible,
    session,
    objectOpened,
    setObjectOpened,
}:
{
    setIsModalVisible:any,
    session:Session,
    objectOpened:any,
    setObjectOpened:any,
}
) => {
    const [hiddenPosts, setHiddenPosts] = useState<PostHidden[]>([])
    const navigation = useNavigation<StackTypes>()
   
    const fetchHiddenPosts = async () => {
        try {
            const {data, error} = await supabase 
                .from('hiddenPostsList')
                .select()
            if(error) return console.log(error)
            if(data.length > 0){
                const hiddenPosts = [];
                for (const post of data) {
                    const { data: postData, error: postError } = await supabase
                      .from('posts')
                      .select()
                      .eq('id', post.postId)
                      .single();
          
                    if (postError) {
                      console.log(postError);
                      continue;
                    }
          
                    if (postData) {
                        const { data: userData, error: userError } = await supabase
                            .from('users')
                            .select()
                            .eq('uid', postData.author)
                            .single();
                        if (userError) {
                            console.log(userError);
                            continue;
                        }
                        if(userData){
                            hiddenPosts.push({
                                ...post,
                                post: postData, 
                                author:userData
                            });
                        }
                    }
                }
                setHiddenPosts(hiddenPosts)
            }else{
                setHiddenPosts([])
            }
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        fetchHiddenPosts()
    }, [])

    const deleteFromDatabase = async (postId:string) => {
        try {
            const {data, error } = await supabase
                .from('hiddenPostsList')
                .delete()
                .eq('userId', session.user.id) 
                .eq('postId', postId)
        
            if (error) {
                console.error('Erro ao deletar post:', error.message);
                return
            } 
            fetchHiddenPosts()
        } 
        catch (e:any) {
            console.error('Erro inesperado:', e.message);
        }
    }

    const renderHiddenPosts = (item:PostHidden, session:Session) => {
        return(
            <View style={styles.hiddenPostsContainer}>
                <View style={postStyles.userInfoContainer}>
                    <Image style={postStyles.userImage} source={{uri: `${item.author.photobase64 }`}} />
                    <TouchableOpacity style={postStyles.userInfo}>
                        <Text style={postStyles.userName}>{item.author.name} {item.author.lastname}</Text>
                        <Text style={styles.userCourse}>{item.author.courseName}</Text>
                    </TouchableOpacity>

                </View>

                <View style={postStyles.postContainer}>
                    <Text style={postStyles.postDescription}>{item.post.description}</Text>
                    {item.post.photobase64 &&  <Image style={postStyles.postCardImage} source={{uri: `${item.post.photobase64}`}} />}
                </View>
                <View style={styles.postButtonsContainer}>
                    <TouchableOpacity style={styles.showAgainButton} onPress={() => deleteFromDatabase(item.postId)}>
                        <Text style={styles.showAgainButtonText}>Exibir novamente</Text>
                    </TouchableOpacity>
                </View>
            </View>
            
        )
    }
    const flatListSeparator = () => {
        return (<Divider style={styles.flatListSeparator}/>)
    }
    return (
        <View style={styles.container}>
            <View style={styles.titleContainer}>
                <Text style={styles.modalTitle}>Posts ocultados</Text>
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
                {
                    hiddenPosts &&
                    <FlatList
                        data={hiddenPosts}
                        renderItem={({item} : {item:PostHidden}) => renderHiddenPosts(item, session)}
                        keyExtractor={(hiddenPost:PostHidden) => hiddenPost.postId.toString()}
                        ItemSeparatorComponent={flatListSeparator}
                        style={styles.flatList}
                        contentContainerStyle={{ flexGrow: 1 }}
                    />
                }
                {
                    hiddenPosts.length < 1 && 
                    <Text>Não há nenhum post ocultado na sua conta</Text>
                }
            </View>
        </View>
    )
}