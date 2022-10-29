import { Text, View } from '../components/Themed';
import { StyleSheet } from 'react-native'
import { RootTabScreenProps } from '../types';

export default function Search({ navigation }: RootTabScreenProps<'Search'>) {
    return (
        <View>
            <Text>This is home</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    img: {
        width: 20,
        height: 20
    }
})