'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWeightScale } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/navigation';
import { useToast } from '@chakra-ui/react';
import Link from 'next/link';
import { useSession } from '@/app/context/SessionProvider';

const Navigation = () => {
  const toast = useToast();
  const router = useRouter();
  const { session, setSession } = useSession();

    const authStateHandler = async () => {
      if (session){
        try {
          const response = await fetch('/api/auth/logout', {
            method: 'POST'
          });
          if (response.ok){
            setSession(null);
            router.push('/login');
            toast({title: 'Sign out', status: 'info'});
          } else {
            const {error} = await response.json();
            toast({title: `${error}`, status: 'error'});
          }
        } catch (error) {
          console.error('Error occured during logout:', error);
        }
      } else {
        router.push('/login');
      }
    }

    return ( 
        <>
            <div className="flex justify-between items-center bg-teal-800 p-4 text-white px-24">
                <Link href={'/'} className='flex items-center cursor-pointer text-2xl'>
                  <FontAwesomeIcon className='h-10 pr-4' icon={faWeightScale} />
                  <h3>Calorie Tracker</h3>
                </Link>
              <ul className='flex justify-end w-80 space-x-4 text-lg'>
                {session && (
                  <>
                    <li className='hover:text-teal-200'>
                      <Link href={'/dashboard'}>Dashboard</Link>
                    </li>
                    <li className='hover:text-teal-200'>
                      <Link href={'/profile'}>Profile</Link>
                    </li>
                  </>
                )}
                <li className='hover:text-teal-200'>
                  <Link href={'/about'}>About</Link>
                </li>
                <li className='hover:text-teal-200'>
                  <button onClick={authStateHandler}>{session ? 'Sign Out' : 'Sign In'}</button>
                </li>
              </ul>
            </div>
        </>
     );
}
 
export default Navigation;