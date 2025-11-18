import { strictlyAuth } from '@/hoc/strictlyAuth';
import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/better-auth/auth';
import { prisma } from '@/lib/db/client';
import { errorHandler } from '@/utils/errors/errorHandler';
import { NEW_USER_WINDOW_MS } from '@/constants/constants';

export const PUT = strictlyAuth(
  async (req: NextRequest): Promise<NextResponse> => {
    try {
      const session = await auth.api.getSession({
        headers: req.headers,
      });

      const userId = session?.user.id;

      const body = await req.json();

      const user = await prisma.user.findUnique({
        where: { id: userId },
        select: {
          createdAt: true,
          utmTracking: true,
          toltData: true,
        },
      });

      const isNewUser =
        Date.now() - new Date(user?.createdAt!).getTime() < NEW_USER_WINDOW_MS;

      if (isNewUser) {
        await prisma.user.update({
          where: { id: userId },
          data: {
            ...(body.utmTracking &&
              !user?.utmTracking && { utmTracking: body.utmTracking }),
            ...(body.toltData &&
              !user?.toltData && { toltData: body.toltData }),
          },
        });

        if (
          body.utmTracking &&
          typeof body.utmTracking === 'object' &&
          body.utmTracking.tracker
        ) {
          try {
            const trackerValue = body.utmTracking.tracker;
            const exoClickUrl = `http://s.magsrv.com/tag.php?goal=d568aee27c097d13d806a4bed4ee7b93&tag=${encodeURIComponent(
              trackerValue,
            )}`;

            await fetch(exoClickUrl, {
              method: 'GET',
              signal: AbortSignal.timeout(5000),
            }).catch(() => {});
          } catch (exoClickError) {}
        }
      }

      return NextResponse.json('OK', { status: 200 });
    } catch (error) {
      return errorHandler(error);
    }
  },
);
