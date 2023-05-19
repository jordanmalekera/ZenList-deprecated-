import { StyleSheet} from 'react-native'
import React from 'react'
import { View, Text, Header } from '../../components/Themed'
import { AniMedia } from '../../types/AnilistTypes'

const Review = ({ data }: { data: AniMedia }) => {
  return (
    <View style={styles.view}>
      <Header>Review</Header>
    </View>
  )
}

export default Review

const styles = StyleSheet.create({
    view: {
        height: '100%',
        paddingHorizontal: '4%'
    }
})