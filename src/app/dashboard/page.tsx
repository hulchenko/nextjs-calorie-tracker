import { verifySession } from '@/lib/session';
import { generateGreeting } from '@/lib/utils';
import DashboardWeek from './DashboardWeek';

const DashboardPage = async () => {
    
    const session = await verifySession();
    const { user_id, name } = session.user;
    const greeting = generateGreeting();

    return <DashboardWeek user={{user_id, name}} greeting={greeting}/>
}
 
export default DashboardPage;