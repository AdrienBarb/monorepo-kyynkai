import { errorMessages } from '@/lib/constants/errorMessage';
import { getFantasiesBySlug } from '@/services/fantasies/getFantasiesBySlug';
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

    const fantasies = await getFantasiesBySlug({ slug });

    return NextResponse.json(fantasies, { status: 200 });
  } catch (error) {
    return errorHandler(error);
  }
};
