import { createDay, updateDay } from '@/db/dayActions';
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

export async function PUT(request: NextRequest) {
    try {
        const data = await request.json();
        const day = await updateDay(data);
        return NextResponse.json(day);
    } catch (error) {
        return NextResponse.json({error: `${error}`}, {status: 500})
    }
}