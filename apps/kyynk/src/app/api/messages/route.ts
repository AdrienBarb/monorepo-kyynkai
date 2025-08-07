import { z } from 'zod';
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db/client';
import { errorHandler } from '@/utils/errors/errorHandler';
import { strictlyAuth } from '@/hoc/strictlyAuth';
import { findOrCreateConversation } from '@/utils/conversations/findOrCreateConversation';
import { getAiGirlfriendBySlug } from '@/services/users/getAiGirlfriendBySlug';
import { errorMessages } from '@/lib/constants/errorMessage';
import { MessageSender } from '@prisma/client';
import { auth } from '@/lib/better-auth/auth';
import { headers } from 'next/headers';

const conversationSchema = z.object({
  slug: z.string(),
  message: z.string(),
});

export const POST = strictlyAuth(async (req: NextRequest) => {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    const userId = session?.user?.id;

    const body = await req.json();
    const payload = conversationSchema.parse(body);

    const aiGirlfriend = await getAiGirlfriendBySlug({
      slug: payload.slug,
    });

    if (!aiGirlfriend) {
      return NextResponse.json(
        { error: errorMessages.NOT_FOUND },
        { status: 404 },
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

      return message;
    });

    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    return errorHandler(error);
  }
});

export const GET = strictlyAuth(async (req: NextRequest) => {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    const userId = session?.user?.id;

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
    });

    return NextResponse.json(messages, { status: 200 });
  } catch (error) {
    return errorHandler(error);
  }
});
