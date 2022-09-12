import { StyleSheet } from "react-native";
import WordCard from "./WordCard";
import Draggable from 'react-native-draggable';
import { DraxProvider, DraxView, DraxList } from 'react-native-drax';


const styles = StyleSheet.create({
    dragging: {
        opacity: 0.1,
    },
  })

const SentenceWord = (word, index, words, setWords, sentence, setSentence) => {

    console.log("RENDERING SENTENCE")
    return (
        <DraxView
            draggingStyle={styles.dragging}
            onDragStart={() => {
                console.log('word being dragged is ', word.word);
            }}
            payload= { word }
            onReceiveDragEnter={({ dragged: { payload } }) => {
                console.log(`hello ${payload}`);
                console.log("now entering box number ", index)
            }}
            onReceiveDragExit={({ dragged: { payload } }) => {
                console.log(`goodbye ${payload}`);
            }}
            // on drop, update states and re-render:
            onReceiveDragDrop={({ dragged: { payload } }) => {
                console.log("word box type is ", word.type)
                console.log("received in SW ", payload);
                if (payload.type === word.type) {
                    let selected_item = words.filter(obj => {return obj.id === payload.id})[0];
                    console.log("word ID to look for is", payload.id)
                    console.log("selected item is ", selected_item)
                    let newSentence = [...sentence]
                    console.log("sentence box to update is ", newSentence[index])
                    newSentence[index] = payload
                    console.log("NEWsentence is NOW ", sentence) 
                    setSentence(newSentence)
                }
                else {
                    alert("Not the right box! " + word.type + " needed.")
                }
            }}
        >
            <WordCard
                word = { word }
            />
        </DraxView>
    )
}

export default SentenceWord