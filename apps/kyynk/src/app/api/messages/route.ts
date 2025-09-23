import { z } from 'zod';
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db/client';
import { errorHandler } from '@/utils/errors/errorHandler';
import { strictlyAuth } from '@/hoc/strictlyAuth';
import { findOrCreateConversation } from '@/utils/conversations/findOrCreateConversation';
import { errorMessages } from '@/lib/constants/errorMessage';
import { CreditSaleType, MessageSender } from '@prisma/client';
import { auth } from '@/lib/better-auth/auth';
import { cookies, headers } from 'next/headers';
import { getCurrentUser } from '@/services/users/getCurrentUser';
import { MESSAGE_COST } from '@/constants/creditPackages';
import { getAiGirlfriendBySlug } from '@/services/ai-girlfriends-service/getAiGirlfriendBySlug';
import { getOrCreateGuest } from '@/services/guests/getOrCreateGuest';
import { getGuestFromCookie } from '@/services/guests/getGuestFromCookie';
import {
  checkGuestMessageLimit,
  incrementGuestMessageCount,
} from '@/services/guests/checkGuestMessageLimit';
import { sendPostHogEvent } from '@/utils/tracking/sendPostHogEvent';

const conversationSchema = z.object({
  slug: z.string(),
  message: z.string(),
});

export const POST = async (req: NextRequest) => {
  try {
    const h = await headers();
    const session = await auth.api.getSession({ headers: h });
    const userId = session?.user?.id ?? null;

    const body = await req.json();
    const payload = conversationSchema.parse(body);

    const aiGirlfriend = await getAiGirlfriendBySlug({ slug: payload.slug });
    if (!aiGirlfriend) {
      return NextResponse.json(
        { error: errorMessages.NOT_FOUND },
        { status: 404 },
      );
    }

    // User
    if (userId) {
      const loggedUser = await getCurrentUser({
        userId: userId!,
      });

      if (MESSAGE_COST > loggedUser?.creditBalance!) {
        return NextResponse.json(
          { error: errorMessages.INSUFFICIENT_CREDITS },
          { status: 400 },
        );
      }

      const result = await prisma.$transaction(async (tx) => {
        const conversation = await findOrCreateConversation({
          userId: userId!,
          aiGirlfriendId: aiGirlfriend.id,
          tx,
        });

        const message = await tx.message.create({
          data: {
            content: payload.message,
            conversationId: conversation.id,
            sender: MessageSender.USER,
          },
        });

        await tx.user.update({
          where: {
            id: userId!,
          },
          data: {
            creditBalance: { decrement: MESSAGE_COST },
          },
        });

        await tx.creditSale.create({
          data: {
            userId: userId!,
            type: CreditSaleType.CHAT,
            amount: MESSAGE_COST,
          },
        });

        return message;
      });

      return NextResponse.json(result, { status: 201 });
    }

    // Guest
    const guest = await getOrCreateGuest();

    const canSendMessage = await checkGuestMessageLimit(guest.id);
    if (!canSendMessage) {
      return NextResponse.json(
        { error: errorMessages.AUTH_REQUIRED },
        { status: 422 },
      );
    }

    const result = await prisma.$transaction(async (tx) => {
      let conversation = await tx.conversation.findFirst({
        where: { guestId: guest.id, aiGirlfriendId: aiGirlfriend.id },
      });

      if (!conversation) {
        conversation = await tx.conversation.create({
          data: {
            guestId: guest.id,
            aiGirlfriendId: aiGirlfriend.id,
          },
        });

        sendPostHogEvent({
          distinctId: guest.id,
          event: 'guest_conversation_created',
        });
      }

      const message = await tx.message.create({
        data: {
          content: payload.message,
          conversationId: conversation.id,
          sender: MessageSender.USER,
        },
      });

      await incrementGuestMessageCount(guest.id);

      return message;
    });

    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    return errorHandler(error);
  }
};

export const GET = async (req: NextRequest) => {
  try {
    const h = await headers();
    const session = await auth.api.getSession({
      headers: h,
    });
    const userId = session?.user?.id ?? null;

    const searchParams = req.nextUrl.searchParams;
    const slug = searchParams.get('slug');

    const aiGirlfriend = await getAiGirlfriendBySlug({
      slug: slug as string,
    });

    if (!aiGirlfriend) {
      return NextResponse.json(
        { error: errorMessages.NOT_FOUND },
        { status: 404 },
      );
    }

    if (userId) {
      const conversation = await prisma.conversation.findFirst({
        where: {
          aiGirlfriendId: aiGirlfriend.id,
          userId: userId!,
        },
      });

      if (!conversation) {
        return NextResponse.json([], { status: 200 });
      }

      const messages = await prisma.message.findMany({
        where: {
          conversationId: conversation.id,
        },
        include: {
          media: true,
        },
      });

      return NextResponse.json(messages, { status: 200 });
    }

    const guest = await getGuestFromCookie();
    if (!guest) {
      return NextResponse.json([], { status: 200 });
    }

    const conversation = await prisma.conversation.findFirst({
      where: { aiGirlfriendId: aiGirlfriend.id, guestId: guest.id },
    });
    if (!conversation) {
      return NextResponse.json([], { status: 200 });
    }

    const messages = await prisma.message.findMany({
      where: { conversationId: conversation.id },
      include: {
        media: true,
      },
    });

    return NextResponse.json(messages, { status: 200 });
  } catch (error) {
    return errorHandler(error);
  }
};
