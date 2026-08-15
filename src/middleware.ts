import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { COOKIE_KEYS } from './lib/constants';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if accessing admin routes (except login)
  if (pathname.startsWith('/admin') && !pathname.startsWith('/admin/login')) {
    const session = request.cookies.get(COOKIE_KEYS.ADMIN_SESSION);

    if (!session) {
      // Redirect to login if not authenticated
      const loginUrl = new URL('/admin/login', request.url);
      return NextResponse.redirect(loginUrl);
    }

    try {
      const sessionData = JSON.parse(session.value);
      
      // Check if session is expired
      if (sessionData.expiresAt < Date.now()) {
        const loginUrl = new URL('/admin/login', request.url);
        const response = NextResponse.redirect(loginUrl);
        response.cookies.delete(COOKIE_KEYS.ADMIN_SESSION);
        return response;
      }
    } catch (error) {
      // Invalid session data
      const loginUrl = new URL('/admin/login', request.url);
      const response = NextResponse.redirect(loginUrl);
      response.cookies.delete(COOKIE_KEYS.ADMIN_SESSION);
      return response;
    }
  }

  // Redirect to dashboard if trying to access login while already logged in
  if (pathname === '/admin/login') {
    const session = request.cookies.get(COOKIE_KEYS.ADMIN_SESSION);
    
    if (session) {
      try {
        const sessionData = JSON.parse(session.value);
        
        // If session is valid, redirect to dashboard
        if (sessionData.expiresAt >= Date.now()) {
          const dashboardUrl = new URL('/admin/dashboard', request.url);
          return NextResponse.redirect(dashboardUrl);
        }
      } catch (error) {
        // Invalid session, let them access login
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
