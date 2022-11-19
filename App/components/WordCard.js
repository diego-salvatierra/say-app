import React from "react";
import { View, TouchableOpacity, Button, Text, StyleSheet} from "react-native";
import { Card } from "@rneui/themed";
import { DraxProvider, DraxView } from 'react-native-drax';

const WordCard = ( {word} ) => {
    return (
        <View style={{width : '100%'}}>
            <Card>
                <Text style={styles.text}>{word.word}</Text>
            </Card>
        </View>
    );
};

const styles = StyleSheet.create({
    text: {
        fontSize: 14,
    },
})

export default WordCard