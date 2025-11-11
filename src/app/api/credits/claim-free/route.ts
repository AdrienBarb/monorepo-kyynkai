import { errorMessages } from '@/lib/constants/errorMessage';
import { errorHandler } from '@/utils/errors/errorHandler';
import { strictlyAuth } from '@/hoc/strictlyAuth';
import { NextResponse, NextRequest } from 'next/server';
import { auth } from '@/lib/better-auth/auth';
import { prisma } from '@/lib/db/client';

const FREE_CREDITS_AMOUNT = 5;
const WEEK_IN_MS = 7 * 24 * 60 * 60 * 1000;

export const PUT = strictlyAuth(
  async (req: NextRequest): Promise<NextResponse> => {
    try {
      const session = await auth.api.getSession({
        headers: req.headers,
      });

      const userId = session?.user.id;

      if (!userId) {
        return NextResponse.json(
          { error: errorMessages.AUTH_REQUIRED },
          { status: 401 },
        );
      }

      const user = await prisma.user.findUnique({
        where: { id: userId },
        select: {
          lastClaimFreeCredit: true,
          creditBalance: true,
        },
      });

      if (!user) {
        return NextResponse.json(
          { error: errorMessages.USER_NOT_FOUND },
          { status: 404 },
        );
      }

      const now = new Date();
      const canClaim =
        !user.lastClaimFreeCredit ||
        now.getTime() - user.lastClaimFreeCredit.getTime() >= WEEK_IN_MS;

      if (!canClaim) {
        return NextResponse.json(
          { error: errorMessages.ALREADY_CLAIMED_THIS_WEEK },
          { status: 400 },
        );
      }

      await prisma.user.update({
        where: { id: userId },
        data: {
          creditBalance: { increment: FREE_CREDITS_AMOUNT },
          lastClaimFreeCredit: now,
        },
      });

      return NextResponse.json(
        {
          success: true,
          creditsAdded: FREE_CREDITS_AMOUNT,
          newBalance: user.creditBalance + FREE_CREDITS_AMOUNT,
        },
        { status: 200 },
      );
    } catch (error) {
      return errorHandler(error);
    }
  },
);

