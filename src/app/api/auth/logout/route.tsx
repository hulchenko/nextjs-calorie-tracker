import { deleteSession } from '@/lib/session';
import { NextResponse } from 'next/server';

export async function POST() {
    try {
        deleteSession();
        return NextResponse.json({message: 'Logged out successfully'}, { status: 200 });
    } catch (error) {
        console.error('Error logging out', error);
        return NextResponse.json({error: 'Logout failed.'}, { status: 500 });
    }
}