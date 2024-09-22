import { deleteSession, updateSession, verifySession } from '@/lib/session';
import { NextResponse } from 'next/server';

export async function POST() { // refresh session
    const session = await verifySession();
    if (session) {
        await updateSession();
        return NextResponse.json({message: 'Session updated'}, {status: 200});
    } else {
        deleteSession();
        return NextResponse.json({message: 'Unauthorized'}, {status: 401});
    }
}

export async function GET() { // verify current session
    const session = await verifySession();
    if(session) {
        return NextResponse.json(session);
    } else {
        deleteSession();
        return NextResponse.json({message: 'Unauthorized'}, {status: 401});
    }
}