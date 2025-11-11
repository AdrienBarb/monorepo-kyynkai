import { inngest } from './client';
import { prisma } from '@/lib/db/client';
import { Resend } from 'resend';
import FreeCreditEmail from '@/emails/FreeCreditEmail';

const resend = new Resend(process.env.RESEND_API_KEY);

const FREE_CREDITS_AMOUNT = 5;
const WEEK_IN_MS = 7 * 24 * 60 * 60 * 1000;

export const freeCreditCron = inngest.createFunction(
  { id: 'free-credit-daily' },
  { cron: '0 9 * * *' },
  async ({ step }) => {
    const now = new Date();

    const eligibleUsers = await step.run('find-eligible-users', () =>
      prisma.user.findMany({
        where: {
          emailVerified: true,
          OR: [
            { lastClaimFreeCredit: null },
            {
              lastClaimFreeCredit: {
                lte: new Date(now.getTime() - WEEK_IN_MS),
              },
            },
          ],
        },
        select: { id: true, email: true, name: true },
      }),
    );

    console.log(
      `Found ${eligibleUsers.length} users eligible for free credits`,
    );

    for (const user of eligibleUsers) {
      await step.run(`email-${user.id}`, async () => {
        const ctaUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/?claimFreeCredit=true`;

        await resend.emails.send({
          from: 'noreply@kyynk.com',
          to: user.email!,
          subject: `Claim Your ${FREE_CREDITS_AMOUNT} Free Credits`,
          react: FreeCreditEmail({
            userName: user.name,
            ctaUrl,
            creditsAmount: FREE_CREDITS_AMOUNT,
          }),
        });
      });
    }
  },
);
