import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { auth } from '@/auth';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if the path starts with /admin
  if (pathname.startsWith('/admin')) {
    const session = await auth();

    // If no session, redirect to login
    if (!session?.user) {
      return NextResponse.redirect(new URL('/login', request.url));
    }

    // Check if user has admin role
    const userRoles = session.user.roles || [];
    if (!userRoles.includes('admin')) {
      return NextResponse.redirect(new URL('/401', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
