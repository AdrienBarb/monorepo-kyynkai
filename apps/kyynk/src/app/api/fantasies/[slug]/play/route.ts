import { NextRequest, NextResponse } from 'next/server';
import { errorHandler } from '@/utils/errors/errorHandler';
import { errorMessages } from '@/lib/constants/errorMessage';
import { auth } from '@/lib/better-auth/auth';
import { headers } from 'next/headers';
import { playFantasyChoiceSchema } from '@/schemas/fantasies/playFantasyChoiceSchema';
import { playFantasyChoice } from '@/services/fantasies/playFantasyChoice';

export const POST = async (
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
) => {
  try {
    const { slug } = await params;
    const body = await req.json();

    const session = await auth.api.getSession({
      headers: await headers(),
    });
    const userId = session?.user?.id;

    if (!slug || Array.isArray(slug)) {
      return NextResponse.json(
        { error: errorMessages.MISSING_FIELDS },
        { status: 400 },
      );
    }

    const validatedBody = playFantasyChoiceSchema.parse(body);

    const result = await playFantasyChoice({
      userId: userId ?? null,
      slug,
      ...validatedBody,
    });

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    return errorHandler(error);
  }
};
