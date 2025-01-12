import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  // console.log('Middleware:', req.nextUrl.pathname);
  // const token = req.cookies.get('token');
  const { pathname } = req.nextUrl;

  // if (!token) {
  //   console.log('No token found, redirecting to login page');
  //   const loginUrl = new URL('/login', req.url);
  //   return NextResponse.redirect(loginUrl);
  // }

  // Redirect '/' to '/upload' when the token exists
  if (pathname === '/') {
    const uploadUrl = new URL('/login', req.url);
    return NextResponse.redirect(uploadUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/upload', '/query'],
};
