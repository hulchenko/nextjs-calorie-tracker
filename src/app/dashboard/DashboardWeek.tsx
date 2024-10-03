"use client";

import { generateWeek } from "@/lib/weekUtils";
import {
  CircularProgress,
  CircularProgressLabel,
  Divider,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useWeek } from "../context/WeekContext";
import DashboardDayCard from "./DashboardDayCard";

const DashboardWeek = ({ user_id, greeting }) => {
  const generatedWeek = generateWeek();
  const { week } = useWeek();
  const [weeklyGoal, setWeeklyGoal] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const goals = goalReduce(week?.daily_goals_met);
    const progressPercent = getProgress(goals);
    setWeeklyGoal(goals);
    setProgress(progressPercent);
  }, [week]);

  function goalReduce(weeklyGoal): number {
    if (weeklyGoal) {
      const result = Object.values(weeklyGoal).reduce(
        (goals: any, goalMet: boolean) => {
          if (goalMet) {
            goals++;
          }
          return goals;
        },
        0
      );
      return result as number;
    }
    return 0;
  }

  function getProgress(currGoal: number) {
    const max = 7;
    return Math.floor((currGoal * 100) / max);
  }

  return (
    <div className="mx-auto grid grid-flow-col items-start justify-center w-full">
      <div className="flex flex-col mr-20">
        <div className="p-6 text-5xl mb-52 mt-20">{greeting}</div>
        <div className="flex border rounded p-6 border-gray-200 shadow-md">
          <Text className="text-3xl text-gray-600">Weekly Goals Progress</Text>
          <CircularProgress
            value={progress}
            color="teal.600"
            size="240px"
            thickness="16px"
          >
            <CircularProgressLabel className="text-gray-600">
              {weeklyGoal}/7{" "}
            </CircularProgressLabel>
          </CircularProgress>
        </div>
      </div>
      <div className="flex border rounded p-6 border-gray-200 shadow-md mt-6">
        <Text className="text-3xl text-gray-600 pr-6">Calendar</Text>
        <Stack className="text-gray-200">
          <Divider orientation="vertical" />
        </Stack>
        <ul>
          {generatedWeek.map((day, index) => (
            <DashboardDayCard
              key={day.date}
              data={{ user_id, day, week, index }}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};
export default DashboardWeek;
