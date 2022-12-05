import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput} from "react-native";
import { Button } from "@rneui/themed"
import { Configuration, OpenAIApi } from "openai";
import 'react-native-url-polyfill/auto'
import { OPENAI_API_KEY } from "react-native-dotenv"

// Set up GPT3
const configuration = new Configuration({
  apiKey: OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

console.log("key is ", OPENAI_API_KEY)

// SHOULD ONLY RUN WHEN READY

const SentenceFixer = ({ sentence }) => {

    console.log("within fixer, sentence is ", sentence)

    var sentenceFixInit = ""

    for (let i = 0; i < sentence.length; i++) {
        console.log("sentence i word ", sentence[i].word )
        sentenceFixInit = sentenceFixInit.concat(sentence[i].word, " ")
        console.log("building sentence ", sentenceFixInit)
    }

    console.log("sentenceFixInit is ", sentenceFixInit)

    const [sentenceInput, setSentenceInput] = useState(sentenceFixInit); 
    const [result, setResult] = useState();
  
    console.log("sentenceInput is ", sentenceInput)

    const fixSentence = () => {
      openai.createCompletion({
        model: "text-davinci-002",
        prompt: `correct the grammar of the following Spanish sentence: ${sentenceInput}`,
        temperature: 0,
      }).then(response => setResult(response.data.choices[0].text))
    } 

    return (
        <View>
          <View style={styles.buttons}>
            <Button buttonStyle={{ backgroundColor: '#FFC107' }} onPress={fixSentence}>GPT3</Button>
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.text}> { result } </Text>
          </View>
        </View>
    )
}

const styles = StyleSheet.create({
    buttons: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      paddingTop: 10,
      paddingBottom: 0,
    },
    button: {
      backgroundColor: 'white',
    },
    textContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      paddingTop: 0,
      paddingBottom: 10,
    },
    text: {
        fontSize: 14,
        color: 'white',
        paddingTop: 0,
    }
})

export default SentenceFixer