import { Input, Select, FormLabel } from '@chakra-ui/react';
import { MealContext } from './DayForm';
import { useContext, useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useRef } from 'react';

const blankMeal = {
    meal_id: uuidv4(),
    type: '',
    items: [],
    calories: 0
}

const MealInputForm = () => {
    const formRef = useRef<HTMLFormElement>(null);
    const {mealList, setMealList} = useContext(MealContext);

    const [query, setQuery] = useState('');
    const [delayedFetch, setDelayedFetch] = useState(query)
    const [meal, setMeal] = useState(blankMeal);

    const handleMealList = (e) => {
        e.preventDefault();
        const action = e.nativeEvent.submitter.value;
        console.log(`DIFFERENCE? `, action);
        if (action === 'Add'){
            setMealList(prev => [...prev, meal]);
            setMeal(blankMeal);
            console.log(`MEAL INPUT MEAL LIST: `, mealList);
            formRef.current?.reset();
        }
        // if (action === 'Remove'){
        //     const indexToRemove = 0; // TODO this will be by index eventually
        //     setMealList(prev => prev.filter((meal, index) => index !== indexToRemove));
        // }
    }

    useEffect(() => {
        // search and get nutritions
        if(query.length >= 3 && delayedFetch){
            const getFoodData = async () => {
                const response = await fetch(`/api/other/food?query=${query}`);
                const data = await response.json();
                const calories = sumMealCalories(data);
                console.log(`FETCHED FOOD DATA: `, data)
                setMeal((prevState) => ({...prevState, items: data.items, calories}));
            };
            getFoodData();
        }
    }, [delayedFetch])

    useEffect(() => {
        // delay fetch by 2 seconds after the user interracted with the input field
        const delayHandler = setTimeout(() => {
            setDelayedFetch(query)
        }, 2000); 

        return () => {
            clearTimeout(delayHandler); // reset if the user starts typing again
        }
    }, [query]);
    
    return (
            <div className='border'>
                <h1 className='text-blue-400'>MEAL INPUT FORM</h1>
                <form ref={formRef} onSubmit={(e) => handleMealList(e)}>
                <FormLabel>Type</FormLabel>
                <Select placeholder='Please Select' onChange={(e) => setMeal({...meal, type: e.target.value})}>
                    <option value='breakfast'>Breakfast</option>
                    <option value='lunch'>Lunch</option>
                    <option value='dinner'>Dinner</option>
                    <option value='other'>Other</option>
                </Select>
                <FormLabel>Food</FormLabel>
                <Input placeholder='e.g. 2 eggs and a toast' onChange={(e) => setQuery(e.target.value)}/>
                <FormLabel>Total Calories</FormLabel>
                <Input placeholder='0' value={meal.calories} isDisabled/>
                    <div className='flex w-40 justify-between'>
                        <button type='submit' disabled={meal.items.length === 0 || meal.type === ''} value='Add'>ADD</button>
                        {/* <button type='submit' value='Remove'>REMOVE</button> */}
                    </div>
                </form>
            </div>
    )
}

export default MealInputForm;

const sumMealCalories = (data) => {
    const sum = data.items.map(i => i.calories).reduce((a, b) => (a + b), 0); // will return 0 if empty
    return Math.round(sum);
}