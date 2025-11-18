import { getFantasiesByTag } from '@/services/fantasies/getFantasiesByTag';
import { errorHandler } from '@/utils/errors/errorHandler';
import { NextResponse } from 'next/server';

export const GET = async (req: Request) => {
  try {
    const { searchParams } = new URL(req.url);
    const tag = searchParams.get('tag') || undefined;

    const fantasies = await getFantasiesByTag(tag);

    return NextResponse.json(fantasies, { status: 200 });
  } catch (error) {
    return errorHandler(error);
  }
};
