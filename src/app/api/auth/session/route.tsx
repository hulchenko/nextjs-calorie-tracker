import { NextResponse } from 'next/server';
import { verifySession, updateSession } from '@/lib/session';

export async function POST() {
    // update session
    const session = await verifySession();
    if (session) {
        await updateSession();
        return NextResponse.json({message: 'Session updated'}, {status: 200});
    } else {
        return NextResponse.json({message: 'Unauthorized'}, {status: 401});
    }
}

export async function GET() {
    const session = await verifySession();
    if(session) {
        return NextResponse.json(session);
    } else {
        return NextResponse.json({message: 'Unauthorized'}, {status: 401});
    }
}