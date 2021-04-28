import React from 'react'
import { View, StyleSheet } from 'react-native'
import { useSelector } from 'react-redux'
import { CATEGORIES } from '../data/dummy-data'
import Colors from '../constants/colors'
import MealList from '../components/MealList'
import DefaultText from '../components/DefaultText'

const CategoryMealScreen = (props) => {
  const catId = props.navigation.getParam('categoryId')

  const availableMeal = useSelector((state) => state.meals.filteredMeals)

  const displayedMeals = availableMeal.filter(
    (meal) => meal.cateogryIds.indexOf(catId) >= 0,
  )
  if (displayedMeals.length === 0) {
    return (
      <View style={styles.content}>
        <DefaultText>לא נמצאו מתכונים. אולי תבדוק את המסננים שלך!</DefaultText>
      </View>
    )
  }
  return <MealList listData={displayedMeals} navigation={props.navigation} />
}

CategoryMealScreen.navigationOptions = (navigationData) => {
  const catId = navigationData.navigation.getParam('categoryId')
  const selectedCategory = CATEGORIES.find((cat) => cat.id === catId)
  return {
    headerTitle: selectedCategory.title,
    headerStyle: {
      backgroundColor: Colors.primaryColor,
    },
    headerTintColor: 'white',
  }
}

CategoryMealScreen.navigationOptions = (navigationData) => {
  const catId = navigationData.navigation.getParam('categoryId')

  const selectedCategory = CATEGORIES.find((cat) => cat.id === catId)

  return {
    headerTitle: selectedCategory.title,
  }
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default CategoryMealScreen
