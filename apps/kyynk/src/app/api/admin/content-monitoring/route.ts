import { prisma } from '@/lib/db/client';
import { NextResponse } from 'next/server';
import { withAdminSecret } from '@/hoc/api/withAdminSecret';
import { errorHandler } from '@/utils/errors/errorHandler';
import { getNudeSelectFields } from '@/utils/nudes/getNudeSelectFields';

export const GET = withAdminSecret(async (request: Request): Promise<any> => {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const offset = (page - 1) * limit;

    const whereClause: any = {
      isPrivate: false,
    };

    if (status && status !== 'all') {
      whereClause.moderationStatus = status;
    }

    const [nudes, totalCount] = await Promise.all([
      prisma.nude.findMany({
        where: whereClause,
        orderBy: {
          createdAt: 'desc',
        },
        skip: offset,
        take: limit,
        select: {
          ...getNudeSelectFields(),
          moderationStatus: true,
          moderatedBy: true,
          moderatedAt: true,
          moderationReason: true,
        },
      }),
      prisma.nude.count({
        where: whereClause,
      }),
    ]);

    return NextResponse.json({
      nudes,
      pagination: {
        page,
        limit,
        total: totalCount,
        totalPages: Math.ceil(totalCount / limit),
      },
    });
  } catch (error) {
    return errorHandler(error);
  }
});
