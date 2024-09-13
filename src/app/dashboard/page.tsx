import Week from './Week';
import { verifySession } from '@/lib/session';
import { generateGreeting } from '@/lib/utils';

const DashboardPage = async () => {
    
    const session = await verifySession();
    const { user_id, first_name } = session.user;

    const greeting = generateGreeting();

    return ( 
        <div className='mx-auto pt-60 items-center flex flex-col text-xl'>
            <h1><b>{first_name}</b>, {greeting}!</h1>
            <Week userId={user_id}/>
        </div> 
     );
}
 
export default DashboardPage;