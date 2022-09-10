import React from "react";
import { View, TouchableOpacity, Button, StyleSheet, ScrollView} from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { NativeBaseProvider, Box, VStack, Divider, HStack, Icon} from 'native-base';
import { Card } from "@rneui/themed";
import WordCard from '../components/WordCard';

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

    var nouns = words.filter(obj => {
        return obj.type === "noun"
      })

    console.log("words are ", words[0]);

    return (
    <View>
        <ScrollView contentContainerStyle={styles.container}>{nouns.map((word) => WordCard(word))}</ScrollView>
    </View>
    )
}