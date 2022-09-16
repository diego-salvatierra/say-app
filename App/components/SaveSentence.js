import { View, StyleSheet } from "react-native";
import { Button } from "@rneui/themed";
import Draggable from 'react-native-draggable';
import React, { useState, useEffect } from 'react';

const styles = StyleSheet.create({
    parent: {
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
    }
    , button: {
        size: 'md', 
        backgroundColor: 'yellow',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 50,
        elevation:3,
    }
})

const SaveSentence = ({ sentence }) => {

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
        console.log("sentence is ", sentence)
        console.log("savedSentence is ", savedSentence)
        var midSentence = "";
        for (let i = 0; i < sentence.length; i++) {
            midSentence.concat(sentence[i].word);
            console.log("midSentence is ", midSentence);
        }
        setSavedSentence(midSentence);
        console.log("savedSentence is NOW ", savedSentence)
    }

    return (
        <View style={styles.parent}>
            <Button  onPress={ () => {sentenceTest() ; concatSentence()}}>Save sentence</Button>
        </View>
    );
};

export default SaveSentence

