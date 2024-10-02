'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { useSession } from './SessionProvider';
import { User } from '@/types/User';

export const UserProvider = ({children}) => {
    const { session } = useSession();
    const initUser = session?.user;

    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const getUser = async () => {
            const response = await fetch(`/api/db/user?email=${initUser?.email}`);
            const data = await response.json();
            setUser(data);
        }

        if(initUser){
            getUser()
        };        
    }, [initUser]);

    return (
        <UserContext.Provider value={{user}}>
            {children}
        </UserContext.Provider>
    )
};

const UserContext = createContext<{user: User | null}>({user: null}); // define passing value

export const useUser = () => useContext(UserContext);