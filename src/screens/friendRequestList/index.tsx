import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  SafeAreaView,
  TextInput,
  ScrollView,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import {styles} from './styles'
import { Divider, Icon } from 'react-native-elements';
import {theme} from '../../theme';
import { supabase } from '../../lib/supabase';
import { Session } from '@supabase/supabase-js';
import { User } from '../../@types/user';
import {RenderCourse} from './RenderCourse'
import { RenderUsersOnCourses } from './RenderUsersOnCourses';
import { RenderAllUsers } from './RenderAllUsers';

type FriendRequest = {
  uid: string;
  name: string;
  lastName:string;
  courseName: string;
  courseId:number;
  photobase64: string;
  isSuggestion?:boolean;
};
type Interest = {
  id:number, 
  name:string,
  members:number,
}
export const FriendList = ({session}:{session:Session}) => {
  const [searchText, setSearchText] = useState<string>('');
  const [searchError, setSearchError] = useState<boolean>(false); // Estado para controlar o erro de busca
  const [loading, setLoading] = useState(false)
  const [refreshing, setRefreshing] = useState(false);
  const [coursesWithStudents, setCoursesWithStudents] = useState<any>([]);
  const [userFoundsBySearchInput, setUserFoundsBySearchInput] = useState<User[]>([])
  console.log(searchText)
  
  const getStudentsByCourse = async (courseId:any) => {
    try {
      const { data, error } = await supabase
        .from('users')
        .select()
        .eq('courseId', courseId)
        .not('uid', 'eq', session.user.id); 

      if (error) {
        throw error;
      }

      return data;
    } catch (error) {
      console.error('Erro ao obter alunos do curso:', error);
      return null;
    }
  };

  const fetchCourses = async () => {
    setLoading(true)
    try {
      const { data: coursesData, error: coursesError } = await supabase
        .from('courses')
        .select('id, courseName');

      if (coursesError) {
        throw coursesError;
      }

      const courses = coursesData || [];

      // Iterar sobre os cursos e obter os alunos de cada curso
      const coursesWithStudentsData = await Promise.all(
        courses.map(async (course) => {
          const courseId = course.id;
          const students = await getStudentsByCourse(courseId);
          
          // Retornar um objeto que contém as informações do curso e os alunos
          return {
            course,
            students: students || [], // Pode ser uma array vazia se não houver alunos
          };
        })
      );

      // Definir o estado coursesWithStudents com os dados obtidos
      setCoursesWithStudents(coursesWithStudentsData);
    } catch (error) {
      console.error('Erro ao obter cursos ou alunos:', error);
    }
    finally{setLoading(false)}
  };
 
  const fetchUsersByName = async (name: string) => {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .ilike('name', `%${name}%`)
        .not('uid', 'eq', session.user.id); 


      if (error) {
        throw error;
      }
      if (data.length === 0) setSearchError(true);
      else setSearchError(false);
      
      if (data && data.length > 0) {
        setUserFoundsBySearchInput(data);
      }else{
        setUserFoundsBySearchInput([]);
      }
    } catch (error) {
      console.error('Erro ao buscar usuários:', error);
    }
  };


  useEffect(() => {fetchCourses();}, [])


  const handleSearch = (text: string) => {
    setSearchText(text);
    setTimeout(() => {
      searchUserByText()  
    }, 200)
    const searchUserByText = () => {
      if(text){
        fetchUsersByName(text);
      }else{
        setUserFoundsBySearchInput([])
        setSearchError(false)
        fetchCourses()
      }
    }

  };

  const onRefresh = async () => {
    setRefreshing(true);
    fetchCourses()
    setRefreshing(false);
    setLoading(false)

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
      <ScrollView style={{ flex: 1 }}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
      >
        <View style={styles.spacingContainer}>
          <View style={styles.searchBar}>
            <TextInput
              style={styles.searchInput}
              placeholder="Pesquisar"
              value={searchText}
              onChangeText={handleSearch}
            />
            <Icon name='search' color={theme.COLORS.GRAY_200} style={styles.searchIcon} />
          </View>
          {/* <View style={styles.tabButtons}>
            <TouchableOpacity style={styles.tabButton}>
              <Text style={styles.tabButtonText}>Amigos</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.tabButton}>
              <Text style={styles.tabButtonText}>Solicitações</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.tabButton}>
              <Text style={styles.tabButtonText}>Grupos</Text>
            </TouchableOpacity>
          </View> */}
          
          <Divider style={styles.divider} />

          {userFoundsBySearchInput.length > 0 && 
            <FlatList
              data={userFoundsBySearchInput}
              keyExtractor={(user) => user.uid}
              renderItem={(item) => <RenderAllUsers user={item} session={session} />}
            />
          }

          {searchError && <Text>Nenhum resultado encontrado.</Text>}
          
          {userFoundsBySearchInput.length === 0 && !searchError &&
            <FlatList
              data={coursesWithStudents}
              keyExtractor={(course) => course.course.id}
              renderItem={(item) => <RenderCourse item={item} session={session} />}
            />
          }
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

