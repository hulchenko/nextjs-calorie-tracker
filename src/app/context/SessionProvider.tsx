// Context shares data state with entire app

'use client';
import { createContext, useContext, useMemo, useState, useEffect } from 'react';
import { Session } from '@/types/Session';

const SessionContext = createContext<{session: Session | null, setSession: (session: Session | null) => void}>({session: null, setSession: () => {}}); // define passing value

export const SessionProvider = ({children}) => {
    const [session, setSession] = useState<Session | null>(null);
    
    const getSession = async () => {
    try {
        const response = await fetch('/api/auth/session');
        const session = await response.json();
        if(response.ok){
            setSession(session);
        }
    } catch (error) {
        console.error('Error getting session', error);
        setSession(null);   
        }
    };

    useEffect(() => {
        getSession();
    }, []);

    return ( 
        <SessionContext.Provider value={{session, setSession}}>
            {children}
        </SessionContext.Provider>
     );
}
 

export const useSession = () => useContext(SessionContext); // expose passing value