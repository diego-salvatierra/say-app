import React from "react";
import { View, TouchableOpacity, useWindowDimensions, StyleSheet, ScrollView} from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { NativeBaseProvider, Box, VStack, Divider, HStack, Icon} from 'native-base';
import { Card } from "@rneui/themed";
import WordCard from '../components/WordCard';
import { TabView, SceneMap } from 'react-native-tab-view';
import Draggable from 'react-native-draggable';

export default ({ route }) => {

    const styles = StyleSheet.create({
        container: {
            flexDirection: 'row',
            flexWrap: 'wrap',
        },
        item: {
            flexDirection: 'row',
            flexWrap: 'wrap',
            width: '33%'
        }
      })
    
    const words = route.params.words;
    const setWords = route.params.setWords;

    // filter words by type 

    var nouns = words.filter(obj => {
        return obj.type === "noun"
    })

    var verbs = words.filter(obj => {
        return obj.type === "verb"
    })

    var adjectives = words.filter(obj => {
        return obj.type === "adjective"
    })

    var subjects = words.filter(obj => {
        return obj.type === "subject"
    })

    // create word tab sliders

    const NounRoute = () => (
        <View>
            <ScrollView contentContainerStyle={styles.container}>{nouns.map((word) => WordCard(word))}</ScrollView>
        </View>
    )

    const VerbRoute = () => (
        <View>
            <ScrollView contentContainerStyle={styles.container}>{verbs.map((word) => WordCard(word))}</ScrollView>
        </View>
    )

    const AdjectiveRoute = () => (
        <View>
            <ScrollView contentContainerStyle={styles.container}>{adjectives.map((word) => WordCard(word))}</ScrollView>
        </View>
    )

    const SubjectRoute = () => (
        <View>
            <ScrollView contentContainerStyle={styles.container}>{subjects.map((word) => WordCard(word))}</ScrollView>
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

    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: 'subjectScene', title: 'Subjects' },
        { key: 'verbScene', title: 'Verbs' },
        { key: 'adjectiveScene', title: 'Adjectives' },
        { key: 'nounScene', title: 'Nouns' },
    ]);

    return (
        <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        // initialLayout={initialLayout}
        //style={styles.container}
        />
    )
}