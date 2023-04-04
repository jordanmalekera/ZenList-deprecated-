import { TouchableWithoutFeedback, StyleSheet } from 'react-native';
import { View } from './Themed';
import { MaterialIcons, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'
import { Category, changeCategory } from '../features/categorySlice';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import React from 'react';

export default function CategoryChooserTab() {
  const dispatch = useDispatch()
  const btnArray = [

    //first touchable
    <TouchableWithoutFeedback key={0} onPress={() => {
      dispatch(changeCategory(Category.ANIME_MANGA));
      changeBtnOrder(btnArray[1])
    }}>
      <View style={[styles.button]}>
        <MaterialIcons name="movie" size={30} color="#EEEEEE" />
      </View>
    </TouchableWithoutFeedback>,

    //second touchable
    <TouchableWithoutFeedback key={1} onPress={(e) => {
      dispatch(changeCategory(Category.GAMES));
      changeBtnOrder(btnArray[2])
    }}>
      <View style={[styles.button]}>
        <MaterialCommunityIcons name="syllabary-hiragana" size={30} color="#EEEEEE" />
      </View>
    </TouchableWithoutFeedback>,

    //third touchable
    <TouchableWithoutFeedback key={2} onPress={(e) => {
      dispatch(changeCategory(Category.MOVIES_SERIES));
      changeBtnOrder(btnArray[0])
    }}>
      <View style={[styles.button]}>
        <Ionicons name="game-controller" size={30} color="#EEEEEE" />
      </View>
    </TouchableWithoutFeedback>
  ]
  const [btnOrdered, changeBtnOrder] = useState(btnArray[1])

  return React.createElement(View, {style: styles.container}, btnOrdered)
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    marginHorizontal: 14,
    height: '100%',
  },

  button: {
    width: 40,
    height: 40,
    borderRadius: 40 / 2,
    alignItems: 'center',
    justifyContent: 'center'
  },

  first: {
    color: "red",
  },

  second: {
    color: "green",

  },
  third: {
    color: "blue",
  }
});
