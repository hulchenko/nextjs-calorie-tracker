import { getDay } from '@/db/getDay';
import DayForm from './DayForm';
import { Day } from '@/types/Day';
import DayDisplayInfo from './DayDisplayInfo';

const DayPage = async (context) => {
    const date = decodeURIComponent(context.params.date);
    const userId = context.searchParams.userId;
    console.log(date, userId);

    const day: Day = await getDay(userId, date) || defaultDay(userId, date);

    return ( 
        <>
            <DayDisplayInfo day={day} />
            <DayForm day={day}/>
        </>
     );
}
 
export default DayPage;

const defaultDay = (userId: string, date: string) => {
    return {
            user_id: userId,
            date,
            calorie_target: 2400, // to pull from settings later
            calories_consumed: 0,
            goal_met: false
        };
}