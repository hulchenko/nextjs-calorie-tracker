import { Week } from "@/types/Week";
import { sql } from "./client";

export const getWeek = async (
  userId: string,
  firstWeekDay: string | any
): Promise<Week> => {
  try {
    const response =
      await sql`SELECT * FROM weeks WHERE user_id = ${userId} and start_date = ${firstWeekDay}`;
    return response[0] as Week;
  } catch (error) {
    console.error(error);
    throw Error("Error getting week");
  }
};

export const createWeek = async (week: Week) => {
  const { week_id, user_id, start_date, end_date, daily_goals_met } = week;
  try {
    await sql`INSERT INTO weeks(week_id, user_id, start_date, end_date, daily_goals_met) VALUES(${week_id},${user_id},${start_date},${end_date},${daily_goals_met})`;
    return week;
  } catch (error) {
    console.error(error);
    throw Error("Error creating week");
  }
};

export const updateWeek = async (week: Week) => {
  const { week_id, user_id, daily_goals_met } = week;
  try {
    await sql`UPDATE weeks SET daily_goals_met = ${daily_goals_met} WHERE week_id = ${week_id} AND user_id = ${user_id}`;
    return week;
  } catch (error) {
    console.error(error);
    throw Error("Error creating week");
  }
};
