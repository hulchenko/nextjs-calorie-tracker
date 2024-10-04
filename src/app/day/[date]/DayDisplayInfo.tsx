import { Progress } from "@chakra-ui/react";
import moment from "moment";
import { useEffect, useState } from "react";

const DayDisplayInfo = ({ day, dailyTarget }) => {
  const { calories_consumed, date } = day;

  const [target, setTarget] = useState(0);
  const [warning, setWarning] = useState(false);
  const [danger, setDanger] = useState(false);

  const displayDate = moment(date).format("LL");

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
    <div>
      <div className="flex flex-col ml-32 mt-14">
        <p className="text-3xl text-gray-600 font-bold">{displayDate}</p>
      </div>
      <div className="mt-20 flex flex-col items-center">
        <p className="text-xl text-gray-600 font-bold">
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
        <div className="border rounded w-3/6 p-2 mt-4 shadow-md">
          <Progress value={target} size="lg" colorScheme="teal" />
        </div>
      </div>
    </div>
  );
};

export default DayDisplayInfo;
