export async function getPopularRecipes() {
  const res = await fetch(
    "https://www.themealdb.com/api/json/v1/1/filter.php?c=Seafood",
  );
  if (!res.ok) {
    throw new Error("Couldn't fetch data from server");
  }
  const data = await res.json();
  return data;
}

export async function getRecipeById(id) {
  const res = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
  if (!res.ok) {
    throw new Error("Couldn't fetch the recipe");
  }
  const data = await res.json();
  return data;
}

export async function getRecipeByIngredient(ingredient){
  const res = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`)
  if (!res.ok) {
    throw new Error("Couldn't fetch the recipe");
  }
  const data = await res.json();
  if (!data.meals){
    return []
  }
  return data.meals;
}
