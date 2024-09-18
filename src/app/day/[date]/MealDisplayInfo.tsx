const MealDisplayInfo = ({meal}) => {

    return (
        <div>
            <h1 className='text-green-600'>MEAL DISPLAY COMPONENT</h1>
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
        </div>
     );
}
 
export default MealDisplayInfo;