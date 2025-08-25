import { NextRequest, NextResponse } from 'next/server';
import { updateAdminAiGirlfriend } from '@/services/admin/updateAdminAiGirlfriend';
import { errorHandler } from '@/utils/errors/errorHandler';
import { withAdminSecret } from '@/hoc/withAdminSecret';
import { z } from 'zod';
import { getAdminAiGirlfriend } from '@/services/admin/getAdminAiGirlfriend';

const updateSchema = z.object({
  isActive: z.boolean().optional(),
});

export const PUT = withAdminSecret(
  async (req: NextRequest, { params }: { params: Promise<{ id: string }> }) => {
    try {
      const { id } = await params;
      const body = await req.json();
      const payload = updateSchema.parse(body);

      const updatedAiGirlfriend = await updateAdminAiGirlfriend(id, payload);

      return NextResponse.json(updatedAiGirlfriend, { status: 200 });
    } catch (error) {
      return errorHandler(error);
    }
  },
);

export const GET = withAdminSecret(
  async (req: NextRequest, { params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params;
    const aiGirlfriend = await getAdminAiGirlfriend(id);
    return NextResponse.json(aiGirlfriend, { status: 200 });
  },
);
