import React, { useState, useEffect } from 'react';
import {decode} from 'html-entities'
import { GOOGLE_API_KEY } from "react-native-dotenv"


// Google Translate API one way 

const googleTranslateWord = async (word, lang, setWord) => {

// const [sentenceTrans, setSentenceTrans] = useState("")

    console.log("Translating  ", word)
    console.log("setState function is", setWord)
    let fromLang = 'en';
    let toLang = lang; // translate to target language

    const API_KEY = GOOGLE_API_KEY

    let url = `https://translation.googleapis.com/language/translate/v2?key=${API_KEY}`;
    url += '&q=' + encodeURI(word);
    url += `&source=${fromLang}`;
    url += `&target=${toLang}`;

    console.log("url is ", url)

    
    const result = await fetch(url, { 
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        }
        })
    .then(res => res.json())
    .then((response) => {
        console.log("response from google API: ", response.data.translations[0].translatedText)
        setWord(decode(response.data.translations[0].translatedText)) // set to translated sentence state
        })
    .catch(error => {
        console.log("There was an error with the translation request: ", error);
    });

    console.log("word is ", word)

    return word
} 

export default googleTranslateWord