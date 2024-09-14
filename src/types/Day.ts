export interface Day {
    day_id?: number,
    user_id: string,
    date: string,
    calorie_target: number,
    calories_consumed: number,
    goal_met: boolean
};