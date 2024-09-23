import { verifyUserDB } from '@/db/userActions';
import { createSession } from '@/lib/session';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
    try {
        const { newUser } = await request.json();
        const dbUser = await verifyUserDB(newUser, false);
        await createSession(dbUser)
        return NextResponse.json(dbUser);
    } catch (error) {
        return NextResponse.json({error: `${error}`}, { status: 500 })
    }
}