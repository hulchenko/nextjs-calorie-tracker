'use client';

import { getWeek } from '@/db/weekActions';
import { defaultWeek, firstWeekDay } from '@/lib/weekUtils';
import { Week } from '@/types/Week';
import { createContext, useEffect, useState } from 'react';

const WeekProvider = ({children, session}) => {
    const userId = session?.user?.user_id || '';
    const initWeek = defaultWeek(userId);

    const [week, setWeek] = useState<Week | any>(initWeek);
    

    useEffect(() => {
        if(session){
            const fetchWeek = async () => {
                const weekDB = await getWeek(userId, firstWeekDay);
                console.log(`FETCHING WEEK IN CONTEXT: `, weekDB);
                if(weekDB){
                    setWeek(weekDB);
                }
            }
            fetchWeek();
        }
    }, []);

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