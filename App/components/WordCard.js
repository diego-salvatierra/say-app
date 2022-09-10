import React from "react";
import { View, TouchableOpacity, Button, Text, StyleSheet} from "react-native";
import { Card } from "@rneui/themed";

const styles = StyleSheet.create({
    card: {
      backgroundColor: 'dodgerblue',
      height: 200,
      flex : 1,
      alignSelf : "center",
      justifyContent: 'center',
      alignItems: 'center',
      margin: 20,
    },
  });

const WordCard = (word) => {
    return (
        <View style={{width : '25%'}}>
            <Card>
                <Text>{word.word}</Text>
                <Text>{word.type}</Text>            
            </Card>
        </View>
    );
};

export default WordCard