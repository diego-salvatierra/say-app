import { View, StyleSheet } from "react-native";
import { Button } from "@rneui/themed";
import Draggable from 'react-native-draggable';
import React, { useState, useEffect } from 'react';
import SentenceTest from "./SentenceTest";
import SentenceFixer from "./SentenceFixer";

const styles = StyleSheet.create({
    parent: {
        flexDirection: 'row',
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

    /*useEffect(() => {
            alert("Your sentence is " + savedSentence)
    })*/

    console.log("going into READY, sentence is ", sentence)

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
            console.log("savedSentence IS ", savedSentence);
        }
    }
    let sentenceFix
    
    if (sentenceReady===false) {
        sentenceFix = <Button buttonStyle={{ backgroundColor: '#FFC107' }} onPress={ () => {sentenceTest() ; concatSentence() } }>Ready</Button>
    }

    if (sentenceReady===true) {
        sentenceFix = <SentenceFixer sentence={sentence}/>
    }

    return (
        <View style={styles.parent}>
            { sentenceFix }
        </View>
    );
};

export default SaveSentence

