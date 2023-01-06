import React, { useState, useEffect } from 'react';
import { Dimensions, View, TouchableOpacity, useWindowDimensions, StyleSheet, ScrollView, Text} from "react-native";
import { TabView, SceneMap } from 'react-native-tab-view';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { DraxProvider, DraxScrollView } from 'react-native-drax';
import Sentence from "../screens/Sentence"
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import DraggableWord from '../components/DraggableWord';
import WordMenu from '../components/WordMenu';
import Header from '../components/Header';
import { LinearGradient } from 'expo-linear-gradient'
import AddWord from '../components/AddWord';

const PAGE_WIDTH = Dimensions.get('window').width;
const PAGE_HEIGHT = Dimensions.get('window').height;

export default ({ route }) => {

    // set up translations toggle 

    const [translations, setTranslations] = useState(true)

    // set up the tab navigator

    const [tab, setTab] = useState("Subjects")

    const page = () => {
        switch (tab) {
            case 'Subjects':
                return <SubjectRoute />
            case 'Verbs':
                return <VerbRoute/>
            case 'Adjectives':
                return <AdjectiveRoute />
            case 'Nouns':
                return <NounRoute />
            default:
                return <SubjectRoute />
        }
    }
    
    // Set styles
    //const gestureRootViewStyle = { flex: 1 };

    const styles = StyleSheet.create({
        gestureRootViewStyle: {
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'center',
            //alignItems: 'center',
            display: 'flex',
        },
        wordContainer: {
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'flex-start',
            backgroundColor: 'rgba(0, 0, 0, 0)',
            paddingLeft: 10,
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

        linearGradient: {
            position: 'absolute',
            height: PAGE_HEIGHT,
            left: 0,
            right: 0,
            top: 0,    
        },
      })
    
    // Import params
    const words = route.params.words;
    const setWords = route.params.setWords;
    const lang = route.params.lang;
    const langCode = route.params.langCode;

    //console.log("word is ", words[0])

    // set up state for user adding words
    const [userWords, setUserWords] = useState([])

    // setup tab navigation

    const Tab = createMaterialTopTabNavigator();

    console.log("screen is ", Tab.Screen.name)

    // create word tab sliders filtered by type

    const NounRoute = () => (
        <View>
            <DraxScrollView contentContainerStyle={styles.wordContainer}>
                <AddWord type="noun" setUserWords={setUserWords} userWords={userWords} langCode={langCode}/> 
                {userWords.filter ? userWords.filter(obj => {return obj.type === "noun"})
                .map((word) => <DraggableWord key = {word.id} word={word} translations={translations}/>) : null}
                {words.filter(obj => {return obj.type === "noun"})
                .map((word) => <DraggableWord key = {word.id} word={word} translations={translations}/>)}
            </DraxScrollView>
        </View>
    )

    const VerbRoute = () => (
        <View>
            <DraxScrollView contentContainerStyle={styles.wordContainer}>
                <AddWord type="verb" setUserWords={setUserWords} userWords={userWords} langCode={langCode}/>
                {words.filter(obj => {return obj.type === "verb"})
                .map((word) => <DraggableWord key = {word.id} word={word} translations={translations}/>)}
            </DraxScrollView>
        </View>
    )

    const AdjectiveRoute = () => (
        <View>
            <DraxScrollView contentContainerStyle={styles.wordContainer}>
                <AddWord type="adjective" setUserWords={setUserWords} userWords={userWords} langCode={langCode}/>
                {words.filter(obj => {return obj.type === "adjective"})
                .map((word) => <DraggableWord key = {word.id} word={word} translations={translations}/>)}
            </DraxScrollView>
        </View>
    )

    const SubjectRoute = () => (
        <View>
            <DraxScrollView contentContainerStyle={styles.wordContainer}>
                <AddWord type="adjective" setUserWords={setUserWords} userWords={userWords} langCode={langCode}/>
                {words.filter(obj => {return obj.type === "subject"})
                .map((word) => <DraggableWord key = {word.id} word={word} translations={translations}/>)}
            </DraxScrollView>
        </View>
    )

   // const initialLayout = { width: Dimensions.get('window').width };

    const renderScene = SceneMap({
        nounScene: NounRoute,
        verbScene: VerbRoute,
        adjectiveScene: AdjectiveRoute,
        subjectScene: SubjectRoute,
      });

    // tab router setup
    
    const [forward, setForward] = useState("");

    return (
        <GestureHandlerRootView style={styles.gestureRootViewStyle}>
            <DraxProvider>
                <View style={styles.gestureRootViewStyle}>
                    <LinearGradient 
                        colors={['#9F00B9', '#FFDC61']}
                        locations={[0, .99]}
                        style={styles.linearGradient}
                    />
                    <Header />
                    <Sentence 
                        words={words} 
                        setWords={setWords} 
                        forward={forward} 
                        setForward={setForward}
                        translations={translations}
                        setTranslations={setTranslations}
                        lang={lang}
                        langCode={langCode}
                    />
                    <Tab.Navigator
                    tabBar={props => <WordMenu {...props} forward={forward} setForward ={setForward}/>}
                    initialRouteName={'Subjects'} 
                    sceneContainerStyle={{backgroundColor: 'transparent'}}
                    >
                        <Tab.Screen name="Subjects" component={SubjectRoute} />
                        <Tab.Screen name="Verbs" component={VerbRoute} />
                        <Tab.Screen name="Adjectives" component={AdjectiveRoute} />
                        <Tab.Screen name="Nouns" component={NounRoute} />
                    </Tab.Navigator>
                </View>
            </DraxProvider>
        </GestureHandlerRootView>
    )
}