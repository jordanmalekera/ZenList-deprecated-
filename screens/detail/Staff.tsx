import { StyleSheet } from 'react-native'
import React from 'react'
import { View, Text, Header } from '../../components/Themed'
import { AniMedia } from '../../types/ANIL/interfaces'

const Staff = ({ data }: { data: AniMedia }) => {
  return (
    <View style={styles.view}>
      <Header>Staff</Header>
    </View>
  )
}

export default Staff

const styles = StyleSheet.create({
  view: {
    height: '100%',
    paddingHorizontal: '4%'
  }
})