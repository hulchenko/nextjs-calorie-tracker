import DayPage from "./DayPage";

const Day = async (context) => {
  const date = decodeURIComponent(context.params.date);
  const readOnly = context.searchParams.readOnly === "true";

  return <DayPage date={date} readOnly={readOnly} />;
};

export default Day;
