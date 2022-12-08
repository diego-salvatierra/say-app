import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput} from "react-native";
import { Button } from "@rneui/themed"
import { Configuration, OpenAIApi } from "openai";
import 'react-native-url-polyfill/auto'
import { OPENAI_API_KEY } from "react-native-dotenv"

// Set up GPT3

console.log("key is ", OPENAI_API_KEY)

const configuration = new Configuration({
  apiKey: OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);


// SHOULD ONLY RUN WHEN READY

const SentenceFixer = ({ sentence, setText}) => {

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
      }).then(response => setText(response.data.choices[0].text.trim()))
    } 

    return (
          <View style={styles.buttons}>
            <Button buttonStyle={{ backgroundColor: '#FFC107' }} onPress={fixSentence}>Ready</Button>
          </View>
    )
}

const styles = StyleSheet.create({
    buttons: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      paddingTop: 0,
      paddingBottom: 0,
    },
    button: {
      backgroundColor: 'white',
    },
    text: {
        fontSize: 14,
        color: 'white',
        paddingTop: 0,
    }
})

export default SentenceFixer