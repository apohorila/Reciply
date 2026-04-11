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
  const ingredients = getIngredients(recipeDetail);
  return (
    <>
      <main>
        <section>
          <img src={recipeDetail.strMealThumb} />
          <h1>{recipeDetail.strMeal}</h1>
          <div>
            <CategoryLabel label={recipeDetail.strArea} />
            <CategoryLabel label={recipeDetail.strCategory} />
          </div>
        </section>
        <section>
          <h2>Ingredients list</h2>
          <div>
            {ingredients.map((ingredient) => {
              return (
                <div key={ingredient.ingredient}>
                  <p>{ingredient.ingredient}</p>
                  <p>{ingredient.measure}</p>
                </div>
              );
            })}
          </div>
        </section>
        <section>
          <h2>Recipe</h2>
          <p>{recipeDetail.strInstructions}</p>
        </section>
        <section>
          <p>
            Source:{" "}
            <span>
              <a
                href={`${recipeDetail.strSource}`}
              >{`${recipeDetail.strSource}`}</a>
            </span>
          </p>
          <p>
            Youtube tutorial:{" "}
            <span>
              <a href={`${recipeDetail.strYoutube}`}>
                {recipeDetail.strYoutube}
              </a>
            </span>
          </p>
        </section>
      </main>
    </>
  );
}
