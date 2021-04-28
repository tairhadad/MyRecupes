class Meal {
  constructor(
    id,
    cateogryIds,
    title,
    complexity,
    imageUrl,
    duration,
    ingredients,
    steps,
    isGlutenFree,
    isVegan,
    isVegetarian,
    isLactoseFree,
  ) {
    this.id = id
    this.cateogryIds = cateogryIds
    this.title = title
    this.complexity = complexity
    this.imageUrl = imageUrl
    this.duration = duration
    this.ingredients = ingredients
    this.steps = steps
    this.isGlutenFree = isGlutenFree
    this.isVegan = isVegan
    this.isVegetarian = isVegetarian
    this.isLactoseFree = isLactoseFree
  }
}
export default Meal
