// Context shares data state with entire app

'use client';

import { createContext, useContext, useState, useEffect, useRef } from 'react';
import { Session } from '@/types/Session';
import { useRouter } from 'next/navigation';

const SessionContext = createContext<{session: Session | null, setSession: (session: Session | null) => void}>({
    session: null,
    setSession: () => {}
}); // define passing value

export const SessionProvider = ({children, initialSession}) => {
    const [session, setSession] = useState<Session | null>(initialSession);

    const authenticated = useRef(false); // keep track of the user's authenticated state. Its value persists between renders, unlike useState()
    const router = useRouter();
    
    const getSession = async () => {
    try {
        const response = await fetch('/api/auth/session');
        const session = await response.json();
        if(response.ok){
            setSession(session);
            authenticated.current = true;
        } else {
            setSession(null);
            handleAuthenticated();
        }
    } catch (error) {
        console.error('Error getting session', error);
        setSession(null);   
    }};

    const handleAuthenticated = () => {
        if(authenticated.current){ // kick out authenticated user to /login on expired session
            router.push('/login')
        }
    }

    useEffect(() => {
        // initiate session provider
        getSession();

        // set periodic interval to sync session state
        const sessionCheck = setInterval(() => getSession(), 5 * 60 * 1000); // every 5 minutes
        return () => clearInterval(sessionCheck); // clean up interval
    }, []);

    return ( 
        <SessionContext.Provider value={{session, setSession}}>
            {children}
        </SessionContext.Provider>
     );
}
 

export const useSession = () => useContext(SessionContext); // expose passing value