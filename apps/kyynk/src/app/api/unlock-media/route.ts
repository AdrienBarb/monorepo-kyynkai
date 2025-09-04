import { z } from 'zod';
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db/client';
import { errorHandler } from '@/utils/errors/errorHandler';
import { errorMessages } from '@/lib/constants/errorMessage';
import { strictlyAuth } from '@/hoc/strictlyAuth';
import { getCurrentUser } from '@/services/users/getCurrentUser';
import { MEDIA_UNLOCK_COST } from '@/constants/creditPackages';
import { auth } from '@/lib/better-auth/auth';
import { CreditSaleType } from '@prisma/client';

const unlockMediaSchema = z.object({
  messageId: z.string(),
});

export const POST = strictlyAuth(async (req: NextRequest) => {
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
    const payload = unlockMediaSchema.parse(body);

    const message = await prisma.message.findUnique({
      where: { id: payload.messageId },
      include: {
        media: true,
      },
    });

    if (!message) {
      return NextResponse.json(
        { error: errorMessages.NOT_FOUND },
        { status: 404 },
      );
    }

    if (!message.media) {
      return NextResponse.json(
        { error: 'Message has no media attached' },
        { status: 400 },
      );
    }

    const loggedUser = await getCurrentUser({
      userId: userId!,
    });

    if (MEDIA_UNLOCK_COST > loggedUser?.creditBalance!) {
      return NextResponse.json(
        { error: errorMessages.INSUFFICIENT_CREDITS },
        { status: 400 },
      );
    }

    if (message.media.unlockUsers.includes(userId)) {
      return NextResponse.json(
        { message: 'Media already unlocked', unlocked: true },
        { status: 200 },
      );
    }

    const result = await prisma.$transaction(async (tx) => {
      const updatedMedia = await tx.media.update({
        where: { id: message.media!.id },
        data: {
          unlockUsers: {
            push: userId,
          },
        },
      });

      await tx.user.update({
        where: {
          id: userId!,
        },
        data: {
          creditBalance: { decrement: MEDIA_UNLOCK_COST },
        },
      });

      await tx.creditSale.create({
        data: {
          userId: userId!,
          type: CreditSaleType.MEDIA,
          amount: MEDIA_UNLOCK_COST,
        },
      });

      return updatedMedia;
    });

    return NextResponse.json(
      { unlocked: true, media: result },
      { status: 201 },
    );
  } catch (error) {
    return errorHandler(error);
  }
});
