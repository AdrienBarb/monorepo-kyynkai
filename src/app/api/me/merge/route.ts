import { errorMessages } from '@/lib/constants/errorMessage';
import { errorHandler } from '@/utils/errors/errorHandler';
import { strictlyAuth } from '@/hoc/strictlyAuth';
import { getCurrentUser } from '@/services/users/getCurrentUser';
import { NextResponse, NextRequest } from 'next/server';
import { auth } from '@/lib/better-auth/auth';
import { getGuestFromCookie } from '@/services/guests/getGuestFromCookie';
import { claimGuestConversationsForUser } from '@/services/guests/claimGuestConversationsForUser';
import { cookies } from 'next/headers';

export const POST = strictlyAuth(
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

      const guest = await getGuestFromCookie();
      await claimGuestConversationsForUser(userId!, guest?.id!);

      const c = await cookies();
      c.set('guest_id', '', { path: '/', maxAge: 0 });

      return NextResponse.json({ ok: true }, { status: 200 });
    } catch (error) {
      return errorHandler(error);
    }
  },
);
