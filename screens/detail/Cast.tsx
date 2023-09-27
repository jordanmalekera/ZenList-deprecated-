import { StyleSheet } from 'react-native'
import React from 'react'
import { View, Text, Header } from '../../components/Themed'
import { AniMedia } from '../../types/ANIL/interfaces'

const Cast = ({ data }: { data: AniMedia }) => {
  return (
    <View style={styles.view}>
      <Header>Cast</Header>
    </View>
  )
}

export default Cast

const styles = StyleSheet.create({
  view: {
    height: '100%',
    paddingHorizontal: '4%'
  }
})