import { StyleSheet} from 'react-native'
import React from 'react'
import { View, Header } from '../../components/Themed'

export default function Login() {
  return (
    <View style={styles.view}>
      <Header>Login</Header>
    </View>
  )
}

const styles = StyleSheet.create({
    view: {
        height: '100%',
        paddingVertical: '20%'
    }
})