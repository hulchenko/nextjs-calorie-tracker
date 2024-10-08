"use client";

import { getWeeks } from "@/db/weekActions";
import { defaultWeek, firstWeekDay } from "@/lib/weekUtils";
import { Week } from "@/types/Week";
import { createContext, useContext, useEffect, useState } from "react";
import { useSession } from "./SessionProvider";

export const WeekProvider = ({ children }) => {
  const { session } = useSession();

  const [week, setWeek] = useState<Week | null>(null);
  const [prevWeeks, setPrevWeeks] = useState<Week[]>([]);

  useEffect(() => {
    const userId = session?.user?.user_id as string;
    const fetchWeek = async () => {
      const weeksDB = await getWeeks(userId);
      console.log(`WEEKS DB: `, weeksDB);
      if (weeksDB.length > 0) {
        const curr =
          weeksDB.find(
            (week) => new Date(week.start_date).toISOString() === firstWeekDay
          ) || null;
        const prev = weeksDB.filter(
          (week) => new Date(week.start_date).toISOString() !== firstWeekDay
        );

        setWeek(curr);
        console.log(`CURRENT WEEK: `, curr);
        setPrevWeeks(prev);
      } else {
        const initWeek = defaultWeek(userId);
        setWeek(initWeek);
        setPrevWeeks([]);
      }
    };
    if (userId) {
      fetchWeek();
    }
  }, [session]);

  return (
    <WeekContext.Provider value={{ week, prevWeeks, setWeek, setPrevWeeks }}>
      {children}
    </WeekContext.Provider>
  );
};

const WeekContext = createContext<{
  week: Week | null;
  prevWeeks: Week[];
  setWeek: (week: Week | null) => void;
  setPrevWeeks: (prevWeek: Week[]) => void;
}>({
  week: null,
  prevWeeks: [],
  setWeek: () => {},
  setPrevWeeks: () => {},
}); // define passing value

export const useWeek = () => useContext(WeekContext);
