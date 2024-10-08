"use client";

import { Meal } from "@/types/Meal";
import { createContext, useContext, useState } from "react";

export const MealProvider = ({ children }) => {
  const [mealList, setMealList] = useState<Meal[]>([]);

  return (
    <MealContext.Provider value={{ mealList, setMealList }}>
      {children}
    </MealContext.Provider>
  );
};

const MealContext = createContext<{
  mealList: Meal[];
  setMealList: (mealList: Meal[]) => void;
}>({ mealList: [], setMealList: () => {} });

export const useMeal = () => useContext(MealContext);
