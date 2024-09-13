import { faSquareXmark, faSquareCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getWeeklySummary } from '@/db/getWeeklySummary';
import { generateWeek } from '@/lib/utils';
import Day from './Day';


const Week = async ({userId}) => {
    const { week, firstWeekDay } = await generateWeek();
    const weeklySummary = await getWeeklySummary(userId, firstWeekDay) || 0;
    return ( 
        <>
        <div className='flex'>
            <div>
                Weekly Goal {weeklySummary}/7 
            </div>
            <div>
                {
                weeklySummary === 7 ? 
                  (<FontAwesomeIcon icon={faSquareCheck} />) :
                  (<FontAwesomeIcon icon={faSquareXmark}/>)
                }
            </div>
        </div>
            <ul>
                {week && week
                .map((day) => (
                    <Day key={day.date} data={day}/>
                ))}
            </ul>
        </>
     );
}
 
export default Week;