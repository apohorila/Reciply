import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { checkIsFavorite, addFavorite, removeFavorite } from "../api/firestore";

export default function FavoriteButton({ userId, meal }) {
  const navigate = useNavigate();
  const [isFavorite, setIsFavorite] = useState(false);
  if (!meal) return null;
  useEffect(() => {
    const fetchFavorite = async () => {
      if (!userId || !meal) {
        return;
      }
      const isFav = await checkIsFavorite(userId, meal.idMeal);
      setIsFavorite(isFav);
    };
    fetchFavorite();
  }, [meal.idMeal, userId]);

  const handleClick = async () => {
    if (!userId) {
      navigate("/login");
      return;
    }
    if (isFavorite) {
      await removeFavorite(userId, meal);
      setIsFavorite(false);
    } else {
      await addFavorite(userId, meal);
      setIsFavorite(true);
    }
  };
  return (
    <button className="cursor-pointer" onClick={handleClick}>
      {isFavorite ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          width="40"
          height="40"
          fill="#FFFFFF"
          style={{ opacity: 1 }}
        >
          <path d="M2 6.342a3.375 3.375 0 0 1 6-2.088a3.375 3.375 0 0 1 5.997 2.26c-.063 2.134-1.618 3.76-2.955 4.784a14.4 14.4 0 0 1-2.676 1.61q-.031.015-.05.022l-.014.006l-.004.002h-.002a.75.75 0 0 1-.592.001h-.002l-.004-.003l-.015-.006a6 6 0 0 1-.232-.107a14.4 14.4 0 0 1-2.535-1.557C3.564 10.22 1.999 8.558 1.999 6.38z" />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="40"
          height="40"
          fill="none"
          stroke="#FFFFFF"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ opacity: 1 }}
        >
          <path
            fill="none"
            d="M21 8.25c0-2.485-2.099-4.5-4.687-4.5c-1.936 0-3.598 1.126-4.313 2.733c-.715-1.607-2.377-2.733-4.312-2.733C5.098 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12"
          />
        </svg>
      )}
    </button>
  );
}
