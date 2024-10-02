'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { useSession } from './SessionProvider';
import { User } from '@/types/User';

export const UserProvider = ({children}) => {
    const { session } = useSession();

    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const sessionUser = session?.user;
        const getUser = async () => {
            const response = await fetch(`/api/db/user?email=${sessionUser?.email}`);
            const data = await response.json();
            setUser(data);
        }

        if(session && sessionUser){
            getUser()
        };        
    }, [session]);

    useEffect(() => console.log(`User got updated: `, user), [user]);

    return (
        <UserContext.Provider value={{user, setUser}}>
            {children}
        </UserContext.Provider>
    )
};

const UserContext = createContext<{user: User | null, setUser: (user: User | null) => void}>({user: null, setUser: () => {}}); // define passing value

export const useUser = () => useContext(UserContext);