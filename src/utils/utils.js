export default function getIngredients(meal) {
  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    ingredients.push({
      ingredient: meal[`strIngredient${i}`],
      measure: meal[`strMeasure${i}`],
    });
  }
  return ingredients.filter(ingredient => ingredient.ingredient && ingredient.ingredient.trim() !== "" && ingredient.measure && ingredient.measure.trim() !== "")
}
