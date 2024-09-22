"use server";

import { getUser } from './getUser';
import { createUser } from './createUser';
import { User } from '@/types/User';

export const verifyUserDB = async (user: User, queryById=true) => {
    const prop = queryById ? user.id : user.email;
    let userData = await getUser(prop as string | number, queryById);
    if (!queryById && userData){
        throw Error('User already exists!')
    }
    
    if (!userData){
        userData = await createUser(user);
    }

    return userData;
};