import { Meal } from "@/types/Meal";
import { Day } from "@/types/Day";
import { v4 as uuidv4 } from "uuid";
import { Week } from "@/types/Week";
import moment from "moment";

export const getDefaultDay = (userId: string, date: string): Day => {
  return {
    day_id: uuidv4(),
    user_id: userId,
    date,
    calories_consumed: 0,
  };
};

export const getDayIdx = (date: string): number => {
  const index = moment(date).isoWeekday() - 1; // by default isoWeekday() returns 1 - 7
  return index;
};

// Fetch meals for the given day
export const getMeals = async (day: Day, setMealList, setLoading, toast) => {
  try {
    const { day_id, user_id } = day;
    const response = await fetch(
      `/api/db/meal?day_id=${day_id}&user=${user_id}`
    );
    if (!response.ok) {
      const { error } = await response.json();
      throw new Error(error);
    }
    const meals = await response.json();
    setMealList(meals);
  } catch (error) {
    toast({ title: `${error}`, status: "error" });
    setMealList([]);
  }
  setLoading((prev) => ({
    ...prev,
    mealList: false,
  }));
};

// Save all meals
export const batchWriteMeals = async (
  day: Day,
  mealList: Meal[],
  week: Week,
  toast
) => {
  try {
    const mealPromises = mealList.map((meal) => {
      const existingMeal = "id" in meal;
      if (!existingMeal) {
        return writeMealData(day, meal, week);
      }
    });
    await Promise.all(mealPromises);
    toast({ title: "Meal(s) saved successfully", status: "success" });
  } catch (error) {
    toast({ title: `${error}`, status: "error" });
  }
};

const writeMealData = async (day: Day, meal: Meal, week: Week) => {
  try {
    meal.day_id = day.day_id; // append day ID for reference
    meal.user_id = day.user_id;
    const response = await fetch("/api/db/meal", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ meal, day, week }),
    });
    if (!response.ok) {
      const { error } = await response.json();
      throw new Error(error);
    }
    return response;
  } catch (error) {
    throw error;
  }
};

export const sortMeals = (list: Meal[] | null) => {
  if (!list) return [];

  const sortedMeals = [
    "Breakfast",
    "Brunch",
    "Lunch",
    "Supper",
    "Dinner",
    "Midnight Snack",
    "Other",
  ];

  const newList = [...list];
  newList.sort((prev, curr) => {
    const prevIdx = sortedMeals.indexOf(prev.meal_type);
    const currIdx = sortedMeals.indexOf(curr.meal_type);
    if (prevIdx > currIdx) {
      return 1;
    } else {
      return -1;
    }
  });
  return newList;
};
