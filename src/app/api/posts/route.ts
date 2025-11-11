import { errorMessages } from '@/lib/constants/errorMessage';
import { getAllPosts } from '@/services/posts/getAllPosts';
import { errorHandler } from '@/utils/errors/errorHandler';
import { NextResponse } from 'next/server';

export const GET = async (req: Request) => {
  try {
    const { searchParams } = new URL(req.url);
    const limit = searchParams.get('limit')
      ? parseInt(searchParams.get('limit')!)
      : undefined;
    const cursor = searchParams.get('cursor') || undefined;

    const result = await getAllPosts({ limit, cursor });

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    return errorHandler(error);
  }
};
