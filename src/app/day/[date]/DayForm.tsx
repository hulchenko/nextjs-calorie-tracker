'use client';
import { Day } from '@/types/Day';
import { useToast } from '@chakra-ui/react';
import { useState } from 'react';

const DayForm = ({data}) => {
    console.log(`DATA: `, data);
    const toast = useToast();
    const {user_id, date, calorie_target, calories_consumed, goal_met} = data;
    const [day, setDay] = useState<Day>({
        user_id,
        date,
        calorie_target,
        calories_consumed,
        goal_met
    })

    const writeDayData = async (obj, methodType) => {
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

    const submitHandler = async (formData: FormData) => {
        // Additional search bar + recipies will be part of meal table, referencing the day_id + user_id
        event?.preventDefault();
        const dayObj = {
            ...day,
            // TODO add from the form
        }
        console.log(`FORM DATA: `, dayObj);
        const existingRecord = 'day_id' in data; // day_id is generated in DB

        if (existingRecord){
            await writeDayData(dayObj, 'PUT');
        } else {
            await writeDayData(dayObj, 'POST');
        }
    }

    return ( 
        <form action={submitHandler} className='mx-auto mt-20 items-center flex flex-col text-xl'>
            <button type='submit'>Save</button>
        </form>
     );
}

 
export default DayForm;