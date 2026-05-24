import { auth } from '@/lib/auth';
import { NextResponse } from 'next/server';

export default auth((req) => {
  const isLoggedIn = !!req.auth;
  const role = (req.auth?.user as any)?.role;
  const { pathname } = req.nextUrl;

  // Protect /client — redirect unauthenticated to /login, preserve ?theme=
  if (pathname.startsWith('/client') && !isLoggedIn) {
    const loginUrl = new URL('/login', req.nextUrl);
    const themeId = req.nextUrl.searchParams.get('theme');
    const callbackUrl = themeId
      ? `/client?theme=${themeId}`
      : '/client';
    loginUrl.searchParams.set('callbackUrl', callbackUrl);
    return NextResponse.redirect(loginUrl);
  }

  // Protect /admin — only admin role allowed
  if (pathname.startsWith('/admin') && !isLoggedIn) {
    const loginUrl = new URL('/login', req.nextUrl);
    loginUrl.searchParams.set('callbackUrl', '/admin');
    return NextResponse.redirect(loginUrl);
  }

  if (pathname.startsWith('/admin') && isLoggedIn && role !== 'admin') {
    return NextResponse.redirect(new URL('/client', req.nextUrl));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ['/client/:path*', '/admin/:path*'],
};
