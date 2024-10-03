import { v4 as uuidv4 } from "uuid";
import { Week } from "@/types/Week";
import moment from "moment";
import { User } from "@/types/User";
import { getWeekDays } from "@/db/dayActions";
import { getDayIdx } from "./dayUtils";
import { updateWeek } from "@/db/weekActions";

const weekStart = moment().startOf("isoWeek"); // '2024-09-09'
const weekEnd = moment().endOf("isoWeek"); // '2024-09-15'

export const firstWeekDay = weekStart
  .clone()
  .seconds(0)
  .milliseconds(0)
  .toISOString();
export const lastWeekDay = weekEnd
  .clone()
  .seconds(0)
  .milliseconds(0)
  .toISOString();

export const defaultWeek = (userId: string): Week => {
  const start = weekStart.clone().seconds(0).milliseconds(0).toISOString();
  const end = weekEnd.clone().seconds(0).milliseconds(0).toISOString();
  return {
    week_id: uuidv4(),
    user_id: userId,
    start_date: start,
    end_date: end,
    daily_goals_met: generateWeeklyTargets(),
  };
};

export const generateWeek = () => {
  const generatedWeek: Array<any> = [];
  let dayOfWeek = weekStart.clone(); // initialize first week day from the given week
  while (dayOfWeek.isSameOrBefore(weekEnd)) {
    const date = dayOfWeek.seconds(0).milliseconds(0).toISOString();
    const weekDay = dayOfWeek.format("dddd");
    generatedWeek.push({ weekDay, date });
    dayOfWeek.add(1, "day");
  }

  return generatedWeek;
};

export const updateWeekTargets = async (user: User, week: Week) => {
  try {
    const { user_id, target } = user;
    const weekDays = await getWeekDays(user_id, firstWeekDay, lastWeekDay);

    const targetMap = generateWeeklyTargets();
    for (const day of weekDays) {
      const dayIdx = getDayIdx(day.date);
      const isTargetMet = day.calories_consumed >= target;
      targetMap[dayIdx] = isTargetMet;
    }
    week.daily_goals_met = targetMap;
    const response = await updateWeek(week);
    return response;
  } catch (error) {
    console.error(error);
    throw Error("Failed to update weekly targets.");
  }
};

const generateWeeklyTargets = () => {
  const targetMap = {};
  for (let i = 0; i < 7; i++) {
    targetMap[i] = false;
  }
  return targetMap;
};
