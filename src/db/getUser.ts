"use server";

import { User } from '@/types/User';
import { sql } from '@/db/client';

export const getUser = async (prop: string | number, queryById: boolean): Promise<User[] | any> => {
    // query builder does not support variable interpolation correctly (e.g. dynamically swapping between the user_id/email properties)
    try {
        if(queryById) {
            const response = await sql `SELECT * FROM users WHERE user_id = ${prop}`;
            return response[0];
        } else {
            const response = await sql `SELECT * FROM users WHERE email = ${prop}`;
            return response[0];
        }
    } catch (error) {
        throw Error('Error getting user');
    }    
}