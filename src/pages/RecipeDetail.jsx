import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { getRecipeById } from "../api/api";
import { useAuth } from "../context/AuthContext";
import getIngredients from "../utils/utils";
import CategoryLabel from "../components/CategoryLabel";
import FavoriteButton from "../components/FavoriteButton";

export default function RecipeDtail() {
  const { id } = useParams();
  const { currentUser } = useAuth();
  const [recipeDetail, setRecipeDetail] = useState({});
  const [isFavorite, setIsFavorite] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        setLoading(true);
        const recipe = await getRecipeById(id);
        setRecipeDetail(recipe.meals[0]);
        console.log(recipe.meals[0]);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchRecipe();
  }, [id]);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);
  const ingredients = getIngredients(recipeDetail);
  const recipeSteps = recipeDetail.strInstructions?.split("\r\n");
  return (
    <>
      <main>
        <section>
          <div
            style={{ backgroundImage: `url(${recipeDetail.strMealThumb})` }}
            className="relative flex h-80 flex-col justify-end space-y-3 bg-cover bg-center p-6 font-[Stolzl] md:h-96 md:p-10"
          >
            <div className="z-1 flex space-x-3">
              <CategoryLabel label={recipeDetail.strArea} />
              <CategoryLabel label={recipeDetail.strCategory} />
            </div>
            <div className="z-1 flex items-center justify-between">
              <h1 className="text-3xl text-white md:text-5xl">
                {recipeDetail.strMeal}
              </h1>
              <FavoriteButton userId={currentUser?.uid} meal={recipeDetail} />
            </div>
            <div className="absolute inset-0 bg-linear-to-t from-black/70 to-transparent"></div>
          </div>
        </section>
        <section className="grid grid-cols-1 gap-8 bg-[#FFD29D] p-6 font-[Stolzl] md:grid-cols-2 md:p-20">
          <div className="flex h-fit w-full flex-col rounded-4xl border-0 bg-white p-6 md:w-fit md:p-8">
            <h2 className="text-2xl md:text-3xl">Ingredients list</h2>
            <hr className="mt-4 text-amber-700"></hr>
            <div className="mt-4 flex flex-col space-y-4">
              {ingredients.map((ingredient) => {
                return (
                  <div
                    key={ingredient.ingredient}
                    className="flex items-center justify-between space-y-2.5 text-xl"
                  >
                    <p className="m-0 mr-2 truncate">{ingredient.ingredient}</p>
                    <p className="shrink-0 rounded-4xl bg-[#FFD29D] px-2 text-sm text-amber-700 md:text-base">
                      {ingredient.measure}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="flex flex-col items-center space-y-5">
            <div className="w-full rounded-4xl bg-white p-6 md:p-8">
              <h2 className="text-2xl md:text-3xl">Instructions</h2>
              <hr className="mt-4 text-amber-700"></hr>
              <div className="mt-5 space-y-2 text-lg md:text-xl">
                {recipeSteps?.map((step) => {
                  return <p key={step}>{step}</p>;
                })}
              </div>
            </div>
            <div className="flex w-full flex-wrap justify-center gap-3 rounded-3xl bg-[#F85E00] p-6 md:p-8">
              {recipeDetail.strSource && (
                <a
                  href={`${recipeDetail.strSource}`}
                  className="flex items-center rounded-4xl bg-white px-4 py-2 text-lg text-[#F85E00] md:text-xl"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="mr-2 size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
                    />
                  </svg>
                  View source
                </a>
              )}
              {recipeDetail.strYoutube && (
                <a
                  href={`${recipeDetail.strYoutube}`}
                  className="flex items-center rounded-4xl bg-[#FFD29D] px-4 py-2 text-lg text-black md:text-xl"
                >
                  {" "}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={24}
                    height={24}
                    fill={"#F85E00"}
                    viewBox={"0 0 24 24"}
                    className="mr-2"
                  >
                    {/* Boxicons v3.0.8 https://boxicons.com | License  https://docs.boxicons.com/free */}
                    <path d="M21.593 7.203a2.5 2.5 0 0 0-1.762-1.766C18.265 5.007 12 5 12 5s-6.264-.007-7.831.404a2.56 2.56 0 0 0-1.766 1.778c-.413 1.566-.417 4.814-.417 4.814s-.004 3.264.406 4.814c.23.857.905 1.534 1.763 1.765 1.582.43 7.83.437 7.83.437s6.265.007 7.831-.403a2.52 2.52 0 0 0 1.767-1.763c.414-1.565.417-4.812.417-4.812s.02-3.265-.407-4.831M9.996 15.005l.005-6 5.207 3.005z" />
                  </svg>
                  Watch on Youtube
                </a>
              )}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
