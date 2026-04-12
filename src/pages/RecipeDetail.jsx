import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { getRecipeById } from "../api/api";
import getIngredients from "../utils/utils";
import CategoryLabel from "../components/CategoryLabel";

export default function RecipeDtail() {
  const { id } = useParams();
  const [recipeDetail, setRecipeDetail] = useState({});
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
  window.scrollTo(0, 0)
}, [id])
  const ingredients = getIngredients(recipeDetail);
  const recipeSteps = recipeDetail.strInstructions?.split("\r\n");
  return (
    <>
      <main>
        <section>
          <div
            style={{ backgroundImage: `url(${recipeDetail.strMealThumb})` }}
            className="relative flex h-96 flex-col justify-end space-y-3 bg-cover bg-center p-10 font-[Stolzl]"
          >
            <div className="z-1 flex space-x-3">
              <CategoryLabel label={recipeDetail.strArea} />
              <CategoryLabel label={recipeDetail.strCategory} />
            </div>
            <h1 className="z-1 text-5xl text-white">{recipeDetail.strMeal}</h1>
            <div className="absolute inset-0 bg-linear-to-t from-black/70 to-transparent"></div>
          </div>
        </section>
        <section className="grid grid-cols-2 bg-[#FFD29D] p-20 font-[Stolzl]">
          <div className="flex w-fit h-fit flex-col rounded-4xl border-0 bg-white p-8">
            <h2 className="text-3xl">Ingredients list</h2>
            <hr className="mt-4 text-amber-700"></hr>
            <div className="mt-4 flex flex-col space-y-4">
              {ingredients.map((ingredient) => {
                return (
                  <div
                    key={ingredient.ingredient}
                    className="flex items-center justify-between space-y-2.5 text-xl"
                  >
                    <p className="m-0">{ingredient.ingredient}</p>
                    <p className="rounded-4xl bg-[#FFD29D] px-2 text-amber-700">
                      {ingredient.measure}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="flex flex-col space-y-5 items-center">
            <div className="rounded-4xl bg-white p-8">
              <h2 className="text-3xl">Instructions</h2>
              <hr className="mt-4 text-amber-700"></hr>
              <div className="mt-5 space-y-2 text-xl">
                {recipeSteps?.map((step) => {
                  return <p>{step}</p>;
                })}
              </div>
            </div>
            <div className="flex justify-center space-x-3 rounded-3xl bg-[#F85E00] p-8 w-fit">
              {recipeDetail.strSource && (
                <a
                  href={`${recipeDetail.strSource}`}
                  className="flex rounded-4xl bg-white px-4 py-2 text-xl text-[#F85E00]"
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
                  className="flex rounded-4xl bg-[#FFD29D] px-4 py-2 text-xl text-black items-center"
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
