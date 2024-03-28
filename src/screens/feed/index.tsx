import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, Text, FlatList, StatusBar, ActivityIndicator, ScrollView, RefreshControl } from 'react-native';
import { supabase } from '../../lib/supabase';
import { PostCard } from '../../components/PostCard';
import { styles } from './styles';
import { Header } from '../../components/header';
import { Session } from '@supabase/supabase-js';
import { Props } from '@fortawesome/react-native-fontawesome';
import { User } from '../../@types/user';
import { theme } from '../../theme';




export const Feed = ({session}:{session:Session}, {user}: {user:User}) => {
  const [fetchError, setFetchError] = useState<string>('')
  const [posts, setPosts] = useState<any>(null)
  const [fetchUserError, setFetchUserError] = useState<string>('')
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const fetchPosts = async () => {
    try {
      const { data: postsData, error: postsError } = await supabase
        .from('posts')
        .select()
        .order('createdAt', {ascending:false});

      if (postsError) {
        setFetchError("Não foi possível acessar os posts");
        setPosts(null);
        console.log(postsError);
        return;
      }

      if (postsData) {
        const { data: hiddenPostsData, error: hiddenPostsError } = await supabase
          .from('hiddenPostsList')
          .select('postId')
          .eq('userId', session.user.id);

        if(hiddenPostsError) return console.log(hiddenPostsError)
        
        const hiddenPostIds = new Set(hiddenPostsData.map((hiddenPost:any) => (hiddenPost.postId)));
        const filteredPostsData = postsData.filter(
          (post) => !hiddenPostIds.has(post.id)
          );
          
        const postsWithAuthors = [];
        for (const post of filteredPostsData) {
          const { data: userData, error: userError } = await supabase
            .from('users')
            .select()
            .eq('uid', post.author)
            .single();

          if (userError) {
            setFetchUserError("Não foi possível carregar o usuário");
            console.log(userError);
            continue;
          }

          if (userData) {
            postsWithAuthors.push({
              ...post,
              author: userData, 
            });
          }
        }

        setPosts(postsWithAuthors);
        setFetchError('');
      }
    } catch (e) {
      console.error(e);
    }
    finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);
  
  const onRefresh = async () => {
    setRefreshing(true);
    await fetchPosts();
    setRefreshing(false);
    setRefreshKey((prevKey) => prevKey + 1);

  };

  const renderPost = (
      { item: post }:any, 
      session:Session,
    ) => {
      return(
        <PostCard 
          currentPost={post}
          postAuthor={post.author}
          session={session}
        />
      )
  };

  if (loading) {
    return (
      <View style={{
        flex:1,
        justifyContent:'center'
      }}>
        <ActivityIndicator size="large" color={theme.COLORS.LIME_GREEN} />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
      >
        <Header session={session} user={user}></Header>

        {fetchError && (<Text>{fetchError}</Text>)}
        {posts && (
          <View>
            <FlatList
              key={refreshKey}
              data={posts}
              renderItem={(post:any) => renderPost(post, session)}
              keyExtractor={(post) => post.id.toString()}
            />
          </View>
        )}
        <StatusBar backgroundColor='#215151' translucent barStyle={'light-content'}/>    
      </ScrollView>      
    </SafeAreaView>
  );
};


