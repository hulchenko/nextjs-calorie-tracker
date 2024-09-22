import { getFood } from '@/db/getFood';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest){
    const query = request.nextUrl.searchParams.get('query');
    try {
        const data = await getFood(query);
        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json({error: `${error}`}, {status: 500});
    }
}