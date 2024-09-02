"use server";
import {neon} from "@neondatabase/serverless";
import { UserDB } from '../types/User';
import {v4 as uuidv4} from 'uuid';

const DATABASE_URL = process.env.DATABASE_URL;
const sql = neon(DATABASE_URL || '');

export const checkUserDB = async (user, queryById=true) => {
    const query = queryById ? user.id : user.email;
    let result = await getUser(query, queryById);
    if (!queryById && result.length){
        throw new Error('User exists!')
    }
    if (!result.length){
        result = await createUser(user);
    }
    return result[0];
};

export const getUser = async (query, queryById): Promise<UserDB[] | any> => {
    // redundant code due to query builder doesn't handle variable interpolation correctly (e.g. dynamically swapping between the user_id/email properties)
    try {
        if(queryById) {
            return await sql `SELECT * FROM users WHERE user_id = ${query}`;
        } else {
            return await sql `SELECT * FROM users WHERE email = ${query}`;
        }
    } catch(error) {
        throw new Error('Error getting user', error);
    }    
}

export const createUser = async (user): Promise<UserDB[] | any> => {
    try {
        const {firstName, lastName, email} = user;
        const id = uuidv4();

        await sql `INSERT INTO users (user_id, first_name, last_name, email) VALUES (${id}, ${firstName}, ${lastName}, ${email})`;
        const userData = [
            {
                user_id: id,
                first_name: firstName,
                last_name: lastName,
                email
            }
        ];
        return userData;
    } catch (error) {
        console.error('Error creating a user');
        throw error
    }
}