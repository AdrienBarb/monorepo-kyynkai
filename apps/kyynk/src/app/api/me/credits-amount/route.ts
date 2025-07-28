export const dynamic = 'force-dynamic';

import { errorHandler } from '@/utils/errors/errorHandler';
import { strictlyAuth } from '@/hoc/strictlyAuth';
import { getCurrentUser } from '@/services/users/getCurrentUser';
import { NextResponse, NextRequest } from 'next/server';

export const GET = strictlyAuth(
  async (req: NextRequest): Promise<NextResponse> => {
    try {
      const { auth } = req;
      const userId = auth?.user.id;

      const user = await getCurrentUser({ userId: userId! });

      return NextResponse.json(user?.creditsAmount || 0, { status: 200 });
    } catch (error) {
      return errorHandler(error);
    }
  },
);
