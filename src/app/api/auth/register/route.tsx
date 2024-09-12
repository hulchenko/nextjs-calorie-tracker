import { verifyUserDB } from '@/db/verifyUser';
import { NextRequest, NextResponse } from 'next/server';
import { createSession } from '@/lib/session';

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