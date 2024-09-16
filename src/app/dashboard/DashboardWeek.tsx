import { faSquareXmark, faSquareCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getWeek } from '@/db/getWeek';
import { generateWeek } from '@/lib/utils';
import DashboardDay from './DashboardDay';


const DashboardWeek = async ({userId}) => {
    const { generatedWeek, firstWeekDay } = await generateWeek();
    const weekDB = await getWeek(userId, firstWeekDay);
    const goal = weekDB?.daily_goals_met || 0;
    return ( 
        <>
            <WeeklyGoal goal={goal} />
            <ul>
                {generatedWeek
                .map((day) => (
                    <DashboardDay key={day.date} data={{day, userId}}/>
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