import { NextRequest, NextResponse } from 'next/server';
import { getCurrentUser } from '@/services/users/getCurrentUser';
import { auth } from '@/lib/better-auth/auth';
import { UserRole } from '@prisma/client';

type Handler = (
  req: NextRequest,
  ...args: any[]
) => Promise<NextResponse> | NextResponse;

export function withAdminSecret(handler: Handler) {
  return async (req: NextRequest, ...args: any[]) => {
    const session = await auth.api.getSession({
      headers: req.headers,
    });

    if (!session?.user) {
      return NextResponse.json(
        { error: 'Unauthorized - Not authenticated' },
        { status: 401 },
      );
    }

    const userId = session?.user.id;
    const user = await getCurrentUser({ userId: userId! });

    if (!user?.roles.includes(UserRole.ADMIN)) {
      return NextResponse.json(
        { error: 'Forbidden - Admin access required' },
        { status: 403 },
      );
    }

    const response = await handler(req, ...args);
    return response;
  };
}
