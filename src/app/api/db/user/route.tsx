import { NextResponse, NextRequest } from 'next/server';
import { getUser } from '@/db/getUser';
import { createUser } from '@/db/createUser';

export async function GET(request: NextRequest) {
    try {
        // TODO getUser
        // 404 if user doesn't exist
    } catch (error) {
        return NextResponse.json({error: 'Error fetching user'}, {status: 500})
    }
}

export async function PUT(request: NextRequest) {
    try {
        // TODO updateUser
        // 404 if user doesn't exist
    } catch (error) {
        return NextResponse.json({error: 'Error updating user'}, { status: 500 })
    }
}

export async function POST(request: NextRequest) {
    try {
        // TODO createUser
    } catch (error) {
        return NextResponse.json({error: 'Error creating user'}, { status: 500 })
    }
}