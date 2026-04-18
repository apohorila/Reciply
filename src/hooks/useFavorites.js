import { useState, useEffect } from "react";
import {
  addFavorite,
  removeFavorite,
  getFavorites,
  checkIsFavorite,
} from "../api/firestore";

export function useFavorites(userId) {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchFavorites = async () => {
      if (!userId) {
        return;
      }
      try {
        setLoading(true);
        const data = await getFavorites(userId);
        setFavorites(data);
      } catch (err) {
        throw new Error("Error");
      } finally {
        setLoading(false);
      }
    };
    fetchFavorites()
  }, [userId]);

  const handleAddFavorite = async (meal) => {
    await addFavorite(userId, meal);
    setFavorites((prev) => [...prev, meal]);
  };

  const handleRemoveFavorite = async (mealId) => {
    await removeFavorite(userId, mealId);
    setFavorites((prev) => prev.filter((f) => f.idMeal !== mealId));
  };

  const checkIsFavorite = async (mealId) => {
    return await isFavorite(userId, mealId);
  };

  return {
    favorites,
    loading,
    handleAddFavorite,
    handleRemoveFavorite,
    checkIsFavorite,
  };
}
