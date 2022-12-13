import React from "react";
import { View, TouchableOpacity, Button, Text, StyleSheet} from "react-native";
import { Card } from "@rneui/themed";
import { DraxProvider, DraxView } from 'react-native-drax';

const SentenceCard = ( {sentence} ) => {

    /* // For translations
    
    const SentenceTranslation = () => {
        if (translations === true) {
            return (
                <Text style={styles.textLight}>{word.translation}</Text>
            )
        }
        else {
            return (
                null
            )
        }
    }*/

    return (
        <View style={{width : '100%'}}>
            <TouchableOpacity style={styles.sentenceCard}>
                <Text style={styles.text}>{sentence}</Text>
                {/*SentenceTranslation()*/}
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    sentenceCard: {
        flexDirection: 'row',
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
        fontSize: 10,
        height: 13,
        display: 'flex',
        alignItems: 'center',
        textAlign: 'center',
        color: '#B7B7B7',
        marginTop: 10,
        
    },
})

export default SentenceCard