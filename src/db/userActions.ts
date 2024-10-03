import { sql } from "@/db/client";
import { v4 as uuidv4 } from "uuid";
import { User } from "@/types/User";
import { revalidatePath } from "next/cache"; // purges cached data

export const createUser = async (user: User): Promise<User | any> => {
  try {
    const { name, email, password, target } = user;
    const id = uuidv4();
    await sql`INSERT INTO users (user_id, name, email, password, target) VALUES (${id}, ${name}, ${email}, ${password}, ${target})`;
    const userData = {
      user_id: id,
      name,
      email,
      password,
      target,
    };
    revalidatePath("/");
    return userData;
  } catch (error) {
    console.error(error);
    throw Error("Creating user failed");
  }
};

export const updateUser = async (user: User) => {
  try {
    const { user_id, name, email, target } = user;
    await sql`UPDATE users SET name = ${name}, email = ${email}, target = ${target} WHERE user_id = ${user_id}`;
    return user;
  } catch (error) {
    console.error(error);
    throw Error("Updating user failed");
  }
};

export const verifyUserDB = async (user: User, queryById = true) => {
  const prop = queryById ? user.user_id : user.email;
  let userData = await getUser(prop as string | number, queryById);
  if (!queryById && userData) {
    throw Error("User already exists!");
  }

  if (!userData) {
    userData = await createUser(user);
  }

  return userData;
};

export const getUser = async (
  prop: string | number,
  queryById: boolean
): Promise<User[] | any> => {
  // query builder does not support variable interpolation correctly (e.g. dynamically swapping between the user_id/email properties)
  try {
    if (queryById) {
      const response = await sql`SELECT * FROM users WHERE user_id = ${prop}`;
      return response[0];
    } else {
      const response = await sql`SELECT * FROM users WHERE email = ${prop}`;
      return response[0];
    }
  } catch (error) {
    console.error(error);
    throw Error("Error getting user");
  }
};
