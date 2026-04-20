import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { getPopularRecipes } from "../api/api";
import PopularDish from "../components/PopularDish";
import CuisineCard from "../components/CuisineCard";

export default function Home() {
  const navigate = useNavigate();
  const [popularRecipes, setPopularRecipes] = useState(null);
  const [recipeIndex, setRecipeIndex] = useState(0);
  const [inputResult, setInputResult] = useState("");

  const cuisineData = [
    {
      title: "Ukrainian cuisine",
      description:
        "Hearty borscht, tender varenyky, and rich salo — comfort food rooted in centuries of tradition.",
      img: "https:\/\/www.themealdb.com\/images\/media\/meals\/zadvgb1699012544.jpg",
    },
    {
      title: "Italian cooking",
      description:
        "Pasta, risotto, and slow-cooked sauces that taste like home.",
      img: "https:\/\/www.themealdb.com\/images\/media\/meals\/llcbn01574260722.jpg",
    },
    {
      title: "Mexican flavors",
      description: "Bold spices and fresh ingredients that hit different.",
      img: "https:\/\/www.themealdb.com\/images\/media\/meals\/ypxvwv1505333929.jpg",
    },
  ];
  useEffect(() => {
    const fetchRecipes = async () => {
      const data = await getPopularRecipes();
      setPopularRecipes(data);
      console.log(data.meals);
      const randIndex = Math.floor(Math.random() * data.meals.length);
      setRecipeIndex(randIndex);
    };
    fetchRecipes();
  }, []);

  popularRecipes &&
    console.log(popularRecipes.meals.slice(recipeIndex, recipeIndex + 3));

  return (
    <>
      <main className="overflow-x-hidden">
        <section className="min-h-screen w-full bg-[#FFD29D] px-4 py-6 md:px-20 md:py-10">
          <div
            style={{ backgroundImage: "url(src/assets/pics/homeback.jpg)" }}
            className="relative mx-auto flex h-[75vh] w-full flex-col items-center justify-center space-y-6 rounded-[40px] border-2 border-amber-800 bg-cover bg-center p-6 md:h-[90vh] md:rounded-[60px]"
          >
            <div className="flex flex-col items-center space-y-2 text-center font-[Stolzl] text-white">
              <h1 className="text-3xl md:text-5xl lg:text-6xl">
                Find your next <br /> favorite meal
              </h1>
              <h2 className="text-sm md:text-lg">
                Search by ingredient, cuisine, or dish name
              </h2>
            </div>
            <div className="flex w-full max-w-2xl flex-col justify-center gap-4 font-[Stolzl] md:flex-row">
              <input
                type="text"
                placeholder="Enter ingredients separated by commas (e.g. chicken, garlic, salt)"
                className="w-full rounded-4xl border border-amber-700 bg-[#FFD29D] px-6 py-3 text-sm placeholder-amber-900/50 md:text-base"
                value={inputResult}
                onChange={(e) => {
                  setInputResult(e.target.value);
                }}
              />
              <button
                className="cursor-pointer rounded-4xl bg-[#F85E00] px-8 py-3 whitespace-nowrap text-amber-50 transition hover:bg-[#d65200]"
                onClick={() => {
                  const formattedIngredients = inputResult
                    .split(",")
                    .map((ingredient) =>
                      ingredient.trim().toLowerCase().replace(/\s+/g, "_"),
                    )
                    .filter(Boolean);
                  navigate("/search", {
                    state: { ingredients: formattedIngredients },
                  });
                  setInputResult("");
                }}
              >
                Search
              </button>
            </div>
          </div>
        </section>
        <section className="flex flex-col bg-amber-700 px-6 py-16 md:px-20 md:py-28">
          <div className="mb-10 flex flex-col space-y-4 text-center font-[Stolzl] text-[#FFB563]">
            <p>Popular</p>
            <h1 className="text-3xl md:text-5xl">What's cooking right now</h1>
            <p className="text-sm md:text-lg">
              See what others are making this week
            </p>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {popularRecipes &&
              popularRecipes.meals
                .slice(recipeIndex, recipeIndex + 3)
                .map((meal) => {
                  return (
                    <PopularDish
                      img={meal.strMealThumb}
                      title={meal.strMeal}
                      key={meal.idMeal}
                      id={meal.idMeal}
                    />
                  );
                })}
          </div>
        </section>
        <section className="flex flex-col bg-[#FFD29D] px-6 py-16 font-[Stolzl] text-amber-900 md:px-28 md:py-20">
          <div className="mb-12 flex flex-col space-y-4 text-center">
            <p>Explore</p>
            <h1 className="text-3xl md:text-5xl">
              Cook by the world's flavors
            </h1>
            <p className="mx-auto max-w-2xl text-sm md:text-base">
              Pick a cuisine and find your next favorite dish. Each style brings
              its own heat, spice, and soul to the table.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {cuisineData.map((cuisine) => {
              return (
                <CuisineCard
                  title={cuisine.title}
                  img={cuisine.img}
                  description={cuisine.description}
                />
              );
            })}
          </div>
        </section>
      </main>
    </>
  );
}
