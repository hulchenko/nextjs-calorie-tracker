import { sql } from './client';

export const getWeek = async (userId: string, firstWeekDay: string | any) => {
    try {
        const response = await sql `SELECT * FROM weekly_summary WHERE user_id = ${userId} and start_date = ${firstWeekDay}`;
        return response[0];
    } catch (error) {
        throw new Error ('Error getting weekly summary from database', error);
    }
}