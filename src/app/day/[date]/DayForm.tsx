'use client';

import { useUser } from '@/app/context/UserContext';
import { useWeek } from '@/app/context/WeekContext';
import { getDayIdx, getMeals, saveAllMeals, sortMeals } from '@/lib/dayUtils';
import { Day } from '@/types/Day';
import { Meal } from '@/types/Meal';
import { Week } from '@/types/Week';
import { Grid, Spinner, useToast } from '@chakra-ui/react';
import { createContext, useEffect, useState } from 'react';
import DayDisplayInfo from './DayDisplayInfo';
import MealDisplayInfo from './MealDisplayInfo';
import MealInputForm from './MealInputForm';

const DayForm = ({initDay}) => {
    const toast = useToast();
    const { week, setWeek } = useWeek();
    const { user } = useUser();

    const [day, setDay] = useState<Day>(initDay);
    const [mealList, setMealList] = useState<Meal[]>([]);
    const [loading, setLoading] = useState(true);
    const [saveReady, setSaveReady] = useState(false);

    const dayIdx = getDayIdx(day);
    const dailyTarget = parseInt(user?.target as string);

    useEffect(() => {
        getMeals(day, setMealList, setLoading, toast);
    }, []);

    const submitHandler = async () => {
        const dailyCalories = mealList.reduce((total, meal) => total + meal.calories, 0) || 0;
        const isDayChanged = dailyCalories !== initDay.calories_consumed;
        const isMealListChanged = mealList.length;
        
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
            
            setSaveReady(false);
            setDay(updatedDay);
            setWeek(updatedWeek);
            await saveAllMeals(updatedDay, mealList, updatedWeek, toast);
        }

        if(!isDayChanged && !isMealListChanged){
            toast({ title: 'Nothing to update', status: 'info' });
        }
    }
    
    if(loading) {
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