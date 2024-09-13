import { sql } from './client';

export const getWeek = async (userId: string, firstWeekDay: string | any) => {
    // const test = '2024-08-09T03:00:00.000Z'; 
    try {
        const response = await sql `SELECT * FROM weekly_summary WHERE user_id = ${userId} and start_date = ${firstWeekDay}`;
        console.log(`WEEKLY RESPONSE: `, response);
        return response[0];
    } catch (error) {
        throw Error ('Error getting weekly summary from database');
    }
}