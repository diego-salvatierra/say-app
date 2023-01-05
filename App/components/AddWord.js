import React, { useState } from 'react';
import { View, TouchableOpacity, TextInput, Modal, Text, StyleSheet, Dimensions} from "react-native";
import Plus from '../../assets/Plus.svg'
import { Button } from "@rneui/themed"
import Close from '../../assets/close.svg'

const PAGE_HEIGHT = Dimensions.get('window').height;
const PAGE_WIDTH = Dimensions.get('window').width;

const AddWord = () => {

    const [inputVisible, setInputVisible] = useState(false)
    const [inputValue, setInputValue] = useState('');

    const addWord = () => {
        setInputVisible(true)
    }

    return (
        <View>
            <View style={styles.container}>
                <TouchableOpacity style={styles.wordCard} onPress={() => setInputVisible(true)} >
                    <Plus/>
                </TouchableOpacity>
            </View>
            <Modal visible={inputVisible} transparent={true}>
                <View style={styles.modalContainer}> 
                    <View style={styles.topContainer}>
                        <TouchableOpacity onPress={() => setInputVisible(false)}>
                            <Close/>
                        </TouchableOpacity>                        
                    </View>
                    <TextInput
                    value={inputValue}
                    onChangeText={text => setInputValue(text)}
                    placeholder="Enter some text"
                    />
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width : '100%'
    },  
    wordCard: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 0,
        paddingVertical: 0,
        borderColor: '#58AFFF',
        backgroundColor: '#F3F3F3',
        borderWidth: 1,
        borderRadius: 10,
        position: 'relative',
        width: 72,
        height: 54,
        margin: 10,
    }, 
    text: {
        fontSize: 12,
        height: 13,
        display: 'flex',
        alignItems: 'center',
        textAlign: 'center',
        color: '#030303',
        
    },
    textLight: {
        fontSize: 10,
        height: 13,
        display: 'flex',
        alignItems: 'center',
        textAlign: 'center',
        color: '#B7B7B7',
        marginTop: 10,
        
    },
    modalContainer: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: 10,
        gap: 10,
        
        position: 'absolute',
        height: PAGE_HEIGHT/5,
        width: PAGE_WIDTH*.8,
        top: PAGE_HEIGHT/3,
        left: PAGE_WIDTH/10,

        backgroundColor: "#FFEBAD",
        borderColor: "#FFC107",
        borderWidth: 1,
        borderRadius: 12
    }
})

export default AddWord