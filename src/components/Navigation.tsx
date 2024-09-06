import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWeightScale } from '@fortawesome/free-solid-svg-icons';
import { deleteSession } from '@/lib/session';
import { redirect } from 'next/navigation';
import Link from 'next/link';

const Navigation = () => {

    const signOut = async () => {
        'use server';
        deleteSession();
        redirect('/login')
    }

    return ( 
        <>
            <div className="flex items-center bg-teal-800 p-4">
              <FontAwesomeIcon className='h-10 text-white px-4' icon={faWeightScale} />
              <h3 className='text-2xl text-white flex-1'>Calorie Tracker</h3>
              <ul className='flex justify-around w-80'>
                <li><Link href={'/dashboard'}>Dashboard</Link></li>
                <li><Link href={'/profile'}>Profile</Link></li>
                <li><Link href={'/about'}>About</Link></li>
                <li>
                  <form action={signOut}>
                    <button>Sign out</button>
                  </form>
                </li>
              </ul>
            </div>
        </>
     );
}
 
export default Navigation;