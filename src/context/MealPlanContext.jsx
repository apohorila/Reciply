import { useState, useEffect, createContext, useContext } from "react";
import { useAuth } from "./AuthContext";
import { getMealPlan, saveDayPlan } from "../api/firestore";

const MealPlannerContext = createContext();

export const PlannerProvider = ({ children }) => {
  const { currentUser } = useAuth();
  const [planner, setPlanner] = useState({
    Monday: [],
    Tuesday: [],
    Wednesday: [],
    Thursday: [],
    Friday: [],
    Saturday: [],
    Sunday: [],
  });

  useEffect(() => {
    const fetchPlan = async () => {
      if (!currentUser) {
        return;
      }
      const plan = await getMealPlan(currentUser.uid);
     setPlanner(prev => ({ ...prev, ...plan }));
    };
    fetchPlan();
  }, [currentUser]);

  const addToDay = async (day, meal) => {
    const updatedMeals = [...planner[day], meal];
    setPlanner((prev) => ({ ...prev, [day]: updatedMeals }));
    await saveDayPlan(currentUser.uid, day, updatedMeals);
  };

  const removeFromDay = async (day, mealId) => {
    const updated = planner[day].filter(meal => meal.idMeal !== mealId)
    setPlanner(prev => ({ ...prev, [day]: updated }))
    return await saveDayPlan(currentUser.uid,day,updated)
  }

  const clearDay = async(day) =>{
   setPlanner(prev => ({ ...prev, [day]: [] }))
    return await saveDayPlan(currentUser.uid, day, [])
  }

  return (
    <MealPlannerContext.Provider value= {{planner, addToDay, removeFromDay, clearDay}}>
        {children}
    </MealPlannerContext.Provider>
  )
};

export const useMealPlan = () => useContext(MealPlannerContext)
