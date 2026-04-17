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
      <main>
        <section className="h-screen w-full bg-[#FFD29D] px-20 py-10">
          <div
            style={{ backgroundImage: "url(src/assets/pics/homeback.jpg)" }}
            className="relative mx-auto flex h-9/10 flex-col items-center justify-center space-y-2 rounded-4xl border-2 border-amber-800 bg-cover bg-center"
          >
            <div className="flex-col items-center font-[Stolzl] text-[white]">
              <h1 className="text-center text-4xl">
                Find your next <br /> favorite meal
              </h1>
              <h2>Search by ingredient, cuisine, or dish name</h2>
            </div>
            <div className="flex w-full justify-center space-x-4 font-[Stolzl]">
              <input
                type="text"
                placeholder="Enter ingredients separated by commas (e.g. chicken, garlic, salt)"
                className="text[#F85E00] w-2xl rounded-4xl border border-amber-700 bg-[#FFD29D] px-5 py-2"
                value={inputResult}
                onChange={(e) => {
                  setInputResult(e.target.value);
                }}
              />
              <button
                className="cursor-pointer rounded-4xl bg-[#F85E00] px-3 text-amber-50"
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
                  setInputResult("")
                }}
              >
                Search
              </button>
            </div>
          </div>
        </section>
        <section className="flex-col justify-between space-y-20 bg-amber-700 px-20 py-28">
          <div className="flex-col space-y-4 text-center font-[Stolzl] text-[#FFB563]">
            <p>Popular</p>
            <h1 className="text-5xl">What's cooking right now</h1>
            <p className="text-lg">See what others are making this week</p>
          </div>
          <div className="flex justify-between">
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
        <section className="flex-col space-y-20 bg-[#FFD29D] px-28 py-20 font-[Stolzl] text-amber-900">
          <div className="flex-col space-y-4 text-center">
            <p>Explore</p>
            <h1 className="text-5xl">Cook by the world's flavors</h1>
            <p>
              Pick a cuisine and find your next favorite dish. Each style brings
              its own heat, spice, and soul to the table.
            </p>
          </div>
          <div className="flex justify-between">
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
