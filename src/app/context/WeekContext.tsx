'use client';

import { getWeek } from '@/db/weekActions';
import { defaultWeek, firstWeekDay } from '@/lib/weekUtils';
import { Week } from '@/types/Week';
import { createContext, useContext, useEffect, useState } from 'react';
import { useSession } from './SessionProvider';

export const WeekProvider = ({children}) => {
    const { session } = useSession();
    const userId = session?.user?.user_id as string;
    const initWeek = defaultWeek(userId);

    const [week, setWeek] = useState<Week | null>(initWeek);
    

    useEffect(() => {      
        const fetchWeek = async () => {
            const weekDB = await getWeek(userId, firstWeekDay);
            if(weekDB){
                setWeek(weekDB);
            }
        }
        if(userId){
            fetchWeek()
        };
    }, [userId]);

    return(
        <WeekContext.Provider value={{week, setWeek}}>
            {children}
        </WeekContext.Provider>
    )
}

const WeekContext = createContext<{week: Week | null, setWeek: (week: Week | null) => void}>({
    week: null,
    setWeek: () => {}
}); // define passing value

export const useWeek = () => useContext(WeekContext);