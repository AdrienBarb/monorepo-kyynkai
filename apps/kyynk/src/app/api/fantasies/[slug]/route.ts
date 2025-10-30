import { errorMessages } from '@/lib/constants/errorMessage';
import { getFantasiesBySlug } from '@/services/fantasies/getFantasiesBySlug';
import { errorHandler } from '@/utils/errors/errorHandler';
import { NextResponse } from 'next/server';
import { auth } from '@/lib/better-auth/auth';
import { headers } from 'next/headers';

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

    const session = await auth.api.getSession({
      headers: await headers(),
    });
    const userId = session?.user?.id;

    const fantasies = await getFantasiesBySlug({ slug, userId });

    return NextResponse.json(fantasies, { status: 200 });
  } catch (error) {
    return errorHandler(error);
  }
};
