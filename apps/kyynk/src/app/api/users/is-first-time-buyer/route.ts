import { NextResponse, NextRequest } from 'next/server';
import { prisma } from '@/lib/db/client';
import { strictlyAuth } from '@/hoc/strictlyAuth';
import { errorHandler } from '@/utils/errors/errorHandler';
import { auth } from '@/lib/better-auth/auth';

export const GET = strictlyAuth(
  async (req: NextRequest): Promise<NextResponse> => {
    try {
      const session = await auth.api.getSession({
        headers: req.headers,
      });

      const userId = session?.user.id;

      if (!userId) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      }

      const successfulTransactions = await prisma.creditTransaction.count({
        where: {
          userId: userId,
          status: 'SUCCEEDED',
        },
      });

      // const isFirstTimeBuyer = successfulTransactions === 0;
      const isFirstTimeBuyer = false;

      return NextResponse.json({ isFirstTimeBuyer });
    } catch (error) {
      return errorHandler(error);
    }
  },
);
