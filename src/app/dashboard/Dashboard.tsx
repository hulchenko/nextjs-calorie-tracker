"use client";

import {
  generateGreeting,
  generateWeek,
  getProgressPercent,
  goalReduce,
} from "@/lib/weekUtils";
import {
  CircularProgress,
  CircularProgressLabel,
  Spinner,
  Text,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useUser } from "../context/UserContext";
import { useWeek } from "../context/WeekContext";
import DayCard from "./DayCard";
import { Divider } from "@chakra-ui/react";

const Dashboard = () => {
  const { week } = useWeek();
  const { user } = useUser();

  const [weeklyGoal, setWeeklyGoal] = useState(0);
  const [progress, setProgress] = useState(0);
  const [greeting, setGreeting] = useState("");
  const [loading, setLoading] = useState({ user: true, week: true });

  const generatedWeek = generateWeek();

  useEffect(() => {
    const name = user?.name;
    if (name) {
      const greeting = generateGreeting(name);
      setGreeting(greeting);
    }
    setLoading((prev) => ({
      ...prev,
      user: false,
    }));
  }, [user]);

  useEffect(() => {
    const dailyGoals = week?.daily_goals_met;
    if (dailyGoals) {
      const goals = goalReduce(dailyGoals);
      const percent = getProgressPercent(goals);
      setWeeklyGoal(goals);
      setProgress(percent);
    }
    setLoading((prev) => ({
      ...prev,
      week: false,
    }));
  }, [week]);

  if (loading.user || loading.week) {
    return (
      <div className="flex justify-center mt-96">
        <Spinner thickness="4px" speed="1s" color="teal.600" size="xl" />
      </div>
    );
  }

  return (
    <div className="w-full flex items-center justify-center flex-col h-full">
      <div className="w-full lg:w-1/2 2xl:w-1/4">
        <div className="flex justify-center text-2xl font-bold sm:text-4xl py-6 lg:mt-20">
          {greeting}
        </div>
        <div className="flex flex-row border rounded border-gray-200 justify-evenly items-center sm:p-2">
          <Text className="text-xl font-bold lg:text-3xl">Weekly Goals</Text>
          <CircularProgress
            value={progress}
            color="teal.600"
            size={window.innerWidth <= 1024 ? 100 : 150}
            thickness="16px"
            className="ml-10 sm:ml-0"
          >
            <CircularProgressLabel>{weeklyGoal}/7 </CircularProgressLabel>
          </CircularProgress>
        </div>
      </div>
      <div className="w-full flex items-center flex-col rounded border-gray-200 sm:border lg:w-3/4 lg:shadow-md lg:mt-16">
        <Text className="hidden lg:block text-3xl font-bold py-4">
          Current Week
        </Text>
        <Divider className="hidden lg:block" />
        <ul className="flex flex-col justify-center flex-wrap sm:py-6 md:flex-row w-full h-full">
          {generatedWeek.map((day, index) => (
            <DayCard key={day.date} data={{ day, week, index }} />
          ))}
        </ul>
      </div>
    </div>
  );
};
export default Dashboard;
