import { NextRequest, NextResponse } from 'next/server';
import { updateAdminAiGirlfriend } from '@/services/admin/updateAdminAiGirlfriend';
import { errorHandler } from '@/utils/errors/errorHandler';
import { withAdminSecret } from '@/hoc/withAdminSecret';
import { getAdminAiGirlfriend } from '@/services/admin/getAdminAiGirlfriend';
import { aiGirlfriendSchema } from '@/schemas/ai-girlfriends/aiGirlfriendSchema';
import slugify from 'slugify';
import { prisma } from '@/lib/db/client';

export const PUT = withAdminSecret(
  async (req: NextRequest, { params }: { params: Promise<{ id: string }> }) => {
    try {
      const { id } = await params;
      const body = await req.json();
      const payload = aiGirlfriendSchema.parse(body);

      const updatedAiGirlfriend = await updateAdminAiGirlfriend(id, {
        pseudo: payload.pseudo,
        slug: slugify(payload.pseudo, { lower: true, strict: true }),
        archetype: payload.archetype,
        traits: payload.traits,
        hook: payload.hook,
        isActive: payload.isActive,
      });

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

export const DELETE = withAdminSecret(
  async (req: NextRequest, { params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params;
    const aiGirlfriend = await prisma.aIGirlfriend.delete({
      where: {
        id,
      },
    });
    return NextResponse.json(aiGirlfriend, { status: 200 });
  },
);
