'use client';

import { useToast, Input, Select, FormLabel } from '@chakra-ui/react';
import { useState, createContext, useEffect } from 'react';
import MealInputForm from './MealInputForm';
import MealDisplayInfo from './MealDisplayInfo';
import { Meal } from '@/types/Meal';
import { sumCalories } from '@/lib/utils';

const DayForm = async ({initDay}) => {
    console.log(`DATA: `, initDay);
    const toast = useToast();
    const [day, setDay] = useState(initDay);
    const [mealList, setMealList] = useState([]);
    const [loading, setLoading] = useState(true);

    // const cachedMealList // TODO?

    useEffect(() => {
        // get meals from DB
        const {day_id, user_id} = day;
        if (day_id && user_id){
            const getMeals = async () => {
                try {
                    const response = await fetch(`/api/db/meal?day=${day_id}&user=${user_id}`);
                    const meals = await response.json();
                    console.log(`MEALS FROM DB: `, meals);
                    if(response.ok){
                        setMealList(meals);
                        setLoading(false);
                    } else {
                        setMealList([]);
                        setLoading(false);
                    }
                } catch (error) {
                    console.error('Error getting meals', error);
                    setMealList([]);
                }
            }
            getMeals();
        } else {
            setLoading(false);
        }
    }, [day])

    const writeDayData = async (obj, methodType) => {
        const response = await fetch('/api/db/day', {
            method: methodType,
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(obj)
        })
        if (!response.ok){
            const {error} = await response.json();
            toast({title: `${error}`, status: 'error'});
        }
    }

    const writeMealData = async (day, meal, methodType) => {
        meal.day_id = day.day_id; // append day id for reference
        meal.user_id = day.user_id;
        const response = await fetch('/api/db/meal', {
            method: methodType,
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(meal)
        })
        if (!response.ok){
            const {error} = await response.json();
            toast({title: `${error}`, status: 'error'});
        }
    }

    const saveAllMeals = async (day, mealList) => {
        try {
            const mealPromises = mealList.map(meal => writeMealData(day, meal, 'POST'));
            await Promise.all(mealPromises);
            toast({ title: 'All meals saved successfully', status: 'success' });
        } catch (error) {
            toast({ title: `Error saving meals: ${error.message}`, status: 'error' });
        }
    }

    const submitHandler = async () => {
        // Additional search bar + recipies will be part of meal table, referencing the day_id + user_id
        const dailyCalories = await sumCalories(mealList);
        const isDayChanged = dailyCalories !== initDay.calories_consumed;
        const isMealListChanged = mealList.length;

        if (isDayChanged){
            const existingDay = 'day_id' in day; // day_id is generated in DB

            const newDayData = {
                ...day,
                calories_consumed: dailyCalories,
                goal_met: dailyCalories >= day.calorie_target
            };

            setDay(newDayData);
            console.log(`WRITE DAY DATA: `, newDayData);

            if (existingDay){ // writes to daily_goals table
                await writeDayData(newDayData, 'PUT');
            } else {
                await writeDayData(newDayData, 'POST');
            } 
        }
        
        if (isMealListChanged){ // writes to meals table
            console.log(`WRITE MEAL DATA: `, mealList);
            await saveAllMeals(day, mealList); 
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
                    <MealContext.Provider value={{mealList, setMealList}}>
                        {mealList && mealList.map((meal) => (
                            <MealDisplayInfo meal={meal}/>
                        ))}
                        <MealInputForm />
                    </MealContext.Provider>
                    <button onClick={submitHandler}>Save</button>
                </div>
            </div>
        );
    }
}

export const MealContext = createContext<{mealList: any, setMealList: any}>({mealList: null, setMealList: null});
export default DayForm;


const DayDisplayInfo = ({day}) => {
    return(
        <div className='border border-red-400'>
            <h1 className='text-red-300'>DAY FORM DATA: </h1>
            <br />
            <div>
                <label>DAY ID {day.day_id ?? <b>UNKNOWN</b>}</label>
            </div>
            <div>
                <label>USER ID {day.user_id}</label>
            </div>
            <div>
                <label>DATE {JSON.stringify(day.date)}</label>
            </div>
            <div>
                <label>CALORIE TARGET {day.calorie_target}</label>
            </div>
            <div>
                <label>CALORIES CONSUMED {day.calories_consumed}</label>
            </div>
            <div>
                <label>GOAL MET {day.goal_met ? 'YES' : 'NO'}</label>
            </div>
        </div>
    )
}