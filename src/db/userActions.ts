import { sql } from "@/db/client";
import { v4 as uuidv4 } from "uuid";
import { User } from "@/types/User";
import { revalidatePath } from "next/cache"; // purges cached data

export const createUser = async (user: User): Promise<User | any> => {
  try {
    const { name, email, password, target } = user;

    const userDB = await getUserByEmail(email);
    if (userDB) throw Error("User already exists!");

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
    if (error.name === "NeonDbError") {
      throw Error("Creating user failed");
    }
    throw error; // "User already exists!"
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

export const getUserByEmail = async (email: string): Promise<User[] | any> => {
  try {
    const response = await sql`SELECT * FROM users WHERE email = ${email}`;
    return response[0];
  } catch (error) {
    console.error(error);
    throw Error("Error getting user");
  }
};

export const getUserById = async (id: string): Promise<User[] | any> => {
  try {
    const response = await sql`SELECT * FROM users WHERE user_id = ${id}`;
    return response[0];
  } catch (error) {
    console.error(error);
    throw Error("Error getting user");
  }
};
