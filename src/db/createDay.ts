import { sql } from './client';
import { Day } from '@/types/Day';

export const createDay = async (day: Day) => {
    const {user_id, date, calorie_target, calories_consumed, goal_met} = day;
    try {
        await sql `INSERT INTO daily_goals(user_id, date, calorie_target, calories_consumed, goal_met) VALUES (${user_id}, ${date}, ${calorie_target}, ${calories_consumed}, ${goal_met})`;
        return day;
    } catch (error) {
        throw new Error('Error creating day', error);
    }
}