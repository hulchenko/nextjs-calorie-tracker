import { NextRequest, NextResponse } from 'next/server';
import { decrypt, updateSession } from './lib/session';
import { cookies } from 'next/headers'; // cannot be modified, but can be fetched in middleware
import { getSession } from './lib/session';
import { redirect } from 'next/navigation';

const protectedRoutes = ['/dashboard', '/profile'];
const authRoutes = ['/login'];

export default async function middleware(request: NextRequest) {

    const requestedUrl = request.nextUrl.pathname;
    const isProtectedRoute = protectedRoutes.includes(requestedUrl);
    const isAuthRoute = authRoutes.includes(requestedUrl);
    const session = await getSession();

    if(requestedUrl === '/'){
      if (!session) {
        return NextResponse.redirect(new URL('/login', request.nextUrl))
      }
     return NextResponse.redirect(new URL('/dashboard', request.nextUrl))
    }

    if (isProtectedRoute && !session?.userId) { // not authorized + route attempt to /dashboard or /profile, default to /login
        return NextResponse.redirect(new URL('/login', request.nextUrl))
    } 

    if (isAuthRoute && session?.userId) { // authorized + route attempt to /login, default to /dashboard
        return NextResponse.redirect(new URL('/dashboard', request.nextUrl))
    }
  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}