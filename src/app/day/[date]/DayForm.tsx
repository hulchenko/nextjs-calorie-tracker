'use client';

import { useToast, Input, Select, FormLabel } from '@chakra-ui/react';
import { useState, createContext, useEffect } from 'react';
import MealInputForm from './MealInputForm';
import MealDisplayInfo from './MealDisplayInfo';
import { Meal } from '@/types/Meal';

const DayForm = ({day}) => {
    console.log(`DATA: `, day);
    const toast = useToast();
    const [mealList, setMealList] = useState<any>([]);
    const [displayMealList, setDisplayMealList] = useState([<MealDisplayInfo />]);
    
    // const {user_id, date, calorie_target, calories_consumed, goal_met} = day;

    const writeDBData = async (obj, methodType) => {
        const response = await fetch('/api/db/day', {
            method: methodType,
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(obj)
        })
        if (response.ok){
            toast({title: 'Saved', status: 'success'});
        } else {
            const {error} = await response.json();
            toast({title: `${error}`, status: 'error'});
        }
    }

    const addMeal = () => {
        if(displayMealList.length <= 4){
            setDisplayMealList(displayMealList.concat(<MealDisplayInfo />))
            setMealList([...mealList, {new: 'value'}]);
        }
    }

    const removeMeal = () => {
        if(displayMealList.length > 1){
            setDisplayMealList(displayMealList.slice(0, -1))
        }
    }

    const submitHandler = async () => {
        // Additional search bar + recipies will be part of meal table, referencing the day_id + user_id
        const sumDayCalories = Math.round(mealList.calories); //TODO this should be mealList.items.map()
        const existingRecord = 'day_id' in day; // day_id is generated in DB
        const dayObj = {
            ...day,
            calories_consumed: sumDayCalories,
            goal_met: sumDayCalories >= day.calorie_target
            // TODO add from the form
        }
        console.log(`FORM DATA: `, dayObj);
        if (existingRecord){ // writes to day table
            await writeDBData(dayObj, 'PUT');
        } else {
            await writeDBData(dayObj, 'POST');
        }
        // TODO write to meal table
    }

    useEffect(() => {
        console.log(`CURRENT MEAL LIST (SHOULD BE ARRAY OF MEALS): `, mealList);
        // this should keep track of local meal list and fetched DB (if exists)
    }, [mealList])

    return ( 
            <div className='mx-auto mt-20 items-center flex flex-col text-xl'>
                <MealContext.Provider value={{mealList, setMealList}}>
                    {displayMealList}
                    <MealInputForm />
                </MealContext.Provider>
                <div className='flex w-40 justify-between'>
                    {/* <button onClick={addMeal} disabled={displayMealList.length >= 4}>ADD</button>
                    <button onClick={removeMeal} disabled={displayMealList.length <= 1}>REMOVE</button> */}
                </div>
                <button onClick={submitHandler}>Save</button>
            </div>
     );
}

export const MealContext = createContext<{mealList: any, setMealList: any}>({mealList: null, setMealList: null});
export default DayForm;