import { prisma } from '@/lib/db/client';
import { NextResponse } from 'next/server';
import { withAdminSecret } from '@/hoc/api/withAdminSecret';
import { errorHandler } from '@/utils/errors/errorHandler';

export const GET = withAdminSecret(async (request: Request): Promise<any> => {
  try {
    const users = await prisma.user.findMany({
      where: {
        identityVerificationStatus: 'pending',
        userType: 'creator',
      },
    });
    return NextResponse.json(users);
  } catch (error) {
    return errorHandler(error);
  }
});
