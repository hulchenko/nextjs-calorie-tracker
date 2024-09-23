import { Meal } from '@/types/Meal';
import { v4 as uuidv4 } from 'uuid';

export const purgeMeal = async (meal: Meal, mealList: Meal[], setMealList, toast) => {
    const existingMeal = 'id' in meal;

    if(existingMeal){
        try {
            const response = await fetch('/api/db/meal', { 
                method: 'DELETE',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(meal)
            });
            if (!response.ok){
                const {error} = await response.json();
                throw error;
            }
            filterMeals(meal, mealList, setMealList, toast)
        } catch (error) {
            toast({ title: `${error}`, status: 'error' });
        }
    } else {
        filterMeals(meal, mealList, setMealList, toast)
    }
}
    
const filterMeals = (meal: Meal, mealList: Meal[], setMealList, toast) =>  {
    setTimeout(()=> {
        // workaround for the re-opening modal bug
        const filteredMeals = mealList.filter(m => m.meal_id !== meal.meal_id);
        setMealList(filteredMeals);
        toast({ title: 'Meal removed', status: 'info'});
    });
}

export const getFoodData = async (query, setMeal, setLoading, toast) => {
    setLoading(true)
    try {
        const response = await fetch(`/api/other/food?query=${query}`);
        if (!response.ok){
            const {error} = await response.json();
            throw error;
        }
        const data = await response.json();
        const calories = sumMealCalories(data);
        setMeal((prevState) => ({...prevState, items: data.items, calories}));
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

export const newMealObj = () : Meal => {
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