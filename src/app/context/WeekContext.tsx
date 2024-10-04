"use client";

import { getWeek } from "@/db/weekActions";
import { defaultWeek, firstWeekDay } from "@/lib/weekUtils";
import { Week } from "@/types/Week";
import { createContext, useContext, useEffect, useState } from "react";
import { useSession } from "./SessionProvider";

export const WeekProvider = ({ children }) => {
  const { session } = useSession();

  const [week, setWeek] = useState<Week | null>(null);

  useEffect(() => {
    const userId = session?.user?.user_id as string;
    const fetchWeek = async () => {
      const weekDB = await getWeek(userId, firstWeekDay);
      if (weekDB) {
        setWeek(weekDB);
      } else {
        const initWeek = defaultWeek(userId);
        setWeek(initWeek);
      }
    };
    if (userId) {
      fetchWeek();
    }
  }, [session]);

  return (
    <WeekContext.Provider value={{ week, setWeek }}>
      {children}
    </WeekContext.Provider>
  );
};

const WeekContext = createContext<{
  week: Week | null;
  setWeek: (week: Week | null) => void;
}>({
  week: null,
  setWeek: () => {},
}); // define passing value

export const useWeek = () => useContext(WeekContext);
