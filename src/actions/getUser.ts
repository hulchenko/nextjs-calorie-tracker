"use server";

import { UserDB } from '@/types/User';
import { sql } from '@/db/client';

export const getUser = async (prop, queryById): Promise<UserDB[] | any> => {
    // redundant code due to query builder doesn't handle variable interpolation correctly (e.g. dynamically swapping between the user_id/email properties)
    try {
        if(queryById) {
            const response = await sql `SELECT * FROM users WHERE user_id = ${prop}`;
            return response[0];
        } else {
            const response = await sql `SELECT * FROM users WHERE email = ${prop}`;
            return response[0];
        }
    } catch (error) {
        throw new Error('Error getting user', error);
    }    
}