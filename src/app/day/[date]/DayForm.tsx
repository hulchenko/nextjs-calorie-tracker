'use client';

import { getMeals, saveAllMeals, sortMeals } from '@/lib/dayUtils';
import { sumCalories } from '@/lib/utils';
import { Grid, useToast } from '@chakra-ui/react';
import { createContext, useEffect, useState } from 'react';
import DayDisplayInfo from './DayDisplayInfo';
import MealDisplayInfo from './MealDisplayInfo';
import MealInputForm from './MealInputForm';

const DayForm = async ({data}) => {
    const toast = useToast();
    const initDay = data.day;
    const initWeek = JSON.parse(data.week);

    const [day, setDay] = useState(initDay);
    const [week, setWeek] = useState(initWeek);
    const [mealList, setMealList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [saveReady, setSaveReady] = useState(false);


    useEffect(() => {
        // get meals from DB
        const {day_id, user_id} = day;
        if (day_id && user_id){
            getMeals(day_id, user_id, setMealList, setLoading, toast);
        } else {
            setLoading(false);
        }
    }, [])

    const submitHandler = async () => {
        const dailyCalories = await sumCalories(mealList);
        const isDayChanged = dailyCalories !== initDay.calories_consumed;
        const isMealListChanged = mealList.length;
        
        if (isMealListChanged){ // writes to meals table
            await saveAllMeals(day, mealList, week, toast);
            setSaveReady(false);
        }


        if(!isDayChanged && !isMealListChanged){
            toast({ title: 'Nothing to update', status: 'info' });
        }
    }

    if(!loading){
        return ( 
            <div>
                <DayDisplayInfo day={day}/>
                <div className='mx-auto mt-20 items-center flex flex-col text-xl'>
                    <MealContext.Provider value={{mealList, setMealList, setSaveReady}}>
                        <Grid templateColumns='repeat(3, 1fr)' gap={4}>
                            {sortMeals(mealList).map((meal) => (
                                <MealDisplayInfo data={{meal, day, week}}/>
                            ))}
                        </Grid>
                        <MealInputForm />
                    </MealContext.Provider>
                    {saveReady && (<button className='fixed bottom-40 right-24 bg-teal-700 hover:bg-teal-600  text-white py-4 p-6 mt-2 rounded' onClick={submitHandler}>Save</button>)}
                </div>
            </div>
        );
    }
}

export const MealContext = createContext<{mealList: any, setMealList: any, setSaveReady: any}>({mealList: null, setMealList: null, setSaveReady: null});
export default DayForm;


