import { sql } from './client'

export const createMeal = async (meal) => {
    const {day_id, meal_id, user_id, meal_type, meal_description, items, calories} = meal;
    try {
        await sql `INSERT INTO meals(meal_id, day_id, user_id, meal_type, meal_description, items, calories) VALUES(${meal_id}, ${day_id}, ${user_id}, ${meal_type}, ${meal_description}, ${JSON.stringify(items)}, ${calories})`;
        return meal;
    } catch (error) {
        throw Error('Creating meal failed');
    }
}