import { sql } from './client';
import { Day } from '@/types/Day';

export const createDay = async (day: Day) => {
    const {day_id, user_id, date, calorie_target, calories_consumed, goal_met} = day;
    try {
        await sql `INSERT INTO daily_goals(day_id, user_id, date, calorie_target, calories_consumed, goal_met) VALUES (${day_id}, ${user_id}, ${date}, ${calorie_target}, ${calories_consumed}, ${goal_met})`;
        return day;
    } catch (error) {
        throw new Error('Error creating day in database', error);
    }
}