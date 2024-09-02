"use server";
import {neon} from "@neondatabase/serverless";
import { User } from '../types/User';

const DATABASE_URL = process.env.DATABASE_URL;
const sql = neon(DATABASE_URL || '');

export const checkUserDB = async (user) => {
    let result = await getUser(user.id);
    if (!result.length){
        result = await createUser(user)
    }
    return result[0];
};

export const getUser = async (id): Promise<User[] | any> => {
    try {
        return await sql `SELECT * from users where user_id = ${id}`;
    } catch(error) {
        throw new Error('Error getting user', error);
    }    
}

export const createUser = async (user): Promise<User[] | any> => {
    try {
        const {id, firstName, lastName, emailAddresses} = user;
        const email = emailAddresses[0].emailAddress;
        await sql `INSERT INTO users (user_id, first_name, last_name, email) VALUES (${id}, ${firstName}, ${lastName}, ${email})`;
        const dbReturn = [
            {
                user_id: id,
                first_name: firstName,
                last_name: lastName,
                email
            }
        ];
        return dbReturn;
    } catch (error) {
        throw new Error('Error creating a user: ', error)   
    }
}