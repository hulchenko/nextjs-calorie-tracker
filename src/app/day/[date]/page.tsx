import DayForm from './DayForm';

const DayPage = async (context) => {
    const date = decodeURIComponent(context.params.date);
    return (
        <DayForm date={date}/>
     );
}
 
export default DayPage;

