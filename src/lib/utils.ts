"use server";

import bcrypt from 'bcrypt';

export const passwordValidator = (password: string): boolean => {
    const regex = new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,}$/gm);
    return regex.test(password);
}

export const encryptPassword = async (password: string): Promise<string> => {
    const saltRounds = 10;
    console.log(`ORIGINAL PASSWORD: `, password);
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    console.log(`HASHED PASSWORD: `, hashedPassword);
    return hashedPassword;
}

export const validateHashedPassword = (password: string, hashedPassword: string): boolean => {
    return bcrypt.compareSync(password, hashedPassword);
}