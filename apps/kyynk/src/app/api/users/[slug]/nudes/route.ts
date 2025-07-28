import { NextRequest, NextResponse } from 'next/server';
import { errorMessages } from '@/lib/constants/errorMessage';
import { errorHandler } from '@/utils/errors/errorHandler';
import { prisma } from '@/lib/db/client';
import { getUserNudesById } from '@/services/nudes/getUserNudesById';
import { formatNudeWithPermissions } from '@/utils/nudes/formatNudeWithPermissions';
import { auth } from '@/auth';
import { NudeFromPrisma } from '@/types/nudes';

export const GET = async (
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
): Promise<NextResponse> => {
  try {
    const session = await auth();
    const { slug } = await params;

    if (!slug || Array.isArray(slug)) {
      return NextResponse.json(
        { error: errorMessages.MISSING_FIELDS },
        { status: 400 },
      );
    }

    const user = await prisma.user.findUnique({
      where: { slug },
      select: { id: true },
    });

    if (!user) {
      return NextResponse.json(
        { error: errorMessages.USER_NOT_FOUND },
        { status: 404 },
      );
    }

    const nudes = (await getUserNudesById({
      userId: user.id,
    })) as NudeFromPrisma[];

    const nudesWithPermissions = nudes.map((currentNude) =>
      formatNudeWithPermissions(currentNude, session?.user.id),
    );

    return NextResponse.json(nudesWithPermissions, { status: 200 });
  } catch (error) {
    return errorHandler(error);
  }
};
