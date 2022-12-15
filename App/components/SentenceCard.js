import React from "react";
import { View, TouchableOpacity, Button, Text, StyleSheet} from "react-native";
import { Card } from "@rneui/themed";
import { DraxProvider, DraxView } from 'react-native-drax';

const SentenceCard = ( {sentence, translation, translations} ) => {

     // For translations
    
    const sentenceTranslation = () => {
        if (translations === true && translation !== null) {
            return (
                <Text style={styles.textLight}>{translation}</Text>
            )
        }
        else {
            return (
                null
            )
        }
    }

    return (
        <View style={{width : '100%'}}>
            <TouchableOpacity style={styles.sentenceCard}>
                <Text style={styles.text}>{sentence}</Text>
                {sentenceTranslation()}
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    sentenceCard: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 10,
        paddingVertical: 10,
        borderColor: '#FFC107',
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderRadius: 10,
        position: 'relative',
        width: 359,
        height: 64,
        margin: 10,
    }, 
    text: {
        fontSize: 16,
        height: 20,
        display: 'flex',
        alignItems: 'center',
        textAlign: 'center',
        color: '#030303',
        
    },
    textLight: {
        fontSize: 14,
        height: 18,
        display: 'flex',
        alignItems: 'center',
        textAlign: 'center',
        color: '#B7B7B7',
        marginTop: 10,
        
    },
})

export default SentenceCard