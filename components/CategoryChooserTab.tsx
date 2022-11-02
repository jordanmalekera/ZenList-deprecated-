import { TouchableWithoutFeedback, StyleSheet } from 'react-native';
import { View } from './Themed';
import { MaterialIcons, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'
import { changeCategory } from '../features/categorySlice';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import React from 'react';

export default function CategoryChooserTab() {
  const dispatch = useDispatch()
  const btnArray = [

    //first touchable
    <TouchableWithoutFeedback key={0} onPress={() => {
      dispatch(changeCategory("anime_manga"));
      changeBtnOrder(btnArray[1])
    }}>
      <View style={[styles.button, styles.first]}>
        <MaterialIcons name="movie" size={30} color="white" />
      </View>
    </TouchableWithoutFeedback>,

    //second touchable
    <TouchableWithoutFeedback key={1} onPress={(e) => {
      dispatch(changeCategory("movies_series"));
      changeBtnOrder(btnArray[0])
    }}>
      <View style={[styles.button, styles.second]}>
        <MaterialCommunityIcons name="syllabary-hiragana" size={30} color="white" />
      </View>
    </TouchableWithoutFeedback>,

    //third touchable
    // <TouchableWithoutFeedback key={2} onPress={(e) => {
    //   dispatch(changeCategory("movies_series"));
    //   changeBtnOrder(btnArray[0])
    // }}>
    //   <View style={[styles.button, styles.third]}>
    //     <Ionicons name="game-controller" size={30} color="white" />
    //   </View>
    // </TouchableWithoutFeedback>
  ]
  const [btnOrdered, changeBtnOrder] = useState(btnArray[0])

  return React.createElement(View, {style: styles.container}, btnOrdered)
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    marginHorizontal: 14,
    height: '100%',
  },

  button: {
    width: 42,
    height: 42,
    borderRadius: 42 / 2,
    alignItems: 'center',
    justifyContent: 'center'
  },

  first: {
    backgroundColor: "red",
  },

  second: {
    backgroundColor: "green",

  }
  // third: {
  //   backgroundColor: "blue",
  // }
});
