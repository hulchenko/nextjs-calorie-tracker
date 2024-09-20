import { sql } from './client'

export const createMeal = async (meal) => {
    const {day_id, meal_id, user_id, meal_type, items, calories} = meal;
    try {
        console.log(`QUERY: INSERT INTO meals(meal_id, day_id, user_id, meal_type, items, calories) VALUES(${meal_id}, ${day_id}, ${user_id}, ${meal_type}, ${JSON.stringify(items)}, ${calories})`)
        await sql `INSERT INTO meals(meal_id, day_id, user_id, meal_type, items, calories) VALUES(${meal_id}, ${day_id}, ${user_id}, ${meal_type}, ${JSON.stringify(items)}, ${calories})`;
        return meal;
    } catch (error) {
        throw new Error('Error creating new meal', error);
    }
}