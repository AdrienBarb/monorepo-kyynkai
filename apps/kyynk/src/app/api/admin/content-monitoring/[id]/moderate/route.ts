import { prisma } from '@/lib/db/client';
import { NextResponse } from 'next/server';
import { withAdminSecret } from '@/hoc/api/withAdminSecret';
import { errorHandler } from '@/utils/errors/errorHandler';
import { z } from 'zod';
import { ModerationStatus } from '@prisma/client';
import { auth } from '@/auth';
import { resendClient } from '@/lib/resend/resendClient';
import ContentRejectedEmail from '@kyynk/transactional/emails/ContentRejectedEmail';
import { CONTACT_EMAIL } from '@/constants/constants';

const moderateSchema = z.object({
  status: z.enum([ModerationStatus.approved, ModerationStatus.rejected]),
  reason: z.string().optional(),
});

export const PUT = withAdminSecret(
  async (req: Request, { params }: { params: Promise<{ id: string }> }) => {
    try {
      const { id: nudeId } = await params;
      const body = await req.json();
      const { status, reason } = moderateSchema.parse(body);

      const session = await auth();
      const adminId = session?.user?.id;

      if (!adminId) {
        return NextResponse.json(
          { error: 'Admin authentication required' },
          { status: 401 },
        );
      }

      const nude = await prisma.nude.findUnique({
        where: { id: nudeId },
        include: {
          user: {
            select: {
              id: true,
              email: true,
              pseudo: true,
              slug: true,
            },
          },
        },
      });

      if (!nude) {
        return NextResponse.json({ error: 'Nude not found' }, { status: 404 });
      }

      const updatedNude = await prisma.nude.update({
        where: { id: nudeId },
        data: {
          moderationStatus: status,
          moderatedBy: adminId,
          moderatedAt: new Date(),
          moderationReason: reason,
        },
      });

      // Send email notification if content is rejected
      if (status === ModerationStatus.rejected) {
        await resendClient.emails.send({
          from: CONTACT_EMAIL,
          to: nude.user.email,
          subject: 'Your content has been rejected',
          react: ContentRejectedEmail({
            contentDescription: nude.description || undefined,
            rejectionReason: reason || undefined,
            creatorName: nude.user.pseudo,
          }),
        });
      }

      return NextResponse.json(updatedNude, { status: 200 });
    } catch (error) {
      return errorHandler(error);
    }
  },
);
