import { NextRequest, NextResponse } from 'next/server';
import { deleteSession } from '@/lib/session';

export async function POST(request: NextRequest) {
    try {
        deleteSession();
        return NextResponse.json({status: 200})
    } catch (error) {
        console.error('Error logging out', error);
        return NextResponse.json({error: 'Logout failed.'}, { status: 500 })
    }
}