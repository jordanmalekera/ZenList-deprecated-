import { Animated, TouchableWithoutFeedback, StyleSheet, ViewProps } from 'react-native';
import { View } from './Themed';
import { MaterialIcons, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'
import { changeCategory } from '../features/categorySlice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../app/store';

export default function CategoryChooserTab() {

  return (
    <View style={[styles.container]}>
      <TouchableWithoutFeedback onPress={() => {
      }}>
        <Animated.View style={[styles.button, styles.menu]}>
          <MaterialIcons name="movie" size={30} color="white" />
        </Animated.View>
      </TouchableWithoutFeedback>

      <TouchableWithoutFeedback onPress={() => {
      }}>
        <Animated.View style={[styles.button, styles.third]}>
          <MaterialCommunityIcons name="syllabary-hiragana" size={30} color="white" />
        </Animated.View>
      </TouchableWithoutFeedback>

      <CategoryChooserItem />

    </View>
  );
}

interface CategoryChooserItemProp {
  
}

export function CategoryChooserItem(prop:any) {
  const dispatch = useDispatch()
  const category = useSelector((state: RootState) => state.categories.value)
  return(
    <TouchableWithoutFeedback onPress={() => {
      dispatch(changeCategory("games"));
    }}>
      <Animated.View style={[styles.button, styles.secondary]}>
        <Ionicons name="game-controller" size={30} color="white" />
      </Animated.View>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    justifyContent: "center",
    bottom: 0,
    marginHorizontal: 10
  },

  button: {
    width: 49,
    height: 49,
    borderRadius: 49 / 2,
    alignItems: 'center',
    justifyContent: 'center',
  },

  menu: {
    backgroundColor: "#F02A4B"
  },

  secondary: {
    position: "absolute",
    backgroundColor: "green",
    bottom: 70
  },
  third: {
    position: "absolute",
    backgroundColor: "blue",
    bottom: 140
  }
});
