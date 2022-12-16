import { View, StyleSheet } from "react-native";
import { Button } from "@rneui/themed";
import Draggable from 'react-native-draggable';
import React, { useState, useEffect } from 'react';
import SentenceTest from "./SentenceTest";
import SentenceFixer from "./SentenceFixer";
import SaveButton from "./SaveButton";
import SayWhisper from "../whisper/SayWhisper";

const styles = StyleSheet.create({
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        flex: 1,
        alignItems: 'center',
        position: 'relative',
    }
    , button: {
        size: 'md', 
        backgroundColor: 'yellow',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 50,
        elevation: 3,
    }
})

const SaveSentence = ({ sentence, 
                        setText, 
                        setSentenceEn, 
                        sentenceEn, 
                        sentenceWhisper, 
                        setSentenceWhisper, 
                        lang, 
                        langCode,
                        sentenceAnalyzed,
                        setSentenceAnalyzed,
                    }) => {

    /*useEffect(() => {
            alert("Your sentence is " + savedSentence)
    })*/

    console.log("going into READY, sentence is ", sentence)

    // state for keeping track of sentence building process
    const [sentenceReady, setSentenceReady] = useState(false);
    const [savedSentence, setSavedSentence] = useState("");
    const [sentenceChecked, setSentenceChecked] = useState(false);
    
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

    useEffect(() => {
        sentenceTest()
        concatSentence()
    }, [sentence])

    let sentenceFix

    if (sentenceReady===false) {
        sentenceFix = 
            <View>
                <Button buttonStyle={{ backgroundColor: '#B7B7B7' }} onPress={ () => {alert("Add a few more words :) ") } }>Ready</Button>
            </View>
    }

    if (sentenceReady===true) {
        sentenceFix = <SentenceFixer 
                        sentence={sentence} 
                        setText={setText} 
                        setSavedSentence={setSavedSentence} 
                        setSentenceChecked={setSentenceChecked}
                        setSentenceEn={setSentenceEn}
                        lang={lang}
                        langCode={langCode}
                        sentenceAnalyzed={sentenceAnalyzed}
                        setSentenceAnalyzed={setSentenceAnalyzed}
                    />
    }
    
    // Say! button

    let sayButton

    if (sentenceChecked===false) {
        sayButton = 
            <View>
                <Button buttonStyle={{ backgroundColor: '#B7B7B7' }} onPress={ () => {alert("Add a few more words :) ") } }>Say it!</Button>
            </View>
    }

    if (sentenceChecked===true) {
        sayButton = <SayWhisper sentenceWhisper={sentenceWhisper} setSentenceWhisper={setSentenceWhisper}/>
    }

    return (
        <View style={styles.buttonContainer}>
            { sentenceFix }
            <SaveButton 
                sentence={sentence} 
                savedSentence={savedSentence} 
                sentenceChecked={sentenceChecked}
                setSentenceChecked={setSentenceChecked}
                sentenceEn={sentenceEn}
            />
            { sayButton }
        </View>
    );
};

export default SaveSentence

