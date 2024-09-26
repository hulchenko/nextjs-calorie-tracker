'use client';

import { generateWeek } from '@/lib/weekUtils';
import { faSquareCheck, faSquareXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useContext, useEffect, useState } from 'react';
import { WeekContext } from '../context/WeekContext';
import DashboardDay from './DashboardDay';


const DashboardWeek = ({userId}) => {
    const { week, setWeek } = useContext(WeekContext);
    const [goalCount, setGoalCount] = useState(goalReduce(week.daily_goals_met));
    const generatedWeek = generateWeek();


    function goalReduce(weeklyGoal):number{
        const result = Object.values(weeklyGoal).reduce((goals: any, goalMet: boolean) => {
            if(goalMet){
                goals++;
            }
            return goals;
        }, 0);
        return result as number;
    }


    return ( 
        <>
            <div className='flex'>
                <div>
                    Weekly Goal {goalCount}/7 
                </div>
                <div className='text-orange-600'>{ goalCount === 7 ? 
                    (<FontAwesomeIcon icon={faSquareCheck} />) :
                    (<FontAwesomeIcon icon={faSquareXmark}/>)}
                </div>
            </div>
            <ul>
                {generatedWeek
                .map((day) => (
                    <DashboardDay key={day.date} data={{userId, day, week}}/>
                ))}
            </ul>
        </>
     );
}
export default DashboardWeek;