import { v4 as uuidv4 } from 'uuid';
import { Week } from '@/types/Week';
import moment from 'moment';

const weekStart = moment().startOf('isoWeek'); // '2024-09-09'
const weekEnd = moment().endOf('isoWeek'); // '2024-09-15'

export const firstWeekDay = weekStart.clone().seconds(0).milliseconds(0).toISOString();

export const defaultWeek = (userId: string): Week => {
    const start = weekStart.clone().seconds(0).milliseconds(0).toISOString();
    const end = weekEnd.clone().seconds(0).milliseconds(0).toISOString();
    return {
            week_id: uuidv4(),
            user_id: userId,
            start_date: start,
            end_date: end,
            daily_goals_met: { 0: false, 1: false, 2: false, 3: false, 4: false, 5: false, 6: false }
        };
}

export const generateWeek = () => {
    const generatedWeek: Array<any> = [];
    let dayOfWeek = weekStart.clone(); // initialize first week day from the given week
    while (dayOfWeek.isSameOrBefore(weekEnd)){
        const date = dayOfWeek.seconds(0).milliseconds(0).toISOString();
        const weekDay = dayOfWeek.format('dddd');
        generatedWeek.push({weekDay, date});
        dayOfWeek.add(1, 'day');
    }
    
    return generatedWeek;
}