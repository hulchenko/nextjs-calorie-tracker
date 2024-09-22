import { sql } from './client';

export const getMeals = async (day_id, user_id) => {
    try {
        const response = await sql `SELECT * FROM meals WHERE day_id=${day_id} and user_id=${user_id}`;
        return response;
    } catch (error) {
        throw Error('Error getting meals');
    }
}