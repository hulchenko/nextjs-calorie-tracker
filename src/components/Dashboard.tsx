import { UserDB } from '@/types/User';

const Dashboard = ({user}: {user: UserDB}) => {
    return ( 
        <div className='mx-auto px-20 mt-40'>
            <div className='text-xl text-center'>
                <h1>Welcome back, {user.first_name}!</h1>
            </div>
        </div>
     );
}
 
export default Dashboard;