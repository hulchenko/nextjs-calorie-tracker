import { createDay, getDay, updateDay } from "@/db/dayActions";
import { createMeal, getMeal } from "@/db/mealActions";
import { createWeek, getWeek, updateWeek } from "@/db/weekActions";
import { Day } from "@/types/Day";
import { Meal } from "@/types/Meal";
import { Week } from "@/types/Week";
import moment from "moment";

export const setMealRecord = async (meal: Meal, day: Day, week: Week) => {
  const { user_id, day_id, date } = day;
  const { meal_id } = meal;
  const firstWeekDay = moment()
    .startOf("isoWeek")
    .seconds(0)
    .milliseconds(0)
    .toISOString();
  try {
    // ensures the record is not found before creating one
    const mealExists = await getMeal(day_id, user_id, meal_id);
    if (!mealExists) {
      // create meal
      await createMeal(meal);

      // get day by user_id, date
      console.log(`GETTING DAY`);
      let fetchedDay = await getDay(user_id, date);

      // if day exists, then update, otherwise create day
      if (fetchedDay) {
        console.log(`UPDATING DAY`);
        await updateDay(day);
      } else {
        console.log(`CREATING DAY`);
        await createDay(day);
      }

      // get week by user_id, weekdays (Mon - Sunday)
      console.log(`GETTING WEEK`);
      const fetchedWeek = await getWeek(user_id, firstWeekDay);

      // if week exists, then update, otherwise create week
      if (fetchedWeek) {
        console.log(`UPDATING WEEK`);
        await updateWeek(week);
      } else {
        console.log(`CREATING WEEK`);
        await createWeek(week);
      }
    }

    return { success: true, message: "Successfully updated records" };
  } catch (error) {
    console.error(error);
    throw Error("Error handling meal creation");
  }
};
