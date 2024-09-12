import { NextRequest, NextResponse } from 'next/server';
import { verifySession } from './lib/session';

const protectedRoutes = ['/dashboard', '/profile'];
const publicRoutes = ['/login'];

export default async function middleware(request: NextRequest) {
    const requestedUrl = request.nextUrl.pathname;
    const isProtectedRoute = protectedRoutes.includes(requestedUrl);
    const isAuthRoute = publicRoutes.includes(requestedUrl);

    const session = await verifySession();

    if(requestedUrl === '/'){ // default home page
      if (!session) {
        return NextResponse.redirect(new URL('/login', request.nextUrl));
      }
     return NextResponse.redirect(new URL('/dashboard', request.nextUrl))
    }

    if (isProtectedRoute && !session?.user?.user_id) { // not authorized + route attempt to /dashboard or /profile, default to /login
        return NextResponse.redirect(new URL('/login', request.nextUrl))
    } 

    if (isAuthRoute && session?.user?.user_id) { // authorized + route attempt to /login, default to /dashboard
        return NextResponse.redirect(new URL('/dashboard', request.nextUrl))
    }
  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}