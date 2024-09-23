import { createMeal, getMeals, removeMeal } from '@/db/mealActions';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
    try {
        const data = await request.json();
        const response = await createMeal(data); // TODO this to replace
        return NextResponse.json(response);
    } catch (error) {
        return NextResponse.json({error: `${error}`}, { status: 500 });
    }
}

export async function GET(request: NextRequest){
    const day_id = request.nextUrl.searchParams.get('day_id');
    const user_id = request.nextUrl.searchParams.get('user');
    
    try {
        const response = await getMeals(day_id, user_id);
        return NextResponse.json(response);
    } catch (error) {
        return NextResponse.json({error: `${error}`}, { status: 500 });
    }
}

export async function DELETE(request: NextRequest){
    try {
        const data = await request.json();
        const response = await removeMeal(data);
        return NextResponse.json(response);
    } catch (error) {
        return NextResponse.json({error: `${error}`}, { status: 500 });
    }
}