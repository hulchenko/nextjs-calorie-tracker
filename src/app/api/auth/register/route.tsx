// const hashedPassword = encryptPassword(password);
import { verifyUserDB } from '@/actions/checkUserDB';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    try {
    const { newUser } = await req.json();    
    const dbUser = await verifyUserDB(newUser, false);
    return NextResponse.json(dbUser);
    } catch (error) {
    return NextResponse.json({error: 'User creation failed.'}, { status: 500 })
    }
}