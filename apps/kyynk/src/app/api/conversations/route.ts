import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { strictlyAuth } from '@/hoc/strictlyAuth';
import { prisma } from '@/lib/db/client';
import { errorHandler } from '@/utils/errors/errorHandler';
import { getUserConversations } from '@/services/conversations/getUserConversations';
import { messageSchema } from '@/schemas/conversations/messageSchema';
import { validateMessageCreation } from '@/utils/conversations/validateMessageCreation';
import { findOrCreateConversation } from '@/utils/conversations/findOrCreateConversation';
import { createMessage } from '@/utils/conversations/createMessage';
import { auth } from '@/auth';

const conversationSchema = z.object({
  slug: z.string(),
  message: z.string(),
});

export const POST = strictlyAuth(async (req: NextRequest) => {
  try {
    const { auth } = req;
    const userId = auth?.user.id;

    const body = await req.json();
    const payload = conversationSchema.parse(body);

    // Validate the message creation
    const validation = await validateMessageCreation({
      userId: userId!,
      recipientSlug: payload.slug,
    });

    if (!validation.isValid || !validation.data) {
      return NextResponse.json(
        { error: validation.error?.message },
        { status: validation.error?.status || 400 },
      );
    }

    const { recipient } = validation.data;
    const requiredCredits = recipient.settings?.creditMessage || 0;

    // Validate message content
    const content = messageSchema.parse(payload.message);

    // Handle conversation and message creation in a transaction
    const result = await prisma.$transaction(async (tx) => {
      const conversation = await findOrCreateConversation({
        userId: userId!,
        recipientId: recipient.id,
        tx,
      });

      await createMessage({
        content,
        conversationId: conversation.id,
        senderId: userId!,
        recipientId: recipient.id,
        requiredCredits,
        tx,
      });

      return conversation;
    });

    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    return errorHandler(error);
  }
});

export const GET = async (req: NextRequest) => {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json([], { status: 200 });
    }

    const conversations = await getUserConversations({
      userId: session.user.id,
    });

    return NextResponse.json(conversations, { status: 200 });
  } catch (error) {
    return errorHandler(error);
  }
};
