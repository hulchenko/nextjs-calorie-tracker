import { verifyUserDB } from '@/actions/checkUserDB';
import { NextRequest, NextResponse } from 'next/server';
import { createSession } from '@/lib/session';

export async function POST(req: NextRequest) {
    try {
        const { newUser } = await req.json();
        const dbUser = await verifyUserDB(newUser, false);
        await createSession(dbUser.user_id)
        return NextResponse.json(dbUser);
    } catch (error) {
        return NextResponse.json({error: 'User creation failed.'}, { status: 500 })
    }
}