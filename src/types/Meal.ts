export interface Meal {
    id?: number,
    meal_id: string,
    day_id: string,
    meal_type: string,
    items: any[],
    calories: number
}