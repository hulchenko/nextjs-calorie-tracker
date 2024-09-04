import { NextRequest, NextResponse } from 'next/server';
import { getUser } from '@/server/getUser';
import { validateHashedPassword } from '@/lib/utils';

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const body = await req.json();
    const { email, password } = body;
    console.log(`EMAIL: `, email);
    console.log(`PASSWORD: `, password);

    const user = await getUser(email, false);
    const isPasswordCorrect = validateHashedPassword(password, user.password);

    console.log(`USER: `, user);
    console.log(`isPasswordCorrect: `, isPasswordCorrect);

    if (user && isPasswordCorrect) {
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json({ error: 'Invalid credentials.' }, { status: 401 });
    }
  } catch (error) {
    return NextResponse.json({ error: 'User login failed.' }, { status: 500 });
  }
}