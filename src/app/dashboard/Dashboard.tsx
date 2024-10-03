"use client";

import { generateWeek } from "@/lib/weekUtils";
import {
  CircularProgress,
  CircularProgressLabel,
  Divider,
  Spinner,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useWeek } from "../context/WeekContext";
import DayCard from "./DayCard";
import {
  getProgressPercent,
  goalReduce,
  generateGreeting,
} from "@/lib/weekUtils";
import { useUser } from "../context/UserContext";

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
            <DayCard key={day.date} data={{ day, week, index }} />
          ))}
        </ul>
      </div>
    </div>
  );
};
export default Dashboard;
