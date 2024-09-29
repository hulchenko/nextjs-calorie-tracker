'use client';

import { getWeek } from '@/db/weekActions';
import { defaultWeek, firstWeekDay } from '@/lib/weekUtils';
import { Week } from '@/types/Week';
import { createContext, useEffect, useState } from 'react';
import { useSession } from './SessionProvider';

const WeekProvider = ({children}) => {
    const { session } = useSession();
    const userId = session?.user_id as string;
    const initWeek = defaultWeek(userId);

    const [week, setWeek] = useState<Week | null>(initWeek);
    

    useEffect(() => {      
        if(session && userId){
            const fetchWeek = async () => {
                const weekDB = await getWeek(userId, firstWeekDay);
                if(weekDB){
                    setWeek(weekDB);
                }
            }
            fetchWeek();
        }
    }, [session, userId]);

    useEffect(() => {
        console.log(`GLOBAL WEEK: `, week);
    }, [week]);

    return(
        <WeekContext.Provider value={{week, setWeek}}>
            {children}
        </WeekContext.Provider>
    )
}

export const WeekContext = createContext<{week, setWeek}>({week: null, setWeek: null});

export default WeekProvider;