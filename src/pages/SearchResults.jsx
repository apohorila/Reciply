import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { getRecipeByIngredient } from "../api/api";
import { findMeal } from "../utils/utils";
import PopularDish from "../components/PopularDish";

export default function SearchResults() {
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [fallbackMode, setFallbackMode] = useState(false);
  const [results, setResults] = useState([]);

  const searchIngredients = location.state?.ingredients || [];

  useEffect(() => {
    const fetchAllData = async () => {
      if (searchIngredients.length === 0) {
        setLoading(true);
        return;
      }

      try {
        setLoading(true);
        const promises = searchIngredients.map((ing) =>
          getRecipeByIngredient(ing),
        );
        const allResponses = await Promise.all(promises);
        const commonRecipes = findMeal(allResponses);

        if (commonRecipes.length > 0) {
          setResults(commonRecipes);
          setFallbackMode(false);
        } else {
          setResults(allResponses[0] || []);
          setFallbackMode(true);
        }
      } catch (err) {
        setError("Something went wrong while fetching recipes.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchAllData();
  }, [location.state]);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#FFD29D]">
        <div className="animate-pulse font-[Stolzl] text-2xl text-amber-900">
          Searching for the best matches...
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#FFD29D] px-10 py-20 md:px-20">
      <header className="mb-12 text-center font-[Stolzl]">
        <h1 className="text-4xl text-amber-900">Search Results</h1>
        <p className="mt-2 text-amber-800">
          Showing recipes for: {searchIngredients.join(", ").replace(/_/g, " ")}
        </p>

        {fallbackMode && results.length > 0 && (
          <div className="mt-4 rounded-xl border border-amber-200 bg-amber-100 p-4 text-amber-800">
            <p>
              ☝️ We couldn't find a dish with <b>all</b> these ingredients, but
              here is what you can make with{" "}
              <b>{searchIngredients[0].replace(/_/g, " ")}</b>:
            </p>
          </div>
        )}
      </header>

      {results.length > 0 ? (
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((meal) => (
            <PopularDish
              key={meal.idMeal}
              id={meal.idMeal}
              title={meal.strMeal}
              img={meal.strMealThumb}
            />
          ))}
        </div>
      ) : (
        <div className="text-center font-[Stolzl] text-xl text-amber-900">
          <p>No recipes found. Try different ingredients!</p>
        </div>
      )}
    </main>
  );
}
