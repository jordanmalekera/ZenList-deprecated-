import { StyleSheet} from 'react-native'
import React from 'react'
import { View, Text, Header } from '../../components/Themed'
import { AniMedia } from '../../types/AnilistTypes'

const Social = ({ data }: { data: AniMedia }) => {
  return (
    <View style={styles.view}>
      <Header>Social</Header>
    </View>
  )
}

export default Social

const styles = StyleSheet.create({
    view: {
        height: '100%',
        paddingHorizontal: '4%'
    }
})