import { getAiGirlfriends } from '@/services/ai-girlfriends-service/getAiGirlfriends';
import { errorHandler } from '@/utils/errors/errorHandler';
import { NextResponse } from 'next/server';

export const GET = async (req: Request) => {
  try {
    const users = await getAiGirlfriends();

    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    return errorHandler(error);
  }
};
