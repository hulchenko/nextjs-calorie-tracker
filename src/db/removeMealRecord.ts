import { updateDay } from "@/db/dayActions";
import { getMeal, removeMeal } from "@/db/mealActions";
import { updateWeek } from "@/db/weekActions";
import { Day } from "@/types/Day";
import { Meal } from "@/types/Meal";
import { Week } from "@/types/Week";

export const removeMealRecord = async (meal: Meal, day: Day, week: Week) => {
  const { user_id, day_id } = day;
  const { meal_id } = meal;
  try {
    // ensure meal is in DB
    const existingMeal = await getMeal(day_id, user_id, meal_id);
    if (existingMeal) {
      await removeMeal(existingMeal);

      await updateDay(day);

      await updateWeek(week);
      return { success: true, message: "Successfully updated records" };
    }
    return { success: true, message: "Record removed locally" };
  } catch (error) {
    console.error(error);
    throw Error("Error handling meal removal");
  }
};
