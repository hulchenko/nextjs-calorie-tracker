import { NextRequest, NextResponse } from 'next/server';
import { getUser } from '@/server/getUser';
import { validateHashedPassword } from '@/lib/utils';

export async function POST(req: NextRequest) {

  try {
    const body = await req.json();
    const { email, password } = body;
    console.log(`EMAIL: `, email);
    console.log(`PASSWORD: `, password);

    const user = await getUser(email, false);
    console.log(`USER: `, user);

    if (!user) {
      return NextResponse.json({error: 'User does not exist. Please sign up to proceed.'}, { status: 404 })
    }

    const isPasswordCorrect = await validateHashedPassword(password, user?.password);
    console.log(`isPasswordCorrect: `, isPasswordCorrect);


    if (isPasswordCorrect) {
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json({ error: 'Invalid credentials.' }, { status: 401 });
    }

  } catch (error) {
    console.error('Error during login:', error);
    return NextResponse.json({ error: 'User login failed.' }, { status: 500 });
  }
}