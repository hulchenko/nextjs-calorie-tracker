import { getUser, updateUser } from '@/db/userActions';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest){
    try {
        const user = await request.json();
        const response = await updateUser(user);
        return NextResponse.json(response);
    } catch (error) {
        return NextResponse.json({error: `${error}`}, {status: 500})
    }
}

export async function GET(request: NextRequest){
    const email = request.nextUrl.searchParams.get('email');

    try {
        const response = await getUser(email as string, false);
        return NextResponse.json(response);        
    } catch (error) {
        return NextResponse.json({error: `${error}`}, {status: 500})
    }
}