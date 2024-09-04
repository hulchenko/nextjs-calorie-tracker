"use server";

import { getUser } from './getUser';
import { createUser } from './createUser';

export const checkUserDB = async (user, queryById=true) => {
    const prop = queryById ? user.id : user.email;
    let userData = await getUser(prop, queryById);
    if (!queryById && userData){
        throw new Error('User exists!')
    }
    if (!userData){
        userData = await createUser(user);
    }
    return userData;
};