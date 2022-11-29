import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from "react-native";
import {decode} from 'html-entities'

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

    const [fixedSentence, setFixedSentence] = useState(sentenceFixInit); 
    const [intermediateSent, setIntermediateSent] = useState(sentenceFixInit);
    const [callUrl, setCallUrl] = useState("");

    console.log("fixedSentence is ", fixedSentence)


    // Google Translate API one way

    useEffect(() => {
      console.log("Fixing sentence ", sentenceFixInit)
      

      const fixSentence = async () => {
        try {
          let fromLang = 'es';
          let toLang = 'pt'; // translate to Portuguese

          const API_KEY = "AIzaSyAJ1-ryN8FFi1IqqUI9QZ4PSGO9MiUOkY4"

          let url = `https://translation.googleapis.com/language/translate/v2?key=${API_KEY}`;
          url += '&q=' + encodeURI(sentenceFixInit);
          url += `&source=${fromLang}`;
          url += `&target=${toLang}`;
          
          const result1 = await fetch(url, { 
              method: 'GET',
              headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
              }
            })
          .then(res => res.json())
          .then((response) => {
              console.log("response from google GO: ", response.data.translations[0].translatedText);
              console.log("intermediateSent INSIDE 1 is ", intermediateSent)
              setIntermediateSent(decode(response.data.translations[0].translatedText)) // set to intermediate sentence state
              console.log("intermediateSent INSIDE 2 is ", intermediateSent)
            })
          .catch(error => {
              console.log("There was an error with the translation request: ", error);
          });

          // Google Translate API return sentence

          fromLang = 'pt';
          toLang = 'es'; // translate back to Spanish

          console.log("intermediateSent OUTSIDE is ", intermediateSent)

          url = `https://translation.googleapis.com/language/translate/v2?key=${API_KEY}`;
          url += '&q=' + encodeURI(intermediateSent);
          url += `&source=${fromLang}`;
          url += `&target=${toLang}`;

          console.log("url is ", url)

          setCallUrl(url)

          const result2 = await fetch(callUrl, { 
              method: 'GET',
              headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
              }
            })
          .then(res => res.json())
          .then((response) => {
              console.log("response from google BACK: ", response.data.translations[0].translatedText);
              setFixedSentence(decode(response.data.translations[0].translatedText))
            })
          .catch(error => {
              console.log("There was an error with the translation request: ", error);
          });
        } catch (error) {
          console.log(error);
        }
    }
    fixSentence()
    },
    [fixedSentence, intermediateSent, callUrl])

    return (
        <View>
            <Text> { fixedSentence } </Text>
        </View>
    )
}

export default SentenceFixer