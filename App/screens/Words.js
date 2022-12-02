import React, { useState, useEffect } from 'react';
import { Dimensions, View, TouchableOpacity, useWindowDimensions, StyleSheet, ScrollView, Text} from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { NativeBaseProvider, Box, VStack, Divider, HStack, Icon} from 'native-base';
import { Card } from "@rneui/themed";
import WordCard from '../components/WordCard';
import { TabView, SceneMap } from 'react-native-tab-view';
import Draggable from 'react-native-draggable';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { DraxProvider, DraxView, DraxList } from 'react-native-drax';
import Sentence from "../screens/Sentence"
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Button } from "@rneui/themed";
import DraggableWord from '../components/DraggableWord';
import TabRow from '../components/TabRow';
import WordMenu from '../components/WordMenu';
import Header from '../components/Header';
import { LinearGradient } from 'expo-linear-gradient'

const PAGE_WIDTH = Dimensions.get('window').width;
const PAGE_HEIGHT = Dimensions.get('window').height;

console.log("PAGE_HEIGHT", PAGE_HEIGHT)

export default ({ route }) => {

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

    //console.log("word is ", words[0])

    // setup tab navigation

    const Tab = createMaterialTopTabNavigator();

    console.log("screen is ", Tab.Screen.name)

    // create word tab sliders filtered by type

    const NounRoute = () => (
        <View>
            <ScrollView contentContainerStyle={styles.wordContainer}>
                {words.filter(obj => {return obj.type === "noun"})
                .map((word) => <DraggableWord key = {word.id} word={word}/>)}
            </ScrollView>
        </View>
    )

    const VerbRoute = () => (
        <View>
            <ScrollView contentContainerStyle={styles.wordContainer}>
                {words.filter(obj => {return obj.type === "verb"})
                .map((word) => <DraggableWord key = {word.id} word={word}/>)}
            </ScrollView>
        </View>
    )

    const AdjectiveRoute = () => (
        <View>
            <ScrollView contentContainerStyle={styles.wordContainer}>
                {words.filter(obj => {return obj.type === "adjective"})
                .map((word) => <DraggableWord key = {word.id} word={word}/>)}
            </ScrollView>
        </View>
    )

    const SubjectRoute = () => (
        <View>
            <ScrollView contentContainerStyle={styles.wordContainer}>
                {words.filter(obj => {return obj.type === "subject"})
                .map((word) => <DraggableWord key = {word.id} word={word}/>)}
            </ScrollView>
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
                    <Sentence words={words} setWords={setWords} forward={forward} setForward={setForward}/>
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