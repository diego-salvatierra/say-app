import { StyleSheet } from "react-native";
import WordCard from "./WordCard";
import Draggable from 'react-native-draggable';
import { DraxProvider, DraxView, DraxList } from 'react-native-drax';


const styles = StyleSheet.create({
    dragging: {
        opacity: 0.1,
    },
  })

const DraggableWord = (word) => {
    return (
        <DraxView
            draggingStyle={styles.dragging}
            onDragStart={() => {
                console.log('word being dragged is ', word.word);
            }}
            payload= { word }
        >
            <WordCard
                word = { word }
            />
        </DraxView>
    )
}

export default DraggableWord