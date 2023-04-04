import { Text, View } from '../components/Themed';
import { StyleSheet } from 'react-native'
import { useSelector } from 'react-redux';
import { RootState } from '../app/store';
import { Category } from '../features/categorySlice';

export default function Lists() {
    const category = useSelector((state: RootState) => state.categories.value)
    const chosenCategory = () => {
        if (category == Category.ANIME_MANGA) return "Movies";
        else if (category == Category.MOVIES_SERIES) return "Anime";
        else if (category == Category.GAMES) return "Games";
        else return "";
    }
    
    return(
        <View style={styles.view}>
            <Text>{chosenCategory()}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    view: {
        height: "100%",
    },
    img: {
        width: 20,
        height: 20
    }
})