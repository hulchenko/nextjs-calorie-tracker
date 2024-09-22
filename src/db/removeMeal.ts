import { sql } from './client';

export const removeMeal = async (meal) => {
    const { id, meal_id, day_id } = meal;
    try {
        await sql `DELETE FROM meals WHERE id=${id} AND meal_id=${meal_id} AND day_id=${day_id}`;
        return 'Success';
    } catch (error) {
        throw new Error('Error removing meal from database', error);
    }
}