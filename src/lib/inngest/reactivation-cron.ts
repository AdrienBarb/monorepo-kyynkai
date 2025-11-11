import { inngest } from './client';
import { prisma } from '@/lib/db/client';
import { Resend } from 'resend';
import ReactivationEmail from '@/emails/ReactivationEmail';
import imgixLoader from '@/lib/imgix/loader';

const resend = new Resend(process.env.RESEND_API_KEY);

const sexyMessages = [
  "Hey babe, you miss me. Don't you want to come play with me?",
  'Babe, please, come fuck me',
  "I've been thinking about you... Want to come see what I have in mind?",
  "Hey handsome, I'm waiting for you. Don't make me wait too long 😈",
  'I need you right now. Come play with me, baby',
  'You know you want me. Why are you staying away?',
  "I'm all alone and thinking about you... Come keep me company",
  "Hey babe, I've got something special waiting for you",
  "I've been so horny thinking about you. Come satisfy me",
  "Don't you want to see what I'm wearing? Come find out",
  'I need your touch right now. Please come to me',
  "Hey baby, I'm wet and waiting for you. Come play",
  "I've been touching myself thinking about you. Want to join?",
  'Come fuck me, I need you inside me right now',
  "I'm so turned on thinking about you. Don't make me wait",
];

function getRandomMessage(): string {
  return sexyMessages[Math.floor(Math.random() * sexyMessages.length)];
}

export const reactivationCron = inngest.createFunction(
  { id: 'reactivation-daily' },
  { cron: '0 8 * * *' },
  async ({ step }) => {
    const cutoff = new Date(Date.now() - 3 * 24 * 60 * 60 * 1000);

    const inactiveUsers = await step.run('find-inactive-users', () =>
      prisma.user.findMany({
        where: {
          sessions: { none: { updatedAt: { gte: cutoff } } },
          emailVerified: true,
        },
        select: { id: true, email: true, name: true },
      }),
    );

    const activeFantasies = await step.run('get-active-fantasies', () =>
      prisma.fantasy.findMany({
        where: { isActive: true },
        include: {
          aiGirlfriend: {
            select: {
              pseudo: true,
              slug: true,
              profileImageId: true,
            },
          },
        },
      }),
    );

    if (activeFantasies.length === 0) {
      console.log('No active fantasies found, skipping reactivation emails');
      return;
    }

    console.log(
      `Found ${inactiveUsers.length} inactive users and ${activeFantasies.length} active fantasies`,
    );

    for (const user of inactiveUsers) {
      await step.run(`email-${user.id}`, async () => {
        const randomFantasy =
          activeFantasies[Math.floor(Math.random() * activeFantasies.length)];
        const fantasyUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/fantasy/${randomFantasy.id}`;
        const message = getRandomMessage();
        const girlName = randomFantasy.aiGirlfriend.pseudo;
        const profileImageUrl = imgixLoader({
          src: randomFantasy.aiGirlfriend.profileImageId || '',
          width: 400,
          quality: 90,
        });

        await resend.emails.send({
          from: 'noreply@kyynk.com',
          to: user.email!,
          subject: `${girlName}: ${message}`,
          react: ReactivationEmail({
            ctaUrl: fantasyUrl,
            message,
            girlName,
            profileImageUrl,
          }),
        });
      });
    }
  },
);
