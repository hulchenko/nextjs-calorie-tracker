import { verifyUserDB } from '@/actions/checkUserDB';
import { NextRequest, NextResponse } from 'next/server';
import { createSession } from '@/lib/session';

export async function POST(request: NextRequest) {
    try {
        const { newUser } = await request.json();
        const dbUser = await verifyUserDB(newUser, false);
        await createSession(dbUser.user_id)
        return NextResponse.json(dbUser);
    } catch (error) {
        return NextResponse.json({error: `${error}`}, { status: 409 })
    }
}