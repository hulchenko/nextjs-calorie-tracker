import { getDay } from '@/db/getDay';
import DayForm from './DayForm';
import { Day } from '@/types/Day';
import { revalidatePath } from 'next/cache';
import {v4 as uuidv4} from 'uuid';

const DayPage = async (context) => {
    revalidatePath('/'); // somehow without this getDay() returns undefined
    const date = decodeURIComponent(context.params.date);
    const userId = context.searchParams.userId;
    
    const day: Day = await getDay(userId, date) || defaultDay(userId, date);

    return (
        <DayForm initDay={day}/>
     );
}
 
export default DayPage;

const defaultDay = (userId: string, date: string) => {
    return {
            day_id: uuidv4(),
            user_id: userId,
            date,
            calorie_target: 2400, // to pull from settings later
            calories_consumed: 0,
            goal_met: false
        };
}