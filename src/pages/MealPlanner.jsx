import { useState } from "react";
import { useNavigate } from "react-router";
import { useMealPlan } from "../context/MealPlanContext";
import { useFavorites } from "../hooks/useFavorites";
import { useAuth } from "../context/AuthContext";

const DAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

export default function MealPlanner() {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const { favorites } = useFavorites(currentUser?.uid);
  const { planner, addToDay, removeFromDay } = useMealPlan();
  const [selectedDay, setSelectedDay] = useState(null);

  return (
    <main className="min-h-screen bg-[#FFD29D] p-6 font-[Stolzl] md:p-10">
      <h1 className="mb-10 text-center text-4xl text-amber-900">
        My Meal Planner
      </h1>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-7">
        {DAYS.map((day) => (
          <div
            key={day}
            className="flex min-h-100 flex-col rounded-3xl bg-white p-4 shadow-sm"
          >
            <h2 className="mb-4 border-b pb-2 text-xl font-bold text-amber-900">
              {day}
            </h2>
            <div className="grow space-y-3">
              {planner[day].length === 0
                ? "No meals yet"
                : planner[day].map((meal) => (
                    <div
                      key={meal.idMeal}
                      className="flex items-center justify-between rounded-2xl bg-[#FFD29D]/20 p-3 text-sm"
                    >
                      <span onClick={() => navigate(`/recipe/${meal.idMeal}`)} className="hover:underline cursor-pointer">
                        {meal.strMeal}
                      </span>
                      <button
                        className="font-bold text-amber-700 hover:text-red-500"
                        onClick={() => removeFromDay(day, meal.idMeal)}
                      >
                        ×
                      </button>
                    </div>
                  ))}
            </div>
            <button
              className="mt-4 w-full cursor-pointer rounded-2xl border-2 border-dashed border-[#F85E00] py-2 text-[#F85E00] transition hover:bg-[#F85E00] hover:text-white"
              onClick={() => setSelectedDay(day)}
            >
              + Add recipe
            </button>
          </div>
        ))}
      </div>
      {selectedDay && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          {" "}
          // backdrop — full screen dark overlay
          <div className="overflow- max-h-[80vh] w-full max-w-md rounded-3xl bg-white p-6">
            {" "}
            // modal card
            <h2>Add to {selectedDay}</h2>
            <button onClick={() => setSelectedDay(null)}>✕</button>
            {favorites.map((meal) => (
              <div
                key={meal.idMeal}
                onClick={() => {
                  addToDay(selectedDay, meal);
                  setSelectedDay(null);
                }}
                className="flex cursor-pointer items-center gap-3 rounded-2xl p-2 hover:bg-[#FFD29D]"
              >
                <img
                  src={meal.strMealThumb}
                  className="h-12 w-12 rounded-xl object-cover"
                />
                <p>{meal.strMeal}</p>
              </div>
            ))}
            {favorites.length === 0 && (
              <p>No favorites yet. Save some recipes first!</p>
            )}
          </div>
        </div>
      )}
    </main>
  );
}
