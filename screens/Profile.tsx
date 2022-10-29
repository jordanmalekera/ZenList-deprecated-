import { Text, View } from '../components/Themed';
import { StyleSheet } from 'react-native'
import { useSelector } from 'react-redux';
import { RootState } from '../app/store';

export default function Profile() {
    const category = useSelector((state: RootState) => state.categories.value)
    if(category.movies_series) {
        return (
            <View>
                <Text>Movies</Text>
            </View>
        )
    }
    else if(category.anime_manga) {
        return (
            <View>
                <Text>Anime</Text>
            </View>
        )
    }
    else if(category.games) {
        return (
            <View>
                <Text>Games</Text>
            </View>
        )
    }
    else {
        return(
            <View/>
        )
    }
    
}

const styles = StyleSheet.create({
    img: {
        width: 20,
        height: 20
    }
})