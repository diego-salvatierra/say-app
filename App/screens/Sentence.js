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

    return (
        <View>
            <SaveSentence sentence={sentence}/>
            <ScrollView contentContainerStyle={styles.container}>
                {sentence.map((word, index) => SentenceWord(word, index, words, setWords, sentence, setSentence))}
            </ScrollView>
        </View>
    )
}

export default Sentence;