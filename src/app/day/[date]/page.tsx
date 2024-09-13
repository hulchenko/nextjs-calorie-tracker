import { getDay } from '@/db/getDay';

const DayPage = async (context) => {
    const date = decodeURIComponent(context.params.date);
    const userId = context.searchParams.userId;
    console.log(date, userId);

    let day = defaultDay(userId, date);
    const dayDB = await getDay(userId, date);

    if (dayDB){
        day = dayDB;
    }

    return ( 
        <h1>{JSON.stringify(day)}</h1>
     );
}
 
export default DayPage;

const defaultDay = (userId, date) => {
    return {
            user_id: userId,
            date,
            calorie_target: 2400, // to pull from settings later
            calories_consumed: 0,
            goal_met: false
        };
}