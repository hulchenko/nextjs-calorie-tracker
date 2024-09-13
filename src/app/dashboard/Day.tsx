import moment from 'moment';

const Day = ({data}) => {
    const date = moment(data.date).format('MMM Do');
    return ( 
        <li className='border my-3 p-2 shadow-sm'>
            <div className='flex'>
                <div>{data.weekday}</div>
                <div>{date}</div>
            </div>
        </li>
     );
}
 
export default Day;