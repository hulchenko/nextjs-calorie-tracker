"use server"; // all of the functions implicitly turn to async

import { Meal } from '@/types/Meal';
import bcrypt from 'bcrypt';
import moment from 'moment';

export const passwordValidator = async (password: string): Promise<boolean> => {
    const regex = new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,}$/gm);
    return regex.test(password);
}

export const encryptPassword = async (password: string): Promise<string> => {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
}

export const validateHashedPassword = async (password: string, hashedPassword: string): Promise<boolean> => {
    if (password && hashedPassword){
        return bcrypt.compareSync(password, hashedPassword);
    }
    return false;
}

export const generateGreeting = () => {
    const currentHour = new Date(Date.now()).getHours();
    const morning = currentHour >= 3 && currentHour < 12;
    const afternoon = currentHour >= 12 && currentHour < 17;
    const evening = (currentHour >= 17 && currentHour <= 23) || (currentHour >= 0 && currentHour < 3);
    if (morning){
        return 'Good Morning 🌅';
    }
    if (afternoon){
        return 'Good Afternoon 🌞';
    }
    if (evening){
        return 'Good Evening 🌚';
    }
    return 'Hello';
}

export const sumCalories = (list: Meal[]) => {
    return list.reduce((total, curr) => total + (curr.calories || 0), 0) || 0;
}