import { errorMessages } from '@/lib/constants/errorMessage';
import { getAiGirlfriendBySlug } from '@/services/ai-girlfriends/getAiGirlfriendBySlug';
import { errorHandler } from '@/utils/errors/errorHandler';
import { NextResponse } from 'next/server';

export const GET = async (
  req: Request,
  { params }: { params: Promise<{ slug: string }> },
) => {
  try {
    const { slug } = await params;

    if (!slug || Array.isArray(slug)) {
      return NextResponse.json(
        { error: errorMessages.MISSING_FIELDS },
        { status: 400 },
      );
    }

    const aiGirlfriend = await getAiGirlfriendBySlug({ slug });

    if (!aiGirlfriend) {
      return NextResponse.json(
        { error: errorMessages.MISSING_FIELDS },
        { status: 404 },
      );
    }

    return NextResponse.json(aiGirlfriend, { status: 200 });
  } catch (error) {
    return errorHandler(error);
  }
};
