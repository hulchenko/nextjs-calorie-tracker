import { faSquareXmark, faSquareCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getWeek } from '@/db/getWeek';
import { generateWeek } from '@/lib/utils';
import Day from './Day';


const Week = async ({userId}) => {
    const { generatedWeek, firstWeekDay } = await generateWeek();
    const weekDB = await getWeek(userId, firstWeekDay);
    const goal = weekDB?.daily_goals_met || 0;
    return ( 
        <>
        <div className='flex'>
            <div>
                Weekly Goal {goal}/7 
            </div>
            <div>
                {
                goal === 7 ? 
                  (<FontAwesomeIcon icon={faSquareCheck} />) :
                  (<FontAwesomeIcon icon={faSquareXmark}/>)
                }
            </div>
        </div>
            <ul>
                {generatedWeek
                .map((day) => (
                    <Day key={day.date} data={{day, userId}}/>
                ))}
            </ul>
        </>
     );
}
 
export default Week;