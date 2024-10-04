import { Day } from "@/types/Day";
import { sql } from "./client";

export const createDay = async (day: Day) => {
  const { day_id, user_id, date, calories_consumed } = day;
  try {
    await sql`INSERT INTO days(day_id, user_id, date, calories_consumed) VALUES (${day_id}, ${user_id}, ${date}, ${calories_consumed})`;
    return day;
  } catch (error) {
    console.error(error);
    throw Error("Creating day failed");
  }
};

export const getDay = async (
  userId: string,
  date: string
): Promise<Day | null> => {
  try {
    const response =
      await sql`SELECT * FROM days where user_id = ${userId} AND date = ${date}`;
    if (response?.length > 0) {
      return response[0] as Day;
    }
    return null;
  } catch (error) {
    console.error(error);
    throw Error("Getting user failed");
  }
};

export const getWeekDays = async (
  userId: string,
  start: string,
  end: string
) => {
  try {
    const response =
      await sql`SELECT * FROM days where user_id = ${userId} AND date >= ${start} AND date <= ${end}`;
    return response;
  } catch (error) {
    console.error(error);
    throw Error("Getting user failed");
  }
};

export const updateDay = async (day: Day) => {
  const { user_id, date, calories_consumed } = day;
  try {
    await sql`UPDATE days SET calories_consumed = ${calories_consumed} WHERE user_id = ${user_id} AND date = ${date}`;
    return day;
  } catch (error) {
    console.error(error);
    throw Error("Error updating day");
  }
};
