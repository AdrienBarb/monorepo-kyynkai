import { errorMessages } from '@/lib/constants/errorMessage';
import { errorHandler } from '@/utils/errors/errorHandler';
import { strictlyAuth } from '@/hoc/strictlyAuth';
import { getCurrentUser } from '@/services/users/getCurrentUser';
import { NextResponse, NextRequest } from 'next/server';
import { auth } from '@/lib/better-auth/auth';
import { prisma } from '@/lib/db/client';

export const GET = strictlyAuth(
  async (req: NextRequest): Promise<NextResponse> => {
    try {
      const session = await auth.api.getSession({
        headers: req.headers,
      });

      const userId = session?.user.id;

      const user = await getCurrentUser({ userId: userId! });

      if (!user) {
        return NextResponse.json(
          { error: errorMessages.USER_NOT_FOUND },
          { status: 404 },
        );
      }

      return NextResponse.json(user, { status: 200 });
    } catch (error) {
      return errorHandler(error);
    }
  },
);

export const PUT = strictlyAuth(
  async (req: NextRequest): Promise<NextResponse> => {
    try {
      const session = await auth.api.getSession({
        headers: req.headers,
      });

      const userId = session?.user.id;

      const body = await req.json();

      await prisma.user.update({
        where: { id: userId },
        data: {
          ...(body.utmTracking && { utmTracking: body.utmTracking }),
          ...(body.trackdeskCid && { trackdeskCid: body.trackdeskCid }),
        },
      });

      return NextResponse.json('OK', { status: 200 });
    } catch (error) {
      return errorHandler(error);
    }
  },
);
