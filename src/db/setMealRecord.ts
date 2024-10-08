import { createDay, getDay, updateDay } from "@/db/dayActions";
import { createMeal, getMeal } from "@/db/mealActions";
import { createWeek, getWeek, updateWeek } from "@/db/weekActions";
import { firstWeekDay } from "@/lib/weekUtils";
import { Day } from "@/types/Day";
import { Meal } from "@/types/Meal";
import { Week } from "@/types/Week";

export const setMealRecord = async (meal: Meal, day: Day, week: Week) => {
  const { user_id, day_id, date } = day;
  const { meal_id } = meal;
  try {
    // ensures the record is not found before creating one
    const mealExists = await getMeal(day_id, user_id, meal_id);
    if (!mealExists) {
      // create meal
      await createMeal(meal);

      // get day by user_id, date
      let fetchedDay = await getDay(user_id, date);

      // if day exists, then update, otherwise create day
      if (fetchedDay) {
        await updateDay(day);
      } else {
        await createDay(day);
      }

      // get week by user_id, weekdays (Mon - Sunday)
      const fetchedWeek = await getWeek(user_id, firstWeekDay);

      // if week exists, then update, otherwise create week
      if (fetchedWeek) {
        await updateWeek(week);
      } else {
        await createWeek(week);
      }
    }

    return { success: true, message: "Successfully updated records" };
  } catch (error) {
    console.error(error);
    throw Error("Error handling meal creation");
  }
};
