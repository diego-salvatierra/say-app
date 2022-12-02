import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput} from "react-native";
import { Button } from "@rneui/themed"
import { Configuration, OpenAIApi } from "openai";
import 'react-native-url-polyfill/auto'

// Set up GPT3
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

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
      console.log("entering testFetch")
      openai.createCompletion({
        model: "text-davinci-002",
        prompt: `correct ${sentenceInput} in spanish`,
        temperature: 0.6,
      }).then(response => setResult(response.data.choices[0].text))
    } 

    return (
        <View>
          <Button  onPress={fixSentence}>GPT3</Button>
          <Text> { result } </Text>
        </View>
    )
}

export default SentenceFixer