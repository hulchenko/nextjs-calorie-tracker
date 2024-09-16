import { sql } from './client';
import { Day } from '@/types/Day';

export const updateDay = async (day: Day) => {
    const {user_id, date, calorie_target, calories_consumed, goal_met} = day;
    try {
        await sql `UPDATE daily_goals SET calorie_target = ${calorie_target}, calories_consumed = ${calories_consumed}, goal_met = ${goal_met} WHERE user_id = ${user_id} AND date = ${date}`;
        return day;
    } catch (error) {
        throw new Error('Error updating day', error);
    }
}