import { NextRequest, NextResponse } from 'next/server';
import { errorHandler } from '@/utils/errors/errorHandler';
import { getUserConversations } from '@/services/conversations/getUserConversations';
import { auth } from '@/lib/better-auth/auth';
import { headers } from 'next/headers';

export const GET = async (req: NextRequest) => {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

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
