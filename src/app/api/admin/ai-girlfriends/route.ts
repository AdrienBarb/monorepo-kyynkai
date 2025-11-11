import { NextRequest, NextResponse } from 'next/server';
import { errorHandler } from '@/utils/errors/errorHandler';
import { withAdminSecret } from '@/hoc/withAdminSecret';
import { getAdminAiGirlfriends } from '@/services/admin/getAdminAiGirlfriends';

export const GET = withAdminSecret(async (req: NextRequest) => {
  try {
    const aiGirlfriends = await getAdminAiGirlfriends();
    return NextResponse.json(aiGirlfriends, { status: 200 });
  } catch (error) {
    return errorHandler(error);
  }
});
