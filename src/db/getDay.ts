import { sql } from './client'
import { Day } from '@/types/Day';

export const getDay = async (userId: string, date: string): Promise<Day> => {
    try {
        const response = await sql `SELECT * FROM daily_goals where user_id = ${userId} and date = ${date}`;
        console.log(`DAY RESPONSE: `, response);
        return response[0] as Day;
    } catch (error) {
        throw new Error('Error getting day', error);
    }
}