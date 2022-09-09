import { StatusBar } from 'expo-status-bar';
//import { StyleSheet, Text, SafeAreaView } from 'react-native';
import React, { useState, useEffect } from 'react';
//import { Button } from '@rneui/base';
import Words from './screens/Words'
import { Button , View } from "native-base";
import { NativeBaseProvider, Text, Box } from 'native-base';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


// data structure: one dict? array of objects? three arrays?



function Home({navigation}) {

  // create words dataset

  var idCounter = 0;

  var nouns = ["area","book","business","case","child","company","country","day","eye","fact","family","government","group","hand","home","job","life","lot","man","money","month","mother","Mr","night","number","part","people","place","point","problem","program","question","right","room","school","state","story","student","study","system","thing","time","water","way","week","woman","word","work","world","year"]

  var verbs = ["be","become","begin","call","can","come","could","do","feel","find","get","give","go","have","hear","help","keep","know","leave","let","like","live","look","make","may","mean","might","move","need","play","put","run","say","see","seem","should","show","start","take","talk","tell","think","try","turn","use","want","will","work","would"]

  var subjects = ["I","you","he","they","we","she","who","them","me","him","one","her","us","something","nothing","anything","himself","everything","someone","themselves","everyone","itself","anyone","myself"]

  var adjectives = ["bad","best","better","big","black","certain","clear","different","early","easy","economic","federal","free","full","good","great","hard","high","human","important","international","large","late","little","local","long","low","major","military","national","new","old","only","other","political","possible","public","real","recent","right","small","social","special","strong","sure","TRUE","white","whole","young"]

  const initialWords = [];

  // add words to initial array
  for (var i=0; i<nouns.length; i++) {
    initialWords.push({id: idCounter, word: nouns[i], type:"noun"});
    idCounter++;  
  }

  for (var i=0; i<verbs.length; i++) {
    initialWords.push({id: idCounter, word: verbs[i], type:"verb"}); 
    idCounter++;   
  }

  for (var i=0; i<subjects.length; i++) {
    initialWords.push({id: idCounter, word: subjects[i], type:"subject"}); 
    idCounter++;   
  }

  for (var i=0; i<adjectives.length; i++) {
    initialWords.push({id: idCounter, word: adjectives[i], type:"adjective"}); 
    idCounter++;   
  }

  // console.log("initialWords are ", initialWords);

  // create state with initial array
  const [words, setWords] = useState(initialWords);

  console.log("words are ", words);

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button onPress={() => navigation.navigate('Words')}>Words!</Button>
    </View>
  )
}

//export default () => <Words/>

// create native base button DONE
// native base button navigates to new screen using stack navigation DONE
// Create state with 150 most common words DONE
// Get an image for each word OR translation for hover LATER
// Generate cards for each image-word pair 
// Drag and drop by category
// Save sentence
// Translate sentence with Google Translate API
// Enhance sentence with double translate on Google Translate API

const Stack = createNativeStackNavigator();
console.log("stack is ", Stack);



export default function App() {
  return (
    <NavigationContainer>
    <NativeBaseProvider>
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Words" component={Words} />
    </Stack.Navigator>
      <Box flex={1} bg="#fff" alignItems="center" justifyContent="center">
        <StatusBar style="auto" />
        <Button onPress={() => console.log("hello world")}>Click Me</Button>
      </Box>
    </NativeBaseProvider>
    </NavigationContainer>
  );
}

/* const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
}); */
