'use client';

import { useUser } from '@/app/context/UserContext';
import { useWeek } from '@/app/context/WeekContext';
import { getDay } from '@/db/dayActions';
import { getDayIdx, getDefaultDay, getMeals, saveAllMeals, sortMeals } from '@/lib/dayUtils';
import { Day } from '@/types/Day';
import { Meal } from '@/types/Meal';
import { Week } from '@/types/Week';
import { Grid, Spinner, useToast } from '@chakra-ui/react';
import { createContext, useEffect, useState } from 'react';
import MealDisplayInfo from './MealDisplayInfo';
import MealInputForm from './MealInputForm';
import DayDisplayInfo from './DayDisplayInfo';

const DayForm = ({date}) => {
    const toast = useToast();
    const { week, setWeek } = useWeek();
    const { user } = useUser();

    const [day, setDay] = useState<Day | null>(null);
    const [mealList, setMealList] = useState<Meal[] | null>(null);
    const [loading, setLoading] = useState({mealList: true, day: true});
    const [saveReady, setSaveReady] = useState(false);

    const dayIdx = getDayIdx(date);
    const dailyTarget = parseInt(user?.target as string);

    useEffect(() => {
        const userId = user?.user_id as string;
        const fetchDay = async () => {
            const dayDB: Day | null = await getDay(userId, date);
            if(dayDB){
                setDay(dayDB)
            } else {
                const defaultDay: Day = getDefaultDay(userId, date);
                setDay(defaultDay)
            };
            setLoading(prev => ({
                ...prev,
                day: false
            }));
        };
        if(userId){
            fetchDay();
        }
    }, [user]);

    useEffect(() => {
        if(day){
            getMeals(day, setMealList, setLoading, toast);
        }
    }, [day]);

    const submitHandler = async () => {
        const dailyCalories = mealList?.reduce((total, meal) => total + meal.calories, 0) || 0;
        const isDayChanged = dailyCalories !== day?.calories_consumed;
        const isMealListChanged = mealList?.length;
        
        if (isMealListChanged){ // writes to meals table

            const updatedDay = {
                ...day,
                calories_consumed: dailyCalories,
                goal_met: dailyCalories >= dailyTarget
            } as Day;

            const updatedWeek = {
                ...week,
                daily_goals_met: {
                    ...week?.daily_goals_met,
                    [dayIdx]: dailyCalories >= dailyTarget
                }
            } as Week;
            
            await saveAllMeals(updatedDay, mealList, updatedWeek, toast);
            setSaveReady(false);
            setDay(updatedDay);
            setWeek(updatedWeek);
        }

        if(!isDayChanged && !isMealListChanged){
            toast({ title: 'Nothing to update', status: 'info' });
        }
    }
    
    if(loading.mealList || loading.day) {
        return(
            <div className='flex justify-center mt-96'>
                <Spinner thickness='4px' speed='1s' color='teal.600' size='xl'/>
            </div>
        )
    } 

    
    return ( 
        <div>
            <DayDisplayInfo day={day} dailyTarget={dailyTarget}/>
            <div className='mx-auto mt-20 items-center flex flex-col text-xl'>
                <MealContext.Provider value={{mealList, setMealList, setSaveReady}}>
                    <Grid templateColumns='repeat(3, 1fr)' gap={4}>
                        {sortMeals(mealList)?.map((meal) => (
                            <MealDisplayInfo key={meal.meal_id} data={{ meal, day, setDay }}/>
                        ))}
                    </Grid>
                    <MealInputForm />
                </MealContext.Provider>
                {saveReady && (<button className='fixed bottom-40 right-24 bg-teal-700 hover:bg-teal-600  text-white py-4 p-6 mt-2 rounded' onClick={submitHandler}>Save</button>)}
            </div>
        </div>
    );
}

export const MealContext = createContext<{mealList: any, setMealList: any, setSaveReady: any}>({mealList: null, setMealList: null, setSaveReady: null});
export default DayForm;