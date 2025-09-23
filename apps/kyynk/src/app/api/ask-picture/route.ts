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
import { getOrCreateGuest } from '@/services/guests/getOrCreateGuest';
import {
  checkGuestMessageLimit,
  incrementGuestMessageCount,
} from '@/services/guests/checkGuestMessageLimit';
import { getMediaProposalById } from '@/services/ai-girlfriends-service/getMediaProposalById';

const askPictureSchema = z.object({
  slug: z.string(),
  proposalId: z.string(),
});

export const POST = async (req: NextRequest) => {
  try {
    const h = await headers();
    const session = await auth.api.getSession({ headers: h });
    const userId = session?.user?.id ?? null;

    const body = await req.json();
    const payload = askPictureSchema.parse(body);

    const proposal = await getMediaProposalById({
      proposalId: payload.proposalId,
      slug: payload.slug,
    });

    if (!proposal) {
      return NextResponse.json(
        { error: errorMessages.NOT_FOUND },
        { status: 404 },
      );
    }

    if (userId) {
      const loggedUser = await getCurrentUser({
        userId: userId!,
      });

      if (proposal.creditCost > loggedUser?.creditBalance!) {
        return NextResponse.json(
          { error: errorMessages.INSUFFICIENT_CREDITS },
          { status: 400 },
        );
      }

      const result = await prisma.$transaction(async (tx) => {
        const conversation = await findOrCreateConversation({
          userId: userId!,
          aiGirlfriendId: proposal.aiGirlfriendId,
          tx,
        });

        const media = await tx.media.create({
          data: {
            type: proposal.mediaType as 'IMAGE' | 'VIDEO',
            mediaKey: proposal.mediaKey,
          },
        });

        const aiMessage = await tx.message.create({
          data: {
            content: proposal.message,
            conversationId: conversation.id,
            sender: MessageSender.AI,
            mediaId: media.id,
          },
        });

        return aiMessage;
      });

      return NextResponse.json(result, { status: 201 });
    }

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
        where: { guestId: guest.id, aiGirlfriendId: proposal.aiGirlfriendId },
      });

      if (!conversation) {
        conversation = await tx.conversation.create({
          data: {
            guestId: guest.id,
            aiGirlfriendId: proposal.aiGirlfriendId,
          },
        });
      }

      const media = await tx.media.create({
        data: {
          type: proposal.mediaType as 'IMAGE' | 'VIDEO',
          mediaKey: proposal.mediaKey,
        },
      });

      const aiMessage = await tx.message.create({
        data: {
          content: proposal.message,
          conversationId: conversation.id,
          sender: MessageSender.AI,
          mediaId: media.id,
        },
      });

      await incrementGuestMessageCount(guest.id);

      return aiMessage;
    });

    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    return errorHandler(error);
  }
};
