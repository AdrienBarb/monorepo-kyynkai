import { errorMessages } from '@/lib/constants/errorMessage';
import { errorHandler } from '@/utils/errors/errorHandler';
import { strictlyAuth } from '@/hoc/strictlyAuth';
import { NextResponse, NextRequest } from 'next/server';
import { prisma } from '@/lib/db/client';
import { auth } from '@/lib/better-auth/auth';
import { z } from 'zod';
import { CreditSaleType } from '@prisma/client';
import { POST_UNLOCK_COST } from '@/constants/creditPackages';

const unlockMediaSchema = z.object({
  mediaId: z.string(),
});

export const PUT = strictlyAuth(async (req: NextRequest) => {
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

    const body = await req.json();
    const { mediaId } = unlockMediaSchema.parse(body);

    const media = await prisma.media.findUnique({
      where: { id: mediaId },
      select: {
        id: true,
        visibility: true,
        unlockUsers: true,
      },
    });

    if (!media) {
      return NextResponse.json(
        { error: errorMessages.NOT_FOUND },
        { status: 404 },
      );
    }

    if (media.visibility !== 'PRIVATE') {
      return NextResponse.json(
        { error: 'Media is not private' },
        { status: 400 },
      );
    }

    if (media.unlockUsers.includes(userId)) {
      return NextResponse.json(
        { message: 'Media already unlocked' },
        { status: 200 },
      );
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { creditBalance: true },
    });

    if (!user || user.creditBalance < POST_UNLOCK_COST) {
      return NextResponse.json(
        { error: errorMessages.INSUFFICIENT_CREDITS },
        { status: 400 },
      );
    }

    const result = await prisma.$transaction(async (tx) => {
      await tx.media.update({
        where: { id: mediaId },
        data: {
          unlockUsers: {
            push: userId,
          },
        },
      });

      await tx.user.update({
        where: { id: userId },
        data: {
          creditBalance: { decrement: POST_UNLOCK_COST },
        },
      });

      await tx.creditSale.create({
        data: {
          userId: userId,
          type: CreditSaleType.MEDIA,
          amount: POST_UNLOCK_COST,
        },
      });

      return { success: true };
    });

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    return errorHandler(error);
  }
});
