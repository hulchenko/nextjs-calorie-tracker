import { NextRequest, NextResponse } from 'next/server';
import { createMeal } from '@/db/createMeal';
import { getMeals } from '@/db/getMeals';

export async function POST(request: NextRequest) {
    try {
        const data = await request.json();
        const meal = await createMeal(data);
        return NextResponse.json(meal);
    } catch (error) {
        return NextResponse.json({error: `${error}`, status: 500});
    }
}

export async function GET(request: NextRequest){
    const day_id = request.nextUrl.searchParams.get('day');
    const user_id = request.nextUrl.searchParams.get('user');
    
    try {
        const data = await getMeals(day_id, user_id);
        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json({error: `${error}`, status: 500});
    }
}