import React, { useState, useEffect } from 'react';
import { Card, Switch } from "@rneui/themed";
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from "react-native";
import { DraxProvider, DraxView, DraxList } from 'react-native-drax';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import SentenceWord from '../components/SentenceWord';
import SaveSentence from '../components/SaveSentence';
import AnalyzeWord from '../components/AnalyzeWord';

const Sentence = ({ words, setWords, forward, setForward, translations, setTranslations, lang, langCode}) => {

    // Set instructions

    const [text, setText] = useState("Drag the words to build your sentence")

    // Set translation placeholder
    const [sentenceEn, setSentenceEn] = useState(null)

    // Create Whisper sentence
    const [sentenceWhisper, setSentenceWhisper] = useState("no whisper yet")

    // Sentence analyzed

    const [sentenceAnalyzed, setSentenceAnalyzed] = useState([])

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
            paddingLeft: 10,
        },
        topContainer: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
        },
        buttonContainer: {
            flex: 4,
            flexDirection: 'row',
            justifyContent: 'flex-end',
        },
        switchContainer: {
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'flex-end',
            paddingRight: 40,
        },
        textContainer: {
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            padding: 10,
        },
        text: {
            fontSize: 20,
            color: 'white',
        },
        translationText: {
            fontSize: 16,
            marginTop: 5,
            color: '#B7B7B7',
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
        sentenceAnalyzed: {
            flexDirection: 'row',
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

    const sentenceTranslation = () => {
        if (translations===true) {
            return (
                <Text style={styles.translationText}>{sentenceEn}</Text>
            )
        }
        else {
            return null
        }
    }

    // check whispered sentence against sentence
    useEffect(() => {
        console.log("sentenceWhisper is ", sentenceWhisper)
        for (let i = 0; i < sentenceAnalyzed.length; i++) {
            console.log("sentenceAnalyzed is ", sentenceAnalyzed)
            let interimState = [...sentenceAnalyzed]
            console.log("interimState is ", interimState)
            if (sentenceWhisper.includes(sentenceAnalyzed[i].word)) {
                interimState[i].said = true
                setSentenceAnalyzed(interimState)
            }
        }
      }, [sentenceWhisper])

    const analyzeSentence = () => {
        console.log("sentenceAnalyzed RERENDER is ", sentenceAnalyzed)
        return (
            <View style={styles.sentenceAnalyzed}>
                    {sentenceAnalyzed.map(
                        (word, id) => (
                            <AnalyzeWord 
                                key={id} 
                                word={word} 
                            />
                        ))
                    }
            </View>
        )
    }

    useEffect( () => {
        console.log("rerendering sentenceAnalyzed", sentenceAnalyzed)
    }, [sentenceAnalyzed])

    // set Text based on whispered

    const setWhispered = () => {
        if (sentenceWhisper == "no whisper yet") {
            return (
                <Text style={styles.text}>{text}</Text>
            )
        }
        else {
            return (
                analyzeSentence()
            )
        }
    }


    return (
        <View>
            <View style={styles.topContainer}>
                <View style={styles.buttonContainer}>
                    <SaveSentence 
                        sentence={sentence} 
                        setText={setText} 
                        setSentenceEn={setSentenceEn} 
                        sentenceEn={sentenceEn}
                        sentenceWhisper={sentenceWhisper}
                        setSentenceWhisper={setSentenceWhisper}
                        lang={lang}
                        langCode={langCode}
                        sentenceAnalyzed={sentenceAnalyzed}
                        setSentenceAnalyzed={setSentenceAnalyzed}
                        />
                </View>
                <View style={styles.switchContainer}>
                    <Switch
                        value={translations}
                        color={'#FFC107'}
                        onValueChange={(value) => setTranslations(value)}
                    />
                </View>              
            </View>
            <View style={styles.textContainer}>
                {setWhispered()}
            </View>
            <ScrollView contentContainerStyle={styles.container}>
                {(sentence || []).map(
                    (word, index) => (
                        <SentenceWord 
                            key={index} 
                            word={word} 
                            index={index} 
                            words={words} 
                            sentence={sentence} 
                            setSentence={setSentence}
                            forward={forward} 
                            setForward={setForward}
                        />
                    ))
                }
            </ScrollView>
        </View>
    )
}

export default Sentence;