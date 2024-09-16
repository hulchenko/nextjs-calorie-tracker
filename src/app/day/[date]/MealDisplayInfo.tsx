import { useContext, useEffect, useState } from 'react';
import { MealContext } from './DayForm';

const MealDisplayInfo = () => {
    const { mealList } = useContext(MealContext);
    const [meal, setMeal] = useState(mealList); // TODO this needs to be retrieved dynamically (based on id maybe?)

    useEffect(() => {
        console.log(`UPDATE SUBSEQUENT`);
        setMeal(mealList);
    },[mealList])


    console.log(`MEAL LIST IN MEAL DISPLAY: `, mealList);
    return ( 
        <div key={meal.meal_id}>
            <div>ID: {meal.meal_id}</div>
            <div>Type: {meal.type}</div>
            <div>Items:</div>
            <ul>
                {meal.items?.map((item) => (
                    <div className='border p-4'>
                        <li><b>{item?.name}</b>({item.calories} cals)</li>
                    </div>
                ))}
            </ul>
            <div>Calories: {meal.calories}</div>
        </div>
     );
}
 
export default MealDisplayInfo;