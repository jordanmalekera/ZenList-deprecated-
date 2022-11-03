import { ColorSchemeName, StyleSheet, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { View, Header, Text } from '../../components/Themed'
import Colors from '../../constants/Colors'
import { useNavigation } from '@react-navigation/native'
import useColorScheme from '../../hooks/useColorScheme'

export default function Login() {
  const navigation = useNavigation()
  const colorScheme = useColorScheme();
  let reverseColorScheme: NonNullable<ColorSchemeName>
  (colorScheme == 'light') ? reverseColorScheme = 'dark' : reverseColorScheme = 'light';
  
  return (
    <View style={styles.view}>
      <Header style={styles.header}>Login</Header>
      <View style={styles.image_container}>
        <TouchableOpacity style={{borderWidth: 2, borderColor: Colors[colorScheme].tint, padding: 4, borderRadius: 20 }} onPress={() => {





        }}>
          <Image style={styles.provider_image} source={require('../../assets/images/api/TMDB-full.png')}></Image>
        </TouchableOpacity>
        <TouchableOpacity style={{borderWidth: 2, borderColor: Colors[colorScheme].tint, padding: 4, borderRadius: 20 }}  onPress={() => {
        }}>
          <Image style={styles.provider_image} source={require('../../assets/images/api/Anilist.png')}></Image>
        </TouchableOpacity>
        </View>
        
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
  },
  image_container: {
    flexDirection: 'row',
    height: '20%',
    flexWrap: 'wrap',
    paddingHorizontal: 20,
    justifyContent: 'space-around'
  },
  provider_image: {
    height: '100%',
    width: 140,
    borderRadius: 18
  }
})