import { Progress } from "@chakra-ui/react";
import moment from "moment";
import { useEffect, useState } from "react";

const DayHeader = ({ day, dailyTarget }) => {
  const { calories_consumed, date } = day;

  const [target, setTarget] = useState(0);
  const [warning, setWarning] = useState(false);
  const [danger, setDanger] = useState(false);

  const displayDate = moment.utc(date).format("LL");

  useEffect(() => {
    const getTarget = () => {
      const target = (calories_consumed * 100) / dailyTarget;
      if (target > 100) {
        setTarget(100);
        if (target / 100 > 2) {
          setDanger(true);
        } else {
          setWarning(true);
        }
      } else if (target < 0) {
        setTarget(0);
      } else {
        setTarget(target);
      }
    };
    getTarget();
  }, [day]);

  return (
    <div className="flex flex-col items-center w-full sm:items-start">
      <p className="text-2xl sm:text-4xl font-bold mt-6 sm:pl-24 sm:mt-14">
        {displayDate}
      </p>
      <div className="mt-6 flex flex-col items-center sm:mt-20 sm:w-full">
        <p className="text-xl font-bold">
          Daily Target{" "}
          <span
            className={
              danger ? "text-red-400" : warning ? "text-orange-400" : ""
            }
          >
            {calories_consumed}
          </span>{" "}
          / <span className="text-teal-600">{dailyTarget}</span>
        </p>
        <div className="border rounded w-96 md:w-3/6 p-2 mt-4 shadow-md">
          <Progress value={target} size="lg" colorScheme="teal" />
        </div>
      </div>
    </div>
  );
};

export default DayHeader;
