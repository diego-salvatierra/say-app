import React from 'react';
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

const PAGE_HEIGHT = Dimensions.get('window').height;



const LogIn = () => {
 return (        
    <View style={styles.container}>
    <LinearGradient 
    colors={['#9F00B9', '#FFDC61']}
    locations={[0, .99]}
    style={styles.linearGradient}
    />
    <View style={styles.topContent}>
     <Text style={styles.mainText}>
      Log In
     </Text>
    </View>
    <View style={styles.bottomContent}>
     <TouchableOpacity style={styles.googleButton}>
      <Image
       style={styles.googleIcon}
       source={{
        uri: "https://i.ibb.co/j82DCcR/search.png",
       }}
      />
      <Text style={styles.googleButtonText}>Sign in with Google</Text>
     </TouchableOpacity>
    </View>
   </View>
 );
};

const styles = StyleSheet.create({
 container: {
  height: Dimensions.get('window').height,
  backgroundColor: "black",
 },
 topContent: {
  flex: 1,
  alignItems: 'center',
  justifyContent: 'center'
 },
 bottomContent: {
  flex: 1,
  alignItems: 'center',
  justifyContent: 'center'
 },
 mainText: {
  fontSize: 54,
  color: "white",
 },
 googleButton: {
  backgroundColor: "white",
  borderRadius: 4,
  paddingHorizontal: 34,
  paddingVertical: 16,
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center'
 },
 googleButtonText: {
  marginLeft: 16,
  fontSize: 18,
  fontWeight: '600'
 },
 googleIcon: {
  height: 24,
  width: 24
 },
 linearGradient: {
    position: 'absolute',
    height: PAGE_HEIGHT,
    left: 0,
    right: 0,
    top: 0,    
},
});
export default LogIn;