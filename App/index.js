import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import React, { useState, useEffect } from 'react';
//import { Button } from '@rneui/base';
import Words from './screens/Words'
import { Button , View } from "native-base";
import { NativeBaseProvider, Text, Box } from 'native-base';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Draggable from 'react-native-draggable';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { DraxProvider, DraxView, DraxList } from 'react-native-drax';
import Sentence from "./screens/Sentence"
import Header from './components/Header';
import Whisper from './whisper/Whisper';
import LogIn from './screens/LogIn';
/*import * as dotenv from 'dotenv' 
import express from 'express'

dotenv.config() */

// data structure: one dict? array of objects? three arrays?



function Home({navigation}) {

  // create words dataset

  var idCounter = 0;

  // var nouns = ["area","book","business","case","child","company","country","day","eye","fact","family","government","group","hand","home","job","life","lot","man","Mischelove", "money","month","mother","Mr","night","number","part","people","place","point","problem","program","question","right","room","school","state","story","student","study","system","thing","time","water","way","week","woman","word","work","world","year"]

  // var verbs = ["be","become","begin","call","can","come","could","do","feel","find","get","give","go","have","hear","help","keep","know","leave","let","like","live","look","love", "make","may","mean","might","move","need","play","put","run","say","see","seem","should","show","start","take","talk","tell","think","try","turn","use","want","will","work","would"]

  //var subjects = ["I","you","he","they","we","she","who","them","me","him","one","her","us","something","nothing","anything","himself","everything","someone","themselves","everyone","itself","anyone","myself"]
  
  // var adjectives = ["bad","best","better","big","black","certain","clear","different","early","easy","economic","federal","free","full","good","great","hard","high","human","important","international","large","late","little","local","long","low","major","military","my", "national","new","old","only","other","political","possible","public","real","recent","right","small","social","special","strong","sure","TRUE","white","whole","young"]
  
  var nouns = ['agua', 'aire', 'anillo', 'animal', 'arte', 'bandera', 'barco', 'beso', 'cama', 'campo', 'cielo', 'cinta', 'comida', 'cuerda', 'dedo', 'dinero', 'escuela', 'flor', 'fruta', 'grano', 'hombre', 'hora', 'iglesia', 'libro', 'luz', 'mano', 'mapa', 'mesa', 'mundo', 'mujer', 'musica', 'nariz', 'nieve', 'papel', 'paraguas', 'parka', 'pastel', 'pelo', 'pizza', 'puerta', 'reloj', 'roca', 'sal', 'silla', 'sombrero', 'suelo', 'taza', 'tierra', 'tigre', 'torre', 'ventana', 'viento']

  // additional nouns ["área","libro","negocio","caso","niño","compañía","país","día","ojo","hecho","familia","gobierno","grupo","mano","hogar","trabajo","vida","lote","hombre","Mischelove","dinero","mes","madre","señor","noche","número","parte","gente","lugar","punto","problema","programa","pregunta","derecha","habitación","escuela","estado","historia","estudiante","estudio","sistema","cosa","tiempo","agua","camino","semana","mujer","palabra","trabajo","mundo","año"]
  
  var verbs = ['ser', 'estar', 'tener', 'amar', 'hacer', 'decir', 'ir', 'ver', 'poder', 'querer', 'llevar', 'saber', 'traer', 'deber', 'venir', 'haber', 'hablar', 'buscar', 'llamar', 'pasar', 'levantar', 'coger', 'dejar', 'encontrar', 'entrar', 'guardar', 'gustar', 'importar', 'jugar', 'mantener', 'mirar', 'montar', 'necesitar', 'ocurrir', 'ofrecer', 'pedir', 'permitir', 'poner', 'probar', 'seguir', 'sentir', 'servir', 'suceder', 'terminar', 'intentar', 'resultar']

  var subjects = ["yo","tú","él","ellos","nosotros","ella","quién","ellos","mí","él","uno","ella","nosotros","algo","nada","cualquier cosa","él mismo","todo","alguien","ellos mismos","todos","si misma","cualquier persona","yo mismo"]
  
  var adjectives = ["malo","mejor","mejor","grande","negro","seguro","claro","diferente","temprano","fácil","económico","libre","completo","bueno","grande","duro","alto","humano","importante","internacional","grande","tarde","pequeño","local","largo","bajo","importante","militar","mío","nacional","nuevo","viejo","solo","otro","político","posible","público","real","reciente","derecho","pequeño","social","especial","fuerte","seguro","verdadero","blanco","completo","joven"]
  
  // English versions:

  var nounsEng = ["water", "air", "ring", "animal", "art", "flag", "boat", "kiss", "bed", "field", "sky", "ribbon", "food", "rope", "finger", "money", "school", "flower", "fruit", "grain", "man", "hour", "church", "book", "light", "hand", "map", "table", "world", "woman", "music", "nose", "snow", "paper", "umbrella", "parka", "cake", "hair", "pizza", "door", "clock", "rock", "salt", "chair", "hat", "floor", "cup", "earth", "tiger", "tower", "window", "wind"]
  
  var subjectsEng =   ["I","you","he","they","we","she","who","them","me","him","one","her","us","something","nothing","anything","himself","everything","someone","themselves","everyone","itself","anyone","myself"]

  var verbsEng = ['be', 'stay', 'have', 'love', 'make', 'say', 'go', 'see', 'be able to', 'want', 'carry', 'know', 'bring', 'owe', 'come', 'have', 'speak', 'look for', 'call', 'pass', 'raise', 'catch', 'leave', 'find', 'enter', 'save', 'like', 'matter', 'play', 'maintain', 'look', 'ride', 'need', 'happen', 'offer', 'ask', 'allow', 'put', 'try', 'follow', 'feel', 'serve', 'happen', 'finish', 'try', 'result']  

  var adjectivesEng = ["bad", "better", "better", "big", "black", "safe", "clear", "different", "early", "easy", "economic", "free", "full", "good", "big", "hard", "high", "human", "important", "international", "big", "late", "small", "local", "long", "low", "important", "military", "mine", "national", "new", "old", "only", "other", "political", "possible", "public", "real", "recent", "right", "small", "social", "special", "strong", "safe", "true", "white", "full", "young"]

  const initialWords = [];

  // add words to initial array
  for (var i=0; i<nouns.length; i++) {
    initialWords.push({id: idCounter, word: nouns[i], type:"noun", translation: nounsEng[i]});
    idCounter++;  
  }

  for (var i=0; i<verbs.length; i++) {
    initialWords.push({id: idCounter, word: verbs[i], type:"verb", translation: verbsEng[i]}); 
    idCounter++;   
  }

  for (var i=0; i<subjects.length; i++) {
    initialWords.push({id: idCounter, word: subjects[i], type:"subject", translation: subjectsEng[i]}); 
    idCounter++;   
  }

  for (var i=0; i<adjectives.length; i++) {
    initialWords.push({id: idCounter, word: adjectives[i], type:"adjective", translation: adjectivesEng[i]}); 
    idCounter++;   
  }

  // create state with initial array
  const [words, setWords] = useState(initialWords);

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Draggable>
        <Button onPress={() => navigation.navigate('Words', {words: words, setWords: setWords})}>Load Say</Button>
      </Draggable>
      <Draggable>
        <Button onPress={() => navigation.navigate('LogIn')}>Load SignIn</Button>
      </Draggable>
      <Draggable>
        <Button onPress={() => navigation.navigate('Whisper')}>Load Whisper</Button>
      </Draggable>
    </View>
  )
}

//export default () => <Words/>

// create native base button DONE
// native base button navigates to new screen using stack navigation DONE
// Create state with 150 most common words DONE
// Get an image for each word OR translation for hover LATER
// Pass words to new card DONE
// Generate cards for each image-word pair DONE
// Make cards nicer DONE, scrollable DONE
// Make cards randomized
// Sort cards by type, three sections swipe DONE 
// Create drag and drop boxes DONE
/// https://medium.com/nerd-for-tech/drag-drop-and-swap-between-two-lists-using-react-native-d864dab43aa9
// Create general words state DONE
// Drag and drop boxes DONE
// Connect boxes to dragged words DONE
// Set limits by word type for dragging DONE
// Sentence save button DONE
// Sentence save button saves sentence to state DONE
// Improve Words code organization
// Sentence navigation???
// Shuffle on word double tap???
// Check bugs DONE 
// Save sentence automatically, make it snappy // TODAY
// Check sentence and enable READY when complete DONE
// Enhance sentence with double translate on Google Translate API DONE
// Fix decode bug DONE
// Containerize DONE
// Initial Figma DONE
// Bug: drag off on scrolling DONE
// Switch to Spanish DONE
// New navigation DONE
// Add logo DONE
// Bug: Ready button should refresh sentence
// Integrate GPT3 to Ready button DONE
// Save sentences TODAY
// Add translations to words DONE
// View phrasebook TODAY
// Get whisper working DONE
// Card colors by type 
// GPT3 sentence coloring
// Say! button 
// Say! button AI
// GPT3 chat response
// Integrate GPT3 DONE
// UI enhancements DONE
/// Boxes close and open, proper buttons DONE
/// Unfilled boxes styling 
/// New word cards DONE
/// Swipe by category DONE
/// Colors and styling DONE
// Edge cases cleanup
/// Subjects and nouns interchangeable


//CLEANUP

// Remove Draggable
// Solve child warning

// LIBRARIES
/// react-native-drax
/// html-entities

const Stack = createNativeStackNavigator();

// add linear gradient to navigation container 
export default function App() {
  return (
    <NavigationContainer>
    <NativeBaseProvider style={styles.container}>
    <Header />
    <Stack.Navigator> 
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="LogIn" component={LogIn} />
      <Stack.Screen name="Words" component={Words} />
      <Stack.Screen name="Whisper" component={Whisper} />
    </Stack.Navigator>
    </NativeBaseProvider>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
})