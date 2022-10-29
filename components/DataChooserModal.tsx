import { Animated, TouchableWithoutFeedback, StyleSheet, ViewProps } from 'react-native';
import { View } from '../components/Themed';
import { MaterialIcons, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'
import { RootTabScreenProps } from '../types';

export default function DataChooserModal({ navigation }: RootTabScreenProps<'Chooser'>) {
  return (
    <View style={[styles.container]}>
      <TouchableWithoutFeedback onPress={() => {
      }}>
        <Animated.View style={[styles.button, styles.third]}>
          <MaterialCommunityIcons name="syllabary-hiragana" size={30} color="white" />
        </Animated.View>
      </TouchableWithoutFeedback>

      <TouchableWithoutFeedback onPress={() => {
      }}>
        <Animated.View style={[styles.button, styles.secondary]}>
          <Ionicons name="game-controller" size={30} color="white" />
        </Animated.View>
      </TouchableWithoutFeedback>

      <TouchableWithoutFeedback onPress={() => {
      }}>
        <Animated.View style={[styles.button, styles.menu]}>
          <MaterialIcons name="movie" size={30} color="white" />
        </Animated.View>
      </TouchableWithoutFeedback>
    </View>
  );
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
