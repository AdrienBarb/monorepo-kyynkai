import { NextRequest, NextResponse } from 'next/server';
import { errorHandler } from '@/utils/errors/errorHandler';
import { auth } from '@/lib/better-auth/auth';
import { headers } from 'next/headers';
import { playFantasyChoiceSchema } from '@/schemas/fantasies/playFantasyChoiceSchema';
import { playFantasyChoice } from '@/services/fantasies/playFantasyChoice';

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();

    const session = await auth.api.getSession({
      headers: await headers(),
    });
    const userId = session?.user?.id;

    const validatedBody = playFantasyChoiceSchema.parse(body);

    const result = await playFantasyChoice({
      userId: userId ?? null,
      ...validatedBody,
    });

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    return errorHandler(error);
  }
};
