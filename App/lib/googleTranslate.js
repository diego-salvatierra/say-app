import React, { useState, useEffect } from 'react';
import {decode} from 'html-entities'

// Google Translate API one way 

const googleTranslate = async (savedSentence, lang, setSentenceEn) => {

// const [sentenceTrans, setSentenceTrans] = useState("")

    console.log("Translating sentence ", savedSentence)
    let fromLang = lang;
    let toLang = 'en'; // translate to English

    // const API_KEY = "AIzaSyAJ1-ryN8FFi1IqqUI9QZ4PSGO9MiUOkY4"
    const API_KEY = "AIzaSyA0ZGLUpM7hzisP6abjEtPh4t1fTaJ4R1U"

    let url = `https://translation.googleapis.com/language/translate/v2?key=${API_KEY}`;
    url += '&q=' + encodeURI(savedSentence);
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
        setSentenceEn(decode(response.data.translations[0].translatedText)) // set to translated sentence state
        })
    .catch(error => {
        console.log("There was an error with the translation request: ", error);
    });
} 

export default googleTranslate