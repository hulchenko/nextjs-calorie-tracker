import { updateUser } from '@/db/userActions';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest){
    try {
        const { user } = await request.json();
        const response = await updateUser(user);
        return NextResponse.json(response);        
    } catch (error) {
        return NextResponse.json({error: `${error}`}, {status: 500})
    }
}