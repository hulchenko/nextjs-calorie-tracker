import { NextResponse } from 'next/server';
import { getSession, updateSession } from '@/lib/session';

export async function POST() {
    const session = await getSession();
    if (session) {
        await updateSession();
        return NextResponse.json({message: 'Session updated'}, {status: 200});
    } else {
        return NextResponse.json({message: 'Unauthorized'}, {status: 401});
    }
}