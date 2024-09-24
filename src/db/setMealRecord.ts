import { createDay, getDay, updateDay } from '@/db/dayActions';
import { createMeal } from '@/db/mealActions';
import { createWeek, getWeek, updateWeek } from '@/db/weekActions';
import { Day } from '@/types/Day';
import { Meal } from '@/types/Meal';
import { Week } from '@/types/Week';
import moment from 'moment';

export const setMealRecord = async (meal: Meal, day: Day, week: Week) => {
    try {
        const { user_id, date } = day;
        const firstWeekDay = moment().startOf('isoWeek').seconds(0).milliseconds(0).toISOString();

        // create meal
        console.log(`CREATING MEAL`);
        await createMeal(meal);

        // get day by user_id, date
        console.log(`GETTING DAY`);
        let fetchedDay = await getDay(user_id, date);

        // if day exists, then update, otherwise create day
        if(fetchedDay) {
            console.log(`UPDATING DAY`);
            const updated = updateDayStats(fetchedDay, meal);
            fetchedDay = await updateDay(updated)
        } else {
            console.log(`CREATING DAY`);
            const updated = updateDayStats(day, meal);
            fetchedDay = await createDay(updated)
        }

        // get week by user_id, weekdays (Mon - Sunday)
        console.log(`GETTING WEEK`);
        const fetchedWeek = await getWeek(user_id, firstWeekDay);

        // if week exists, then update, otherwise create week
        if(fetchedWeek){
            console.log(`UPDATING WEEK`);
            const updated = updateWeekStats(fetchedWeek, fetchedDay);
            await updateWeek(updated);
        } else {
            console.log(`CREATING WEEK`);
            const updated = updateWeekStats(week, fetchedDay);
            await createWeek(updated);
        }
        
        return { success: true, message: 'Successfully updated records' };
    } catch (error) {
        throw Error('Error handling meal creation', error);
    }
}

const updateDayStats = (day: Day, meal: Meal) => {
    const updatedDay = {...day};
    updatedDay.calories_consumed += meal.calories;
    updatedDay.goal_met = updatedDay.calories_consumed >= updatedDay.calorie_target;
    return updatedDay;
}

const updateWeekStats = (week: Week, day: Day) => {
    const updatedWeek = {...week};
    if(day.goal_met){
        updatedWeek.daily_goals_met++;
    }
    return updatedWeek;
}