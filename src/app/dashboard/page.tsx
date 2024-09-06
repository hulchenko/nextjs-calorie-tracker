import { UserDB } from '@/types/User';
import { deleteSession, getSession } from '@/lib/session';
import { redirect } from 'next/navigation';

const DashboardPage = async () => {
// const DashboardPage = ({user}: {user: UserDB}) => {
    const session = await getSession();

    const signOut = async () => {
        'use server';
        deleteSession();
        redirect('/login')
    }

    return ( 
        <div className='mx-auto pt-60 items-center flex flex-col text-xl'>
                <h1>Welcome back!</h1>
                <form action={signOut}>
                    <button className='border shadow rounded p-2' type='submit'>Log out</button>
                </form>
                <div>{JSON.stringify(session, null, 2)}</div>
        </div>
     );
}
 
export default DashboardPage;