import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(req: NextRequest) {
  // Use getToken from next-auth/jwt which is Edge-compatible
  // It decodes the token without triggering Node.js dependencies
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  
  const isLoggedIn = !!token;
  const role = token?.role;
  const { pathname, search } = req.nextUrl;

  const isClientRoute = pathname.startsWith('/client');
  const isAdminRoute = pathname.startsWith('/admin');
  const isAuthRoute = pathname.startsWith('/login') || pathname.startsWith('/register');

  // 1. Tamu (Belum Login): Redirect ke /login jika mencoba akses /client atau /admin
  if (!isLoggedIn && (isClientRoute || isAdminRoute)) {
    const loginUrl = new URL('/login', req.url);
    loginUrl.searchParams.set('callbackUrl', pathname + search);
    return NextResponse.redirect(loginUrl);
  }

  // 2. User (Sudah Login): Mencegah akses ke halaman Auth (/login, /register)
  if (isLoggedIn && isAuthRoute) {
    if (role === 'admin') {
      return NextResponse.redirect(new URL('/admin', req.url));
    } else {
      return NextResponse.redirect(new URL('/client', req.url));
    }
  }

  // 3. User Biasa (Sudah Login): Redirect ke /client jika mencoba akses /admin
  if (isLoggedIn && isAdminRoute && role !== 'admin') {
    return NextResponse.redirect(new URL('/client', req.url));
  }

  // 4. Akses sah lainnya: Diizinkan
  return NextResponse.next();
}

export const config = {
  matcher: ['/client', '/client/:path*', '/admin', '/admin/:path*', '/login', '/register'],
};


