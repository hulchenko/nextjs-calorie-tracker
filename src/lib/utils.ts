"use server"; // all of the functions implicitly turn to async

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

export const generateWeek = () => {
    const firstWeekDay = moment().startOf('isoWeek'); // '2024-09-09'
    const lastWeekDay = moment().endOf('isoWeek'); // '2024-09-15'
    const week: Array<any> = [];
    let week_day = firstWeekDay.clone(); // initialize first weekday from the given week

    while (week_day.isSameOrBefore(lastWeekDay)){
        const date = week_day.seconds(0).milliseconds(0).toISOString();
        const weekday = week_day.format('dddd');
        week.push({weekday, date});
        week_day.add(1, 'day');
    }
    
    return {week, firstWeekDay};
}

export const generateGreeting = () => {
    // TODO add emojis
    const currentHour = new Date(Date.now()).getHours();
    const morning = currentHour >= 3 && currentHour < 12;
    const afternoon = currentHour >= 12 && currentHour < 17;
    const evening = (currentHour >= 17 && currentHour <= 23) || (currentHour >= 0 && currentHour < 3);
    if (morning){
        return 'Good morning';
    }
    if (afternoon){
        return 'Good afternoon';
    }
    if (evening){
        return 'Good evening';
    }
    return 'Hello';
}