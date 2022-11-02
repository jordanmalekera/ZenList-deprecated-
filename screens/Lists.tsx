import { Text, View } from '../components/Themed';
import { StyleSheet } from 'react-native'
import { useSelector } from 'react-redux';
import { RootState } from '../app/store';

export default function Lists() {
    const category = useSelector((state: RootState) => state.categories.value)
    const chosenCategory = () => {
        if (category.movies_series) return "Movies";
        else if (category.anime_manga) return "Anime";
        // else if (category.games) return "Games";
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