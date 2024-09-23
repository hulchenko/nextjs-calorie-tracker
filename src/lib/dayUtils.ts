import { Meal } from '@/types/Meal';
import { Day } from '@/types/Day';

// Fetch meals for the given day
export const getMeals = async (day_id, user_id, setMealList, setLoading, toast) => {
  try {
    const response = await fetch(`/api/db/meal?day_id=${day_id}&user=${user_id}`);
    if (!response.ok) {
      const { error } = await response.json();
      throw new Error(error);
    }
    const meals = await response.json();
    setMealList(meals);
    setLoading(false);
  } catch (error) {
    toast({ title: `${error}`, status: 'error' });
    setMealList([]);
    setLoading(false);
  }
};

// Save all meals
export const saveAllMeals = async (day: Day, mealList: Meal[], toast) => {
  try {
    const mealPromises = mealList.map((meal) => {
      const existingMeal = 'id' in meal;
      if (!existingMeal) {
        return writeMealData(day, meal, 'POST');
      }
    });
    await Promise.all(mealPromises);
    toast({ title: 'Meal(s) saved successfully', status: 'success' });
  } catch (error) {
    toast({ title: `${error}`, status: 'error' });
  }
};

// Write meal data (POST or PUT), invoked from saveAllMeals
const writeMealData = async (day: Day, meal: Meal, methodType) => {
  try {
    meal.day_id = day.day_id; // append day ID for reference
    meal.user_id = day.user_id;
    const response = await fetch('/api/db/meal', {
      method: methodType,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(meal),
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

// Write day data (POST or PUT)
export const writeDayData = async (newDayData: Day, methodType: string, toast) => {
  try {
    const response = await fetch('/api/db/day', {
      method: methodType,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newDayData),
    });
    if (!response.ok) {
      const { error } = await response.json();
      throw new Error(error);
    }
  } catch (error) {
    toast({ title: `${error}`, status: 'error' });
  }
};

export const sortMeals = (list: Meal[]) => {
        const sortedMeals = ['Breakfast', 'Brunch', 'Lunch', 'Supper', 'Dinner', 'Midnight Snack', 'Other'];

        const newList = [...list];
        newList.sort((prev, curr) => {
            const prevIdx = sortedMeals.indexOf(prev.meal_type);
            const currIdx = sortedMeals.indexOf(curr.meal_type);
            if(prevIdx > currIdx){
                return 1
            } else {
                return -1
            }
        });
        return newList;
    }