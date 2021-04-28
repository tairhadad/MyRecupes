import React, { useEffect, useCallback } from 'react'
import {
  ScrollView,
  View,
  Image,
  Text,
  StyleSheet,
  Dimensions,
} from 'react-native'
import { useSelector, useDispatch } from 'react-redux'

import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import HeaderButton from '../components/HeaderButton'
import DefaultText from '../components/DefaultText'
import { toggleFavorite } from '../store/actions/meals'

const ListItem = (props) => {
  return (
    <View style={styles.listItem}>
      <DefaultText>{props.children}</DefaultText>
    </View>
  )
}

const MealDetailScreen = (props) => {
  const availableMeals = useSelector((state) => state.meals.meals)
  const mealId = props.navigation.getParam('mealId')
  const currentMealIsFavorite = useSelector((state) =>
    state.meals.favoriteMeals.some((meal) => meal.id === mealId),
  )

  const selectedMeal = availableMeals.find((meal) => meal.id === mealId)

  const dispatch = useDispatch()

  const toggleFavoriteHandler = useCallback(() => {
    dispatch(toggleFavorite(mealId))
  }, [dispatch, mealId])

  useEffect(() => {
    // props.navigation.setParams({ mealTitle: selectedMeal.title });
    props.navigation.setParams({ toggleFav: toggleFavoriteHandler })
  }, [toggleFavoriteHandler])

  useEffect(() => {
    props.navigation.setParams({ isFav: currentMealIsFavorite })
  }, [currentMealIsFavorite])
  return (
    <ScrollView>
      <Image source={{ uri: selectedMeal.imageUrl }} style={styles.image} />
      <View style={styles.details}>
        <DefaultText>זמן ממוצע: {selectedMeal.duration} דקות</DefaultText>
        <DefaultText>רמת מורכבות: {selectedMeal.complexity}</DefaultText>
      </View>
      <Text style={styles.title}>מרכיבים</Text>
      {selectedMeal.ingredients.map((ingredient) => (
        <ListItem key={ingredient}>{ingredient}</ListItem>
      ))}
      <Text style={styles.title}>צעדים</Text>
      {selectedMeal.steps.map((step) => (
        <ListItem key={step}>{step}</ListItem>
      ))}
    </ScrollView>
  )
}

MealDetailScreen.navigationOptions = (navigationData) => {
  //   const mealId = navigationData.navigation.getParam('mealId')
  const toggleFavorite = navigationData.navigation.getParam('toggleFav')
  const mealTitle = navigationData.navigation.getParam('mealTitle')
  const isFavorite = navigationData.navigation.getParam('isFav')
  //   const selectedMeal = MEALS.find((meal) => meal.id === mealId)
  return {
    headerTitle: mealTitle,
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Facorite"
          iconName={isFavorite ? 'ios-star' : 'ios-star-outline'}
          onPress={toggleFavorite}
        />
      </HeaderButtons>
    ),
  }
}

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: Dimensions.get('window').width * 0.7,
    borderRadius: (Dimensions.get('window').width * 0.7) / 6,
    marginVertical: Dimensions.get('window').height / 50,
  },
  details: {
    flexDirection: 'row',
    padding: 15,
    justifyContent: 'space-around',
  },
  title: {
    fontFamily: 'open-sans-bold',
    fontSize: 22,
    textAlign: 'center',
  },
  listItem: {
    marginVertical: 5,
    marginHorizontal: 20,
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 10,
  },
})

export default MealDetailScreen
