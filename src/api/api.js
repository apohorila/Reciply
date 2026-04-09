const API_KEY = import.meta.env.VITE_SPOONACULAR_API_KEY;

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
