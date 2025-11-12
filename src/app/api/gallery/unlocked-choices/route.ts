import { NextRequest, NextResponse } from 'next/server';
import { errorHandler } from '@/utils/errors/errorHandler';
import { strictlyAuth } from '@/hoc/strictlyAuth';
import { getUnlockedChoices } from '@/services/gallery/getUnlockedChoices';

export const GET = strictlyAuth(async (req: NextRequest, session: any) => {
  try {
    const userId = session?.user?.id;

    if (!userId) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 401 },
      );
    }

    const unlockedChoices = await getUnlockedChoices({ userId });

    return NextResponse.json(unlockedChoices, { status: 200 });
  } catch (error) {
    return errorHandler(error);
  }
});

