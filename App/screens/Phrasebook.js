import React, { useState, useEffect } from 'react';
import {
 SafeAreaView,
 StatusBar,
 StyleSheet,
 View,
 Text,
 Dimensions,
 TouchableOpacity,
 Image
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient'
import { makeRedirectUri, startAsync } from 'expo-auth-session';
import { supabase, supabaseUrl} from '../lib/supabase';
import { Button, Input } from '@rneui/themed'
import { Buffer } from "buffer";
import Header from '../components/Header';

const PAGE_HEIGHT = Dimensions.get('window').height;

const Phrasebook = () => {

    const [sentences, setSentences] = useState([])

  // Retrieve session

  const [session, setSession] = useState()

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [])
  // Fetch sentences based on session

  async function fetchSentences() {
    
    const { data, error } = await supabase
    .from('sentences')
    .select('sentence')
    .eq('user', session.user.id)  

    if (error) alert(error.message)

    console.log("data.sentence is ", data)

}

  

 return (  
    <View style={styles.container}>      
    <View style={styles.container}>
        <LinearGradient 
        colors={['#9F00B9', '#FFDC61']}
        locations={[0, .99]}
        style={styles.linearGradient}
        />
        <Header />
        <View style={styles.topContent}>
        <Text style={styles.mainText}>
        Your phrasebook
        </Text>
        <Button onPress={fetchSentences}>Fetch sentences</Button>
        </View>
   </View>
   </View>
 )
}

const styles = StyleSheet.create({
 /*container: {
  height: Dimensions.get('window').height,
  backgroundColor: "black",
 },*/
 container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    //alignItems: 'center',
    display: 'flex',
},
 topContent: {
  flex: 1,
  alignItems: 'center',
  justifyContent: 'center'
 },
 mainText: {
  fontSize: 54,
  color: "white",
 },
 linearGradient: {
    position: 'absolute',
    height: PAGE_HEIGHT,
    left: 0,
    right: 0,
    top: 0,    
},
});

export default Phrasebook;