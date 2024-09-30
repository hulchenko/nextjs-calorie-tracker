import { Card, CardHeader, CardBody, Button, Text } from '@chakra-ui/react';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import moment from 'moment';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const DashboardDayCard = ({data}) => {
    const { week, user_id, index } = data;
    const { date, weekDay } = data.day;
    const [isGoalMet, setIsGoalMet] = useState(false);
    const displayDate = moment(date).format('MMM Do');

    useEffect(() => {
        const goal = week?.daily_goals_met[index] || false;
        setIsGoalMet(goal);
    }, [week]);
    
    return ( 
        <li>
            <Link href={{ pathname: `/day/${date}`, query: { user_id } }}>
                <Card h={32} className='hover:shadow-teal-700 hover:shadow-md w-80 m-4 h-36'  bg={isGoalMet ? 'teal.600' : 'white'}>
                    <CardBody className='flex justify-end self-end text-xl' textColor={isGoalMet ? 'white' : 'gray.500'}>{displayDate}</CardBody>
                    <CardHeader className='flex text-4xl font-bold' textColor={isGoalMet ? 'white' : 'teal.600'} p={0} mb={6} ml={4}>{weekDay}</CardHeader>
                </Card>
            </Link>
        </li>
     );
}
 
export default DashboardDayCard;