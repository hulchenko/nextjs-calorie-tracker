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

export default DayDisplayInfo;