import { sql } from './client';
import { Day } from '@/types/Day';

export const createDay = async (day: Day) => {
    const {day_id, user_id, date, calories_consumed, goal_met} = day;
    try {
        await sql `INSERT INTO days(day_id, user_id, date, calories_consumed, goal_met) VALUES (${day_id}, ${user_id}, ${date}, ${calories_consumed}, ${goal_met})`;
        return day;
    } catch (error) {
        throw Error('Creating day failed');
    }
}

export const getDay = async (userId: string, date: string): Promise<Day> => {
    try {
        const response = await sql `SELECT * FROM days where user_id = ${userId} and date = ${date}`;
        return response[0] as Day;
    } catch (error) {
        throw Error('Getting user failed');
    }
}

export const updateDay = async (day: Day) => {
    const {user_id, date, calories_consumed, goal_met} = day;
    try {
        await sql `UPDATE days SET calories_consumed = ${calories_consumed}, goal_met = ${goal_met} WHERE user_id = ${user_id} AND date = ${date}`;
        return day;
    } catch (error) {
        throw Error('Error updating day');
    }
}