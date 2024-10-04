import { getMeals } from "@/db/mealActions";
import { setMealRecord } from "@/db/setMealRecord";
import { NextRequest, NextResponse } from "next/server";
import { removeMealRecord } from "@/db/removeMealRecord";

export async function POST(request: NextRequest) {
  try {
    const { meal, day, week } = await request.json();
    const response = await setMealRecord(meal, day, week);
    return NextResponse.json(response);
  } catch (error) {
    return NextResponse.json({ error: `${error}` }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  const day_id = request.nextUrl.searchParams.get("day_id") || "";
  const user_id = request.nextUrl.searchParams.get("user") || "";

  try {
    const response = await getMeals(day_id, user_id);
    return NextResponse.json(response);
  } catch (error) {
    return NextResponse.json({ error: `${error}` }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { meal, day, week } = await request.json();
    const response = await removeMealRecord(meal, day, week);
    return NextResponse.json(response);
  } catch (error) {
    return NextResponse.json({ error: `${error}` }, { status: 500 });
  }
}
