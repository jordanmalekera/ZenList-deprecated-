import { useNavigation } from '@react-navigation/native';
import React from 'react'
import { StyleSheet, Image, TouchableOpacity, ColorSchemeName } from 'react-native'
import { View, Text, Header } from '../../components/Themed'
import Colors from '../../constants/Colors'
import useColorScheme from '../../hooks/useColorScheme';



export default function Intro() {
    const navigation = useNavigation()
    const colorScheme = useColorScheme();
    let reverseColorScheme: NonNullable<ColorSchemeName>
    (colorScheme == 'light') ? reverseColorScheme = 'dark' : reverseColorScheme = 'light';
    
    return (
        <View style={styles.view}>
            <View >
                <Header style={styles.header}>Welcome</Header>
                <Text style={styles.text}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae eum, blanditiis nam aspe delectus rem sunt iste ad minus</Text>
            </View>
            <TouchableOpacity style={[styles.button, {backgroundColor: Colors[reverseColorScheme].background}]} onPress={() => {
                    navigation.navigate('Login')
                }}>
                <Text style={{color: Colors[reverseColorScheme].text, fontSize: 20}}>Continue</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    view: {
        height: '100%',
        justifyContent: 'space-between',
        paddingVertical: '20%'
    },

    img: {
        height: '50%',
        width: '90%',
        alignSelf: 'center'
    },

    header: {
        fontSize: 34,
        fontFamily: 'open-sans',
        fontWeight: '700',
        marginHorizontal: '8%',
        marginBottom: 20,
        textAlign: 'center'
    },
    
    text: {
        fontSize: 14,
        lineHeight: 28,
        marginHorizontal: '8%',
        textAlign: 'center'
    },
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: '10%',
        padding: 14,
        borderRadius: 12
    }
})