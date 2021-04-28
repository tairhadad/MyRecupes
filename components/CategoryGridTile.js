import React from 'react'
import {
  TouchableOpacity,
  View,
  Text,
  ImageBackground,
  StyleSheet,
  Platform,
  TouchableNativeFeedback,
} from 'react-native'

const CategoryGridTile = (props) => {
  let TouchableCmp = TouchableOpacity

  if (Platform.OS == 'android' && Platform.Version >= 21) {
    TouchableCmp = TouchableNativeFeedback
  }
  return (
    <View style={styles.gridItem}>
      <TouchableCmp style={{ flex: 1 }} onPress={props.onSelect}>
        <View style={{ ...styles.contianer }}>
          <ImageBackground
            source={{ uri: props.image }}
            style={{ width: '100%', height: '100%' }}
          >
            <Text style={styles.text} numberOfLines={2}>
              {props.title}
            </Text>
          </ImageBackground>
        </View>
      </TouchableCmp>
    </View>
  )
}
const styles = StyleSheet.create({
  gridItem: {
    flex: 1,
    margin: 15,
    height: 150,
    borderRadius: 10,
    overflow:
      Platform.OS === 'android' && Platform.Version >= 21
        ? 'hidden'
        : 'visible',
    elevation: 5,
  },
  contianer: {
    flex: 1,
    borderRadius: 10,
    shadowColor: 'black',
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
    padding: 15,
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
  },
  text: {
    fontFamily: 'open-sans-bold',
    fontSize: 15,
    textDecorationLine: 'underline',
    textShadowColor: 'white',
    textShadowRadius: 5,
    fontWeight: 'bold',
  },
})

export default CategoryGridTile
