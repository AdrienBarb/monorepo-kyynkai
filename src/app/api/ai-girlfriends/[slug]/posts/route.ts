import { errorMessages } from '@/lib/constants/errorMessage';
import { getPosts } from '@/services/ai-girlfriends-service/getPosts';
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

    const posts = await getPosts({ slug });

    return NextResponse.json(posts, { status: 200 });
  } catch (error) {
    return errorHandler(error);
  }
};
