import { sql } from './client';

export const getWeek = async (userId: string, firstWeekDay: string | any) => {
    try {
        const response = await sql `SELECT * FROM weeks WHERE user_id = ${userId} and start_date = ${firstWeekDay}`;
        return response[0];
    } catch (error) {
        throw Error('Error getting week');
    }
}

export const createWeek = async (week) => {
    const {week_id, user_id, start_date, end_date, daily_goals_met} = week;

    try {
        await sql `INSERT INTO weekly_goals(week_id, user_id, start_date, end_date, daily_goals_met) VALUES(${week_id},${user_id},${start_date},${end_date},${daily_goals_met})`;
        return week;
    } catch (error) {
        throw Error('Error creating week');
    }
}