import { NextRequest, NextResponse } from 'next/server';
import { createMeal } from '@/db/createMeal';

export async function POST(request: NextRequest) {
    try {
        const data = await request.json();
        const meal = await createMeal(data);
        return NextResponse.json(meal);
    } catch (error) {
        return NextResponse.json({error: `${error}`, status: 500})
    }
}