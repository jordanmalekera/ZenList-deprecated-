import { ColorSchemeName, StyleSheet, TouchableOpacity, useColorScheme } from 'react-native'
import React from 'react'
import { View, Header, Text } from '../../components/Themed'
import Colors from '../../constants/Colors'
import { useNavigation } from '@react-navigation/native'

export default function Login() {
  const navigation = useNavigation()
  const colorScheme = useColorScheme();
  let reverseColorScheme: NonNullable<ColorSchemeName>
  (colorScheme == 'light') ? reverseColorScheme = 'dark' : reverseColorScheme = 'light';
  
  return (
    <View style={styles.view}>
      <Header style={styles.header}>Login</Header>
      <TouchableOpacity style={[styles.button, { backgroundColor: Colors[reverseColorScheme].background }]} onPress={() => {
        navigation.navigate('Root')

      }}>
        <Text style={{ color: Colors[reverseColorScheme].text, fontSize: 20 }}>Continue</Text>
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