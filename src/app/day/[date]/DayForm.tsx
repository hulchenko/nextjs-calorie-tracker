'use client';

import { sumCalories } from '@/lib/utils';
import { Meal } from '@/types/Meal';
import { Grid, useToast } from '@chakra-ui/react';
import { createContext, useEffect, useState } from 'react';
import MealDisplayInfo from './MealDisplayInfo';
import MealInputForm from './MealInputForm';

const DayForm = async ({initDay}) => {
    const toast = useToast();
    const [day, setDay] = useState(initDay);
    const [mealList, setMealList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [saveReady, setSaveReady] = useState(false);


    useEffect(() => {
        // get meals from DB
        const {day_id, user_id} = day;
        if (day_id && user_id){
            const getMeals = async () => {
                try {
                    const response = await fetch(`/api/db/meal?day_id=${day_id}&user=${user_id}`);
                    if (!response.ok){
                        const {error} = await response.json();
                        throw error;
                    }
                    const meals = await response.json();
                    setMealList(meals);
                    setLoading(false);
                } catch (error) {
                    toast({title: `${error}`, status: 'error'});
                    setMealList([]);
                    setLoading(false);
                }
            };
            getMeals();
        } else {
            setLoading(false);
        }
    }, [])

    const writeDayData = async (obj, methodType) => {
        try {
            const response = await fetch('/api/db/day', {
                method: methodType,
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(obj)
            })
            if (!response.ok){
                const {error} = await response.json();
                throw error;
            }
        } catch (error) {
            toast({ title: `${error}`, status: 'error' });
        }
    }

    const writeMealData = async (day, meal, methodType) => {
        try {
            meal.day_id = day.day_id; // append day id for reference
            meal.user_id = day.user_id;
            const response = await fetch('/api/db/meal', {
                method: methodType,
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(meal)
            })
            if (!response.ok){
                const {error} = await response.json();
                throw error;
            }
            return response;
        } catch (error) {
            throw error;
        }
    }

    const saveAllMeals = async (day, mealList) => {
        try {
            const mealPromises = mealList.map(meal => {
                const existingMeal = 'id' in meal;
                if(!existingMeal){
                    return writeMealData(day, meal, 'POST')
                }   
            });
            await Promise.all(mealPromises);
            toast({ title: 'All meals saved successfully', status: 'success' });
        } catch (error) {
            toast({ title: `${error}`, status: 'error' });
        }
    }

    const submitHandler = async () => {
        const dailyCalories = await sumCalories(mealList);
        const isDayChanged = dailyCalories !== initDay.calories_consumed;
        const isMealListChanged = mealList.length;
        
        if (isMealListChanged){ // writes to meals table
            console.log(`WRITE MEAL DATA: `, mealList);
            await saveAllMeals(day, mealList);
            setSaveReady(false);
        }

        if (isDayChanged){
            const existingDay = 'id' in day; // id is generated in DB

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
            setSaveReady(false);
        }

        if(!isDayChanged && !isMealListChanged){
            toast({ title: 'Nothing to update', status: 'info' });
        }
    }

const sortMeals = (list: Meal[]) => {
        const sortedMeals = ['Breakfast', 'Brunch', 'Lunch', 'Supper', 'Dinner', 'Midnight Snack', 'Other'];

        const newList = [...list];
        newList.sort((prev, curr) => {
            const prevIdx = sortedMeals.indexOf(prev.meal_type);
            const currIdx = sortedMeals.indexOf(curr.meal_type);
            if(prevIdx > currIdx){
                return 1
            } else {
                return -1
            }
        });
        return newList;
    }

    if(!loading){
        return ( 
            <div>
                <DayDisplayInfo day={day}/>
                <div className='mx-auto mt-20 items-center flex flex-col text-xl'>
                    <MealContext.Provider value={{mealList, setMealList, setSaveReady}}>
                        <Grid templateColumns='repeat(3, 1fr)' gap={4}>
                            {sortMeals(mealList).map((meal) => (
                                <MealDisplayInfo meal={meal}/>
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