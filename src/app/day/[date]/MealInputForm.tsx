import { Input, Select, FormLabel } from '@chakra-ui/react';
import { MealContext } from './DayForm';
import { useContext, useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useRef } from 'react';

const MealInputForm = () => {
    const formRef = useRef<HTMLFormElement>(null);
    const {mealList, setMealList} = useContext(MealContext);

    const [query, setQuery] = useState('');
    const [delayedFetch, setDelayedFetch] = useState(query)
    const [meal, setMeal] = useState(newMealObj());

    const handleMealList = (e) => {
        e.preventDefault();
        const action = e.nativeEvent.submitter.value;

        if (action === 'Add'){
            setMealList(prev => [...prev, meal]);
            console.log(`MEAL INPUT MEAL LIST: `, mealList);
            setMeal(newMealObj());
            formRef.current?.reset();
        }
        // if (action === 'Remove'){ // TODO this will be by index eventually
        //     const indexToRemove = 0; 
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
        const delayHandler = setTimeout(() => setDelayedFetch(query), 2000); // delay fetch by 2 seconds after the user interracted with the input field

        return () => clearTimeout(delayHandler); // reset if the user starts typing again
    }, [query]);
    
    return (
            <div className='border'>
                <h1 className='text-blue-400'>MEAL INPUT FORM</h1>
                <form ref={formRef} onSubmit={(e) => handleMealList(e)}>
                    <FormLabel>Type</FormLabel>
                    <Select placeholder='Please Select' onChange={(e) => setMeal({...meal, meal_type: e.target.value})}>
                        <option value='breakfast'>Breakfast</option>
                        <option value='lunch'>Lunch</option>
                        <option value='dinner'>Dinner</option>
                        <option value='other'>Other</option>
                    </Select>
                    <FormLabel>Food</FormLabel>
                    <Input placeholder='e.g. 2 eggs and a toast' onChange={(e) => setQuery(e.target.value)}/>
                    <FormLabel>Total Calories</FormLabel>
                    <Input className='pointer-events-none' placeholder='0' value={meal.calories} readOnly/>
                    <button className='border m-2 p-2 mx-auto flex' type='submit' disabled={meal.items.length === 0 || meal.meal_type === ''} value='Add'>ADD</button>
                </form>
            </div>
    )
}

export default MealInputForm;

const sumMealCalories = (data) => {
    const sum = data.items.map(i => i.calories).reduce((a, b) => (a + b), 0); // will return 0 if empty
    return Math.round(sum);
}
const newMealObj = () => {
        return {
        meal_id: uuidv4(),
        meal_type: '',
        items: [],
        calories: 0
    }
}