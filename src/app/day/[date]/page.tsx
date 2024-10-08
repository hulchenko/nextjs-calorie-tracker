import DayPage from "./DayPage";

const Day = async (context) => {
  const date = decodeURIComponent(context.params.date);
  return <DayPage date={date} />;
};

export default Day;
