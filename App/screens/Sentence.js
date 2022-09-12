import React, { useState, useEffect } from 'react';
import { Card } from "@rneui/themed";
import { View, TouchableOpacity, ScrollView, StyleSheet } from "react-native";
import { DraxProvider, DraxView, DraxList } from 'react-native-drax';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import DraggableWord from '../components/DraggableWord';

const Sentence = ({ word }) => {

    // Set initial empty sentence

    const sentenceInit = [
        {
            "id": NaN,
            "type": "subject",
            "word": "SUBJECT",
        },
        {
            "id": NaN,
            "type": "verb",
            "word": "VERB",
        },
        {
            "id": NaN,
            "type": "adjective",
            "word": "ADJECTIVE",
        },
        {
            "id": NaN,
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
            <ScrollView contentContainerStyle={styles.container}>
                {sentence.map((word) => DraggableWord(word))}
            </ScrollView>
        </View>
    )
}

export default Sentence;