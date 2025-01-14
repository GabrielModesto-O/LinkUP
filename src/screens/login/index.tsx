import 'react-native-url-polyfill/auto'
import React, { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabase'
import Auth from '../../components/auth/'
import {Profile} from '../profile/'
import {AuthChat} from '../../components/authChat'
import { SafeAreaView, StatusBar, View, Text, StyleSheet, Button, TouchableOpacity, ScrollView } from 'react-native'
import { Session } from '@supabase/supabase-js'
import { ThemeProvider } from 'styled-components'
import { useFonts, Poppins_700Bold, Poppins_400Regular, Poppins_500Medium } from '@expo-google-fonts/poppins';
import { theme }from '../../theme'
import { ChatScreen } from '../chatScreen'
import {ProfileUser} from '../profileUser'
import { Feed } from '../feed'
import{ TabRoutes } from "../../routers/tabRoutes";


export function Login() {
  const [session, setSession] = useState<Session | null>(null)
  const [fontsLoaded, fontsError] = useFonts({Poppins_700Bold, Poppins_400Regular, Poppins_500Medium})
  
  useEffect(() => {
    if(!session){
      supabase.auth.getSession().then(({ data: { session } }) => {
        setSession(session)
      })
    
      supabase.auth.onAuthStateChange((_event, session) => {
        setSession(session)
      })
    }
    
}, [])

  if(fontsError) console.log(fontsError)
  if(!fontsLoaded){
     return(<Text>carregando</Text>)     
  }else{
    return (
      <View style={styles.container}>
        {session && session.user ?  <TabRoutes key={session.user.id} session={session} /> : <Auth /> }
      </View>
      
    )
  }
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    
  }
})