"use server";

import {neon} from "@neondatabase/serverless";

const DATABASE_URL = process.env.DATABASE_URL;
export const sql = neon(DATABASE_URL || '');