import { useNavigate } from "react-router";
import { useAuth } from "../context/AuthContext";
import { useFavorites } from "../hooks/useFavorites";
import PopularDish from "../components/PopularDish";

export default function Favorites() {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const { favorites, loading, handleRemoveFavorite } = useFavorites(
    currentUser?.uid,
  );

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#FFD29D]">
        <div className="text-2xl font-[Stolzl] text-amber-900 animate-pulse">
          Loading your favorites...
        </div>
      </div>
    );
  }

  if (favorites.length === 0) {
    return (
      <div className="flex h-screen flex-col items-center justify-center bg-[#FFD29D] font-[Stolzl] text-center px-10">
        <h1 className="text-4xl text-amber-900">
          Seems like you don't have favorite recipes yet. Head to home to explore.
        </h1>
        <button 
          className="mt-8 rounded-4xl bg-[#F85E00] px-8 py-3 text-white transition hover:bg-amber-800"
          onClick={() => navigate("/")}
        >
          Go Home
        </button>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#FFD29D] px-10 py-20 md:px-20 font-[Stolzl]">
      <header className="mb-12 text-center">
        <h1 className="text-4xl text-amber-900">Your favorites</h1>
      </header>

      <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
        {favorites.map((meal) => {
          return (
            <PopularDish
              key={meal.idMeal}
              id={meal.idMeal}
              title={meal.strMeal}
              img={meal.strMealThumb}
            />
          );
        })}
      </div>
    </main>
  );
}