import {
  doc,
  setDoc,
  deleteDoc,
  getDoc,
  getDocs,
  collection,
} from "firebase/firestore";
import { db } from "../firebase";

export async function addFavorite(userId, meal) {
  console.log(userId, meal);
  const ref = doc(db, "users", userId, "favorites", meal.idMeal);
  return await setDoc(ref, {
    idMeal: meal.idMeal,
    strMeal: meal.strMeal,
    strMealThumb: meal.strMealThumb,
    strCategory: meal.strCategory,
    strArea: meal.strArea,
  });
}

export async function removeFavorite(userId, meal) {
  const ref = doc(db, "users", userId, "favorites", meal.idMeal);
  return await deleteDoc(ref);
}

export async function getFavorites(userId) {
  const ref = collection(db, "users", userId, "favorites");
  const snapshot = await getDocs(ref);
  return snapshot.docs.map((doc) => doc.data());
}

export async function checkIsFavorite(userId, mealId) {
  const ref = doc(db, "users", userId, "favorites", mealId);
  const snap = await getDoc(ref);
  return snap.exists();
}

export async function getMealPlan(userId){
  const ref = collection(db, "users", userId, "mealPlan")
  const snapshot = await getDocs(ref)
  return snapshot.docs.reduce((acc, doc) => ({ ...acc, [doc.id]: doc.data().meals }), {})
}

export async function saveDayPlan(userId, day, meals){
  const ref = doc(db, "users", userId, "mealPlan", day)
  return await setDoc(ref,{meals})
}
