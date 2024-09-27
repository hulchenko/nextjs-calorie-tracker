import { Day } from '@/types/Day';
import { Meal } from '@/types/Meal';
import { Week } from '@/types/Week';
import { v4 as uuidv4 } from 'uuid';

export const defaultMeal = (): Meal => {
        return {
            user_id: '',
            day_id: '',
            meal_id: uuidv4(),
            meal_type: '',
            meal_description: '',
            items: [],
            calories: 0
    }
}

export const removeMeal = async (meal: Meal, day: Day, week: Week, mealList: Meal[], toast): Promise<Meal[] | any> => {
    try {
        const response = await fetch('/api/db/meal', { 
            method: 'DELETE',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({meal, day, week})
        });
        if (!response.ok){
            const { error } = await response.json();
            throw error;
        }
        const { message } = await response.json();
        const isLocalUpdate = message.includes('local');

        toast({ title: 'Meal removed', status: 'info'});
        
        return isLocalUpdate;
    } catch (error) {
        toast({ title: `${error}`, status: 'error' });
    }
}


export const getFoodData = async (query, setMeal, setLoading, toast) => {
    setLoading(true);
    try {
        const response = await fetch(`/api/other/food?query=${query}`);
        if (!response.ok){
            const {error} = await response.json();
            throw error;
        }
        const data = await response.json();
        const calories = sumMealCalories(data);
        setMeal(prevState => ({...prevState, items: data.items, calories}));
        setLoading(false);
    } catch (error) {
        toast({title: `${error}`, status: 'error'});
        setLoading(false);
    }
};


const sumMealCalories = (data) => {
    const sum = data.items.map(i => i.calories).reduce((a, b) => (a + b), 0); // will return 0 if empty
    return Math.round(sum);
}