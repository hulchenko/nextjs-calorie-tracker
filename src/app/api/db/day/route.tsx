import { createDay } from '@/db/createDay';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
    try {
        const data = await request.json();
        const day = await createDay(data);
        return NextResponse.json(day);
    } catch (error) {
        return NextResponse.json({error: `${error}`}, {status: 500})
    }
}