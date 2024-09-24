'use client';

import { getWeek } from '@/db/weekActions';
import { generateWeek, defaultWeek } from '@/lib/weekUtils';
import { faSquareCheck, faSquareXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import DashboardDay from './DashboardDay';
import { useEffect, useState } from 'react';


const DashboardWeek = ({userId}) => {
    const [week, setWeek] = useState(defaultWeek(userId));
    const [goal, setGoal] = useState(0);
    const { generatedWeek, firstWeekDay } = generateWeek();

    useEffect(() => {
        const getWeekDB = async () => {
            const weekDB = await getWeek(userId, firstWeekDay);
            if(weekDB){
                setWeek(weekDB);
                setGoal(weekDB.daily_goals_met)
            }
        };
        getWeekDB();
    },[]);

    return ( 
        <>
            <WeeklyGoal goal={goal} />
            <ul>
                {generatedWeek
                .map((day) => (
                    <DashboardDay key={day.date} data={{userId, day, week}}/>
                ))}
            </ul>
        </>
     );
}

const WeeklyGoal = async ({goal}) => {
    return (
        <div className='flex'>
            <div>
                Weekly Goal {goal}/7 
            </div>
            <div className='text-orange-600'>{ goal === 7 ? 
                  (<FontAwesomeIcon icon={faSquareCheck} />) :
                  (<FontAwesomeIcon icon={faSquareXmark}/>)}
            </div>
        </div>
    )
}
 
export default DashboardWeek;