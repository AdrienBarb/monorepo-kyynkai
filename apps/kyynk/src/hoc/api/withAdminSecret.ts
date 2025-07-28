import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';

type Handler = (
  req: NextRequest,
  ...args: any[]
) => Promise<NextResponse> | NextResponse;

export function withAdminSecret(handler: Handler) {
  return async (req: NextRequest, ...args: any[]) => {
    // Get the session using NextAuth
    const session = await auth();

    // Check if user is authenticated
    if (!session?.user) {
      return NextResponse.json(
        { error: 'Unauthorized - Not authenticated' },
        { status: 401 },
      );
    }

    // Check if user has admin role
    const userRoles = session.user.roles || [];
    if (!userRoles.includes('admin')) {
      return NextResponse.json(
        { error: 'Forbidden - Admin access required' },
        { status: 403 },
      );
    }

    // User is authenticated and has admin role, proceed with the handler
    const response = await handler(req, ...args);
    return response;
  };
}
