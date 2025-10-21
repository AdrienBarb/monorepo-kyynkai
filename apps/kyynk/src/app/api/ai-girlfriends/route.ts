import { getAiGirlfriends } from '@/services/ai-girlfriends-service/getAiGirlfriends';
import { errorHandler } from '@/utils/errors/errorHandler';
import { NextResponse } from 'next/server';

export const maxDuration = 30;
export const revalidate = 300;

export const GET = async (req: Request) => {
  try {
    const users = await getAiGirlfriends();

    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    return errorHandler(error);
  }
};
