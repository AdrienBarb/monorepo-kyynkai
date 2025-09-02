import { z } from 'zod';
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db/client';
import { errorHandler } from '@/utils/errors/errorHandler';
import { findOrCreateConversation } from '@/utils/conversations/findOrCreateConversation';
import { errorMessages } from '@/lib/constants/errorMessage';
import { MessageSender } from '@prisma/client';
import { auth } from '@/lib/better-auth/auth';
import { headers } from 'next/headers';
import { getCurrentUser } from '@/services/users/getCurrentUser';
import { MESSAGE_COST } from '@/constants/creditPackages';
import { getAiGirlfriendBySlug } from '@/services/ai-girlfriends/getAiGirlfriendBySlug';
import { getOrCreateGuest } from '@/services/guests/getOrCreateGuest';
import { generatePicture } from '@/services/ai-girlfriends/generatePicture';

const askPictureSchema = z.object({
  slug: z.string(),
  pictureType: z.enum(['ass', 'pussy', 'tits']),
});

const pictureMessages = {
  ass: 'Send me a picture of your ass',
  pussy: 'Send me a picture of your pussy',
  tits: 'Send me a picture of your tits',
} as const;

const pictureResponses = {
  ass: 'Here you go baby... my ass just for you 😏',
  pussy: 'Look what I have for you... my wet pussy 💦',
  tits: 'Just for you sweetheart... my tits 😘',
} as const;

export const POST = async (req: NextRequest) => {
  try {
    const h = await headers();
    const session = await auth.api.getSession({ headers: h });
    const userId = session?.user?.id ?? null;

    const body = await req.json();
    const payload = askPictureSchema.parse(body);

    const aiGirlfriend = await getAiGirlfriendBySlug({ slug: payload.slug });
    if (!aiGirlfriend) {
      return NextResponse.json(
        { error: errorMessages.NOT_FOUND },
        { status: 404 },
      );
    }

    const messageContent = pictureMessages[payload.pictureType];

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

        const userMessage = await tx.message.create({
          data: {
            content: messageContent,
            conversationId: conversation.id,
            sender: MessageSender.USER,
          },
        });

        const pictureId = await generatePicture({
          pictureType: payload.pictureType,
        });

        const aiMessage = await tx.message.create({
          data: {
            content: pictureResponses[payload.pictureType],
            conversationId: conversation.id,
            sender: MessageSender.AI,
            mediaId: pictureId,
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

        return { userMessage, aiMessage };
      });

      return NextResponse.json(result, { status: 201 });
    }

    const guest = await getOrCreateGuest();

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
      }

      const updated = await tx.conversation.updateMany({
        where: { id: conversation.id, freeGuestUsed: false },
        data: { freeGuestUsed: true },
      });
      if (updated.count === 0) {
        throw new Error(errorMessages.AUTH_REQUIRED);
      }

      const userMessage = await tx.message.create({
        data: {
          content: messageContent,
          conversationId: conversation.id,
          sender: MessageSender.USER,
        },
      });

      const pictureId = await generatePicture({
        pictureType: payload.pictureType,
      });

      const aiMessage = await tx.message.create({
        data: {
          content: pictureResponses[payload.pictureType],
          conversationId: conversation.id,
          sender: MessageSender.AI,
          mediaId: pictureId,
        },
      });

      return { userMessage, aiMessage };
    });

    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    if (
      error instanceof Error &&
      error.message === errorMessages.AUTH_REQUIRED
    ) {
      return NextResponse.json(
        { error: errorMessages.AUTH_REQUIRED },
        { status: 422 },
      );
    }

    return errorHandler(error);
  }
};
