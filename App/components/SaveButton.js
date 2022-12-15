import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput} from "react-native";
import { Button } from "@rneui/themed"
import { supabase, supabaseUrl} from '../lib/supabase';
import googleTranslate from '../lib/googleTranslate';


const SaveButton = ({sentence, savedSentence, sentenceChecked, setSentenceChecked}) => {

    // Retrieve user session

    const [session, setSession] = useState()

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
        setSession(session)
        })

        supabase.auth.onAuthStateChange((_event, session) => {
        setSession(session)
        })
    }, [])
    
    // Save sentence to database

    async function saveSentence() {

        const { error } = await supabase
        .from('sentences')
        .insert({ 
            created_at: new Date().toISOString(), 
            user: session.user.id, 
            sentence: savedSentence, 
            language: "es", 
            type: "basic", 
            blocks: sentence,
            translation: sentenceEn
            }
        )

        if (error) alert(error.message)

        setSentenceChecked(false)
    }

    if (sentenceChecked===true) {
        return (
            <Button buttonStyle={{ backgroundColor: '#FFC107' }} onPress={saveSentence}>Save</Button>
        )
    }

    else {
        return (
            <Button buttonStyle={{ backgroundColor: '#B7B7B7' }}>Save</Button>
        )
    }
}

export default SaveButton