import { v4 as uuidv4 } from 'uuid';
import { Week } from '@/types/Week';
import moment from 'moment';

const firstWeekDay = moment().startOf('isoWeek'); // '2024-09-09'
const lastWeekDay = moment().endOf('isoWeek'); // '2024-09-15'

export const defaultWeek = (userId: string): Week => {
    const start = firstWeekDay.clone().seconds(0).milliseconds(0).toISOString();
    const end = lastWeekDay.clone().seconds(0).milliseconds(0).toISOString();
    return {
            week_id: uuidv4(),
            user_id: userId,
            start_date: start,
            end_date: end,
            daily_goals_met: 0
        };
}

export const generateWeek = () => {
    const generatedWeek: Array<any> = [];
    let dayOfWeek = firstWeekDay.clone(); // initialize first week day from the given week
    while (dayOfWeek.isSameOrBefore(lastWeekDay)){
        const date = dayOfWeek.seconds(0).milliseconds(0).toISOString();
        const weekDay = dayOfWeek.format('dddd');
        generatedWeek.push({weekDay, date});
        dayOfWeek.add(1, 'day');
    }
    
    return {generatedWeek, firstWeekDay};
}