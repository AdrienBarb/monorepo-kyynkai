import { NextRequest, NextResponse } from 'next/server';
import { errorHandler } from '@/utils/errors/errorHandler';
import { getUserConversations } from '@/services/conversations/getUserConversations';
import { auth } from '@/lib/better-auth/auth';
import { cookies, headers } from 'next/headers';
import { prisma } from '@/lib/db/client';
import { getConversationsFields } from '@/utils/conversations/getConversationsFields';

export const GET = async (req: NextRequest) => {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });
    const userId = session?.user?.id ?? null;

    if (userId) {
      const conversations = await getUserConversations({
        userId: userId,
      });

      return NextResponse.json(conversations, { status: 200 });
    }

    const guestId = (await cookies()).get('guest_id')?.value;
    if (!guestId) {
      return NextResponse.json([], { status: 200 });
    }

    const conversations = await prisma.conversation.findMany({
      where: {
        guestId,
      },
      select: getConversationsFields,
      orderBy: {
        updatedAt: 'desc',
      },
    });

    return NextResponse.json(conversations, { status: 200 });
  } catch (error) {
    return errorHandler(error);
  }
};
