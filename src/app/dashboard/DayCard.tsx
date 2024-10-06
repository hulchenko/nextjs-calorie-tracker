import { Card, CardBody, CardHeader } from "@chakra-ui/react";
import moment from "moment";
import Link from "next/link";
import { useEffect, useState } from "react";

const DayCard = ({ data }) => {
  const { week, index } = data;
  const { date, weekDay } = data.day;

  const [isGoalMet, setIsGoalMet] = useState(false);

  const displayDate = moment(date).format("MMM Do");
  const isToday = moment(date).format("L") === moment(Date.now()).format("L");

  useEffect(() => {
    const goal = week?.daily_goals_met[index] || false;
    setIsGoalMet(goal);
  }, [week]);

  return (
    <Link href={{ pathname: `/day/${date}` }} className="h-full">
      <Card
        h={window.innerWidth <= 640 ? 16 : 32}
        className="hover:shadow-teal-700 hover:shadow-md m-2 sm:m-3 w-auto md:w-60 h-96"
        bg={isGoalMet ? "teal.600" : "white"}
      >
        <CardBody
          className="flex justify-end self-end sm:text-xl"
          textColor={isGoalMet ? "white" : "gray.500"}
          p={window.innerWidth <= 640 ? 0 : 5}
          mr={window.innerWidth <= 640 ? 4 : 0}
          mt={window.innerWidth <= 640 ? 2 : 0}
        >
          {isToday ? "Today" : ""} {displayDate}
        </CardBody>
        <CardHeader
          className="flex sm:text-4xl font-bold"
          textColor={isGoalMet ? "white" : "teal.600"}
          p={0}
          mb={6}
          ml={4}
        >
          {weekDay}
        </CardHeader>
      </Card>
    </Link>
  );
};

export default DayCard;
