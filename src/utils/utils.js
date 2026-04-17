export default function getIngredients(meal) {
  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    ingredients.push({
      ingredient: meal[`strIngredient${i}`],
      measure: meal[`strMeasure${i}`],
    });
  }
  return ingredients.filter(
    (ingredient) =>
      ingredient.ingredient &&
      ingredient.ingredient.trim() !== "" &&
      ingredient.measure &&
      ingredient.measure.trim() !== "",
  );
}

export function findMeal(meals) {
  if (!meals || meals.length === 0) {
    return [];
  }
  if (meals.length === 1) {
    return meals[0];
  }
  const mealsList = meals[0].filter((meal) => {
    return meals.every((subMeals) => {
      subMeals.some((item) => item.idMeal === meal.id);
    });
  });
  return mealsList;
}
