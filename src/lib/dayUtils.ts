import { Meal } from '@/types/Meal';
import { Day } from '@/types/Day';
import { v4 as uuidv4 } from 'uuid';
import { Week } from '@/types/Week';
import moment from 'moment';

export const defaultDay = (userId: string, date: string): Day => {
    return {
            day_id: uuidv4(),
            user_id: userId,
            date,
            calorie_target: 2400, // to pull from settings later
            calories_consumed: 0,
            goal_met: false
        };
}

export const getDayIdx = (day: Day): number => {
  const index = moment(day?.date).isoWeekday() - 1; // by default isoWeekday() returns 1 - 7
  return index
}

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
export const saveAllMeals = async (day: Day, mealList: Meal[], week: Week, toast) => {
  try {
    const mealPromises = mealList.map((meal) => {
      const existingMeal = 'id' in meal; // works only on simultaneously added meals, does not work on add -> save -> add basis. This is intercepted in the removeMealRecord.ts
      if (!existingMeal) {
        return writeMealData(day, meal, week, 'POST');
      }
    });
    await Promise.all(mealPromises);
    toast({ title: 'Meal(s) saved successfully', status: 'success' });
  } catch (error) {
    toast({ title: `${error}`, status: 'error' });
  }
};

// Write meal data (POST or PUT), invoked from saveAllMeals
const writeMealData = async (day: Day, meal: Meal, week: Week, methodType) => {
  try {
    meal.day_id = day.day_id; // append day ID for reference
    meal.user_id = day.user_id;
    const response = await fetch('/api/db/meal', {
      method: methodType,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({meal, day, week}),
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