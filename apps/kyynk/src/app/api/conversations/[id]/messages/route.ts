import { NextRequest, NextResponse } from 'next/server';
import { strictlyAuth } from '@/hoc/strictlyAuth';
import { prisma } from '@/lib/db/client';
import { errorHandler } from '@/utils/errors/errorHandler';
import { errorMessages } from '@/lib/constants/errorMessage';
import { fetchMessagesByConversationId } from '@/services/conversations/fetchMessagesByConversationId';
import { messageSchema } from '@/schemas/conversations/messageSchema';
import { formatNudeWithPermissions } from '@/utils/nudes/formatNudeWithPermissions';
import { NudeFromPrisma } from '@/types/nudes';
import { validateMessageCreation } from '@/utils/conversations/validateMessageCreation';
import { createMessage } from '@/utils/conversations/createMessage';

export const GET = strictlyAuth(
  async (
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> },
  ): Promise<NextResponse> => {
    try {
      const { auth } = req;
      const userId = auth?.user.id;
      const { id: conversationId } = await params;

      if (!conversationId) {
        return NextResponse.json(
          { error: errorMessages.MISSING_FIELDS },
          { status: 400 },
        );
      }

      const isParticipant = await prisma.conversation.findFirst({
        where: {
          id: conversationId,
          participants: {
            some: {
              id: userId,
            },
          },
        },
      });

      if (!isParticipant) {
        return NextResponse.json(
          { error: errorMessages.NOT_AUTHORIZED },
          { status: 404 },
        );
      }

      await prisma.message.updateMany({
        where: {
          conversationId,
          status: 'sent',
          senderId: {
            not: userId,
          },
        },
        data: {
          status: 'read',
        },
      });

      const messages = await fetchMessagesByConversationId({ conversationId });

      const messagesWithPermissions = messages.map((message) => {
        if (message.attachment?.nude) {
          return {
            ...message,
            attachment: {
              ...message.attachment,
              nude: formatNudeWithPermissions(
                message.attachment.nude as NudeFromPrisma,
                userId,
              ),
            },
          };
        }
        return message;
      });

      return NextResponse.json(messagesWithPermissions, { status: 200 });
    } catch (error) {
      return errorHandler(error);
    }
  },
);

export const POST = strictlyAuth(
  async (req: NextRequest, { params }): Promise<NextResponse> => {
    try {
      const { auth } = req;
      const userId = auth?.user.id;
      const { id: conversationId } = params;
      const requestBody = await req.json();

      if (!conversationId) {
        return NextResponse.json(
          { error: errorMessages.MISSING_FIELDS },
          { status: 400 },
        );
      }

      const conversation = await prisma.conversation.findFirst({
        where: {
          id: conversationId,
          participants: { some: { id: userId } },
        },
        include: {
          participants: {
            select: {
              id: true,
              settings: { select: { creditMessage: true } },
              slug: true,
            },
          },
        },
      });

      if (!conversation) {
        return NextResponse.json(
          { error: errorMessages.NOT_AUTHORIZED },
          { status: 400 },
        );
      }

      const recipient = conversation.participants.find(
        (participant) => participant.id !== userId,
      );

      if (!recipient) {
        return NextResponse.json(
          { error: errorMessages.USER_NOT_FOUND },
          { status: 404 },
        );
      }

      // Validate the message creation
      const validation = await validateMessageCreation({
        userId: userId!,
        recipientSlug: recipient.slug,
      });

      if (!validation.isValid || !validation.data) {
        return NextResponse.json(
          { error: validation.error?.message },
          { status: validation.error?.status || 400 },
        );
      }

      // Validate message content
      const content = messageSchema.parse(requestBody.message);

      // Create message using the helper
      const message = await prisma.$transaction(async (tx) => {
        return createMessage({
          content,
          conversationId,
          senderId: userId!,
          recipientId: recipient.id,
          requiredCredits: recipient.settings?.creditMessage || 0,
          tx,
        });
      });

      return NextResponse.json(message, { status: 201 });
    } catch (error) {
      return errorHandler(error);
    }
  },
);
