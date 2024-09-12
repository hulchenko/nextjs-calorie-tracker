"use server";

import { getUser } from './getUser';
import { createUser } from './createUser';

export const verifyUserDB = async (user, queryById=true) => {
    const prop = queryById ? user.id : user.email;
    let userData = await getUser(prop, queryById);
    if (!queryById && userData){
        throw new Error('User already exists!')
    }
    
    if (!userData){
        userData = await createUser(user);
    }

    return userData;
};