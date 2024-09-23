import { sql } from './client'
import { Meal } from '@/types/Meal';

export const createMeal = async (meal: Meal) => {
    const {day_id, meal_id, user_id, meal_type, meal_description, items, calories} = meal;
    try {
        await sql `INSERT INTO meals(meal_id, day_id, user_id, meal_type, meal_description, items, calories) VALUES(${meal_id}, ${day_id}, ${user_id}, ${meal_type}, ${meal_description}, ${JSON.stringify(items)}, ${calories})`;
        return meal;
    } catch (error) {
        throw Error('Creating meal failed');
    }
}

export const getMeals = async (day_id, user_id) => {
    try {
        const response = await sql `SELECT * FROM meals WHERE day_id=${day_id} and user_id=${user_id}`;
        return response;
    } catch (error) {
        throw Error('Error getting meals');
    }
}

export const removeMeal = async (meal: Meal) => {
    const { id, meal_id, day_id } = meal;
    try {
        await sql `DELETE FROM meals WHERE id=${id} AND meal_id=${meal_id} AND day_id=${day_id}`;
        return 'Success';
    } catch (error) {
        throw Error('Error removing meal');
    }
}