import moment from 'moment';
import Link from 'next/link';

const DashboardDay = ({data}) => {
    const dateURL = data.day.date;
    const weekDay = data.day.weekDay;
    const userId = data.userId;
    const displayDate = moment(data.day.date).format('MMM Do');
    return ( 
        <li>
            <Link href={{ pathname: `/day/${dateURL}`, query: {userId} }} className='flex border my-3 p-2 shadow-md'>
                <div>{weekDay}</div>
                <div>{displayDate}</div>
            </Link>
        </li>
     );
}
 
export default DashboardDay;