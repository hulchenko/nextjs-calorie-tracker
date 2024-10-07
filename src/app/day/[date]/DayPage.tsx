"use client";

import { useUser } from "@/app/context/UserContext";
import { useWeek } from "@/app/context/WeekContext";
import { getDay } from "@/db/dayActions";
import {
  getDayIdx,
  getDefaultDay,
  getMeals,
  batchWriteMeals,
  sortMeals,
} from "@/lib/dayUtils";
import { Day } from "@/types/Day";
import { Meal } from "@/types/Meal";
import { Week } from "@/types/Week";
import { Grid, Spinner, useToast } from "@chakra-ui/react";
import { createContext, useEffect, useState } from "react";
import MealCard from "./MealCard";
import MealInputForm from "./MealInputForm";
import DayHeader from "./DayHeader";

const DayPage = ({ date, readOnly }) => {
  const toast = useToast();
  const { week, setWeek } = useWeek();
  const { user } = useUser();

  const [day, setDay] = useState<Day | null>(null);
  const [mealList, setMealList] = useState<Meal[] | null>(null);
  const [loading, setLoading] = useState({ mealList: true, day: true });
  const [saveReady, setSaveReady] = useState(false);

  const dayIdx = getDayIdx(date);
  const dailyTarget = parseInt(user?.target as string);

  useEffect(() => {
    const userId = user?.user_id as string;
    const fetchDay = async () => {
      const dayDB: Day | null = await getDay(userId, date);
      if (dayDB) {
        setDay(dayDB);
      } else {
        const defaultDay: Day = getDefaultDay(userId, date);
        setDay(defaultDay);
      }
      setLoading((prev) => ({
        ...prev,
        day: false,
      }));
    };
    if (userId) {
      fetchDay();
    }
  }, [user]);

  useEffect(() => {
    if (day) {
      getMeals(day, setMealList, setLoading, toast);
    }
  }, [day]);

  const submitHandler = async () => {
    const dailyCalories =
      mealList?.reduce((total, meal) => total + meal.calories, 0) || 0;
    const isDayChanged = dailyCalories !== day?.calories_consumed;
    const isMealListChanged = mealList?.length;

    if (isMealListChanged) {
      // writes to meals table

      const updatedDay = {
        ...day,
        calories_consumed: dailyCalories,
      } as Day;

      const updatedWeek = {
        ...week,
        daily_goals_met: {
          ...week?.daily_goals_met,
          [dayIdx]: dailyCalories >= dailyTarget,
        },
      } as Week;

      await batchWriteMeals(updatedDay, mealList, updatedWeek, toast);
      setSaveReady(false);
      setDay(updatedDay);
      setWeek(updatedWeek);
    }

    if (!isDayChanged && !isMealListChanged) {
      toast({ title: "Nothing to update", status: "info" });
    }
  };

  if (loading.mealList || loading.day) {
    return (
      <div className="flex justify-center mt-96">
        <Spinner thickness="4px" speed="1s" color="teal.600" size="xl" />
      </div>
    );
  }

  return (
    <div className="w-full">
      <DayHeader day={day} dailyTarget={dailyTarget} />
      <div className="mx-auto mt-6 sm:mt-20 items-center flex flex-col text-xl w-full">
        <MealContext.Provider value={{ mealList, setMealList, setSaveReady }}>
          <div className="h-full w-full items-center grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 sm:justify-items-center xl:w-3/4">
            {sortMeals(mealList)?.map((meal) => (
              <MealCard
                key={meal.meal_id}
                data={{ meal, day, setDay, readOnly }}
              />
            ))}
          </div>
          <MealInputForm readOnly={readOnly} />
        </MealContext.Provider>
        {saveReady && (
          <button
            className="fixed bottom-1 left-4 bg-teal-700 hover:bg-teal-600  text-white py-4 p-6 mt-2 rounded lg:bottom-40 lg:left-auto lg:right-24"
            onClick={submitHandler}
            hidden={readOnly}
          >
            Save
          </button>
        )}
      </div>
    </div>
  );
};

export const MealContext = createContext<{
  mealList: any;
  setMealList: any;
  setSaveReady: any;
}>({ mealList: null, setMealList: null, setSaveReady: null });
export default DayPage;
