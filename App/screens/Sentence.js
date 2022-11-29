import React, { useState, useEffect } from 'react';
import { Card } from "@rneui/themed";
import { View, TouchableOpacity, ScrollView, StyleSheet } from "react-native";
import { DraxProvider, DraxView, DraxList } from 'react-native-drax';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import SentenceWord from '../components/SentenceWord';
import SaveSentence from '../components/SaveSentence';

const Sentence = ({ words, setWords }) => {

    // Set initial empty sentence

    const sentenceInit = [
        {
            "id": -1,
            "type": "subject",
            "word": "SUBJECT",
        },
        {
            "id": -2,
            "type": "verb",
            "word": "VERB",
        },
        {
            "id": -3,
            "type": "adjective",
            "word": "ADJECTIVE",
        },
        {
            "id": -4,
            "type": "noun",
            "word": "NOUN",
        }  
    ]

    const [sentence, setSentence] = useState(sentenceInit); 
    
    const gestureRootViewStyle = { flex: 1 };

    const styles = StyleSheet.create({
        container: {
            flexDirection: 'row',
            flexWrap: 'wrap',
            borderColor: 'black',
            borderWidth: 1,
        },
        item: {
            flexDirection: 'row',
            flexWrap: 'wrap',
            width: '33%'
        },
        draggable: {
            width: 100,
            height: 100,
            backgroundColor: 'blue',
        },
        dragging: {
            opacity: 0.1,
        },
      })

    // Automatic completion checker

    const [sentenceReady, setSentenceReady] = useState(false);
    const [savedSentence, setSavedSentence] = useState("");

    const sentenceTest = () => {
        // check to see three main boxes are full
        if ((sentence.some((element) => ((element.type==="noun") && (element.id >= 0)))) &&
        (sentence.some((element) => (element.type==="verb") && (element.id >= 0))) &&
        (sentence.some((element) => (element.type==="subject") && (element.id >= 0))))
        {
            console.log("sentence is complete")
            setSentenceReady(true);
        }
        else {
            console.log("you are missing words")
        }
    }

    const concatSentence = () => {
        if (sentenceReady===true) {
            var midSentence = "";
            for (let i = 0; i < sentence.length; i++) {
                if (sentence[i].id >= 0) {
                    midSentence = midSentence.concat(sentence[i].word, " ");
                }
            }
            setSavedSentence(midSentence);
            console.log("savedSentence is ", savedSentence);
            alert("you have completed sentence ", midSentence);
        }
    }

    return (
        <View>
            <SaveSentence sentence={sentence}/>
            <ScrollView contentContainerStyle={styles.container}>
                {(sentence || []).map(
                    (word, index) => (
                        <SentenceWord key={index} word={word} index={index} words={words} sentence={sentence} setSentence={setSentence}/>
                    ))
                }
            </ScrollView>
        </View>
    )
}

export default Sentence;