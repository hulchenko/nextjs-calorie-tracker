'use client';

import { getDayIdx, getMeals, saveAllMeals, sortMeals } from '@/lib/dayUtils';
import { Grid, useToast } from '@chakra-ui/react';
import { createContext, useContext, useEffect, useState } from 'react';
import DayDisplayInfo from './DayDisplayInfo';
import MealDisplayInfo from './MealDisplayInfo';
import MealInputForm from './MealInputForm';
import { Day } from '@/types/Day';
import { Meal } from '@/types/Meal';
import { Week } from '@/types/Week';
import { WeekContext } from '@/app/context/WeekContext';

const DayForm = ({data}) => {
    const toast = useToast();
    const initDay: Day = data.day;
    const { week, setWeek } = useContext(WeekContext);

    const [day, setDay] = useState<Day>(initDay);
    const [mealList, setMealList] = useState<Meal[]>([]);
    const [loading, setLoading] = useState(true);
    const [saveReady, setSaveReady] = useState(false);

    const dayIdx = getDayIdx(day);

    useEffect(() => {
        // get meals from DB
        const {day_id, user_id} = day;
        if (day_id && user_id){
            getMeals(day_id, user_id, setMealList, setLoading, toast);
        } else {
            setLoading(false);
        }
    }, []);

    const submitHandler = async () => {
        const dailyCalories = mealList.reduce((total, meal) => total + meal.calories, 0) || 0;
        const isDayChanged = dailyCalories !== initDay.calories_consumed;
        const isMealListChanged = mealList.length;
        
        if (isMealListChanged){ // writes to meals table

            const updatedDay = {
                ...day,
                calories_consumed: dailyCalories,
                goal_met: dailyCalories >= day.calorie_target
            }

            const updatedWeek = {
                ...week,
                daily_goals_met: {
                    ...week.daily_goals_met,
                    [dayIdx]: dailyCalories >= day.calorie_target
                }
            }
            
            setSaveReady(false);
            setDay(updatedDay);
            setWeek(updatedWeek);
            await saveAllMeals(updatedDay, mealList, updatedWeek, toast);
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
                            {sortMeals(mealList)?.map((meal) => (
                                <MealDisplayInfo key={meal.meal_id} data={{ meal, day,setDay }}/>
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