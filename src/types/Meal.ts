export interface Meal {
    id?: number,
    meal_id: string,
    day_id: string,
    meal_type: string,
    meal_description: string,
    items: Nutritions[],
    calories: number
}

interface Nutritions {
    name: string,
    calories: number,
    carbohydrates_total_g: number,
    cholesterol_mg: number,
    fat_saturated_g: number,
    fat_total_g: number,
    fiber_g: number,
    potassium_mg: number,
    protein_g: number,
    serving_size_g: number,
    sodium_mg: number,
    sugar_g: number
}