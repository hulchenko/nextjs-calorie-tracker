import { Card, CardBody, CardHeader } from "@chakra-ui/react";
import moment from "moment";
import Link from "next/link";
import { useEffect, useState } from "react";

const DayCard = ({ data }) => {
  const { targetWeek, index } = data;
  const { date, weekDay } = data.day;

  const [isGoalMet, setIsGoalMet] = useState(false);

  const displayDate = moment.utc(date).format("MMM Do");
  const isToday =
    moment.utc(date).format("L") === moment.utc(Date.now()).format("L");

  useEffect(() => {
    const goal = targetWeek?.daily_goals_met[index] || false;
    setIsGoalMet(goal);
  }, [targetWeek]);

  return (
    <Link href={{ pathname: `/day/${date}` }} className="h-full">
      <Card
        h={window.innerWidth <= 640 ? 16 : 32}
        className="mt-3 mx-4 w-auto h-96 md:w-60 sm:m-3 hover:shadow-teal-700 hover:shadow-md"
        bg={isGoalMet ? "teal.600" : "white"}
      >
        <div className="hidden sm:block">
          <CardBody
            className="flex items-center self-end text-xl"
            textColor={isGoalMet ? "white" : "gray.500"}
          >
            {isToday ? "Today" : ""} {displayDate}
          </CardBody>
          <CardHeader
            className="flex text-4xl font-bold"
            textColor={isGoalMet ? "white" : "teal.600"}
            p={0}
            mb={6}
            ml={4}
          >
            {weekDay}
          </CardHeader>
        </div>
        <div className="sm:hidden flex justify-between px-8 text-2xl h-full items-center">
          {/* small screen selector */}
          <p
            className={`${
              isGoalMet ? "text-white" : "text-teal-600"
            } font-bold`}
          >
            {weekDay}
          </p>
          <p className={`${isGoalMet ? "text-white" : "text-gray-500"}`}>
            {isToday ? "Today" : ""} {displayDate}
          </p>
        </div>
      </Card>
    </Link>
  );
};

export default DayCard;
