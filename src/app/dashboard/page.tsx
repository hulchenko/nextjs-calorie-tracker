import { verifySession } from '@/lib/session';

const DashboardPage = async () => {
// const DashboardPage = ({user}: {user: UserDB}) => {
    const session = await verifySession();
    return ( 
        <div className='mx-auto pt-60 items-center flex flex-col text-xl'>
                <h1>Welcome back!</h1>
                <div>{JSON.stringify(session, null, 2)}</div>
        </div>
     );
}
 
export default DashboardPage;