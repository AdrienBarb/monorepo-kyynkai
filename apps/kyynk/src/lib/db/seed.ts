import { PrismaClient, UserType, VerificationStatus } from '@prisma/client';
import { readFile } from 'fs/promises';
import { join } from 'path';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

interface SeedUser {
  pseudo: string;
  profileImageUrl: string;
  description: string;
  nudes: {
    description: string;
    thumbnail: string;
    videoKey: string;
    fiatPrice: number;
  }[];
}

async function main() {
  try {
    const seedDataPath = join(process.cwd(), 'src/lib/db/seed.json');
    const seedData: SeedUser[] = JSON.parse(
      await readFile(seedDataPath, 'utf8'),
    );

    console.log('Starting database seeding...');

    for (const userData of seedData) {
      console.log('🚀 ~ main ~ userData:', userData);
      const user = await prisma.user.create({
        data: {
          pseudo: userData.pseudo,
          slug: userData.pseudo.toLowerCase().replace(/\s+/g, '-'),
          email: `${userData.pseudo
            .toLowerCase()
            .replace(/\s+/g, '.')}@example.com`,
          password: await bcrypt.hash('password123', 10),
          description: userData.description,
          profileImageId: userData.profileImageUrl,
          userType: UserType.creator,
          isEmailVerified: true,
          nudesCount: 2,
          identityVerificationStatus: VerificationStatus.verified,
          creditsAmount: 0,
          settings: {
            create: {},
          },
        },
      });

      console.log(`Created user: ${user.pseudo}`);

      for (const nudeData of userData.nudes) {
        const media = await prisma.media.create({
          data: {
            thumbnailId: nudeData.thumbnail,
            videoId: nudeData.videoKey,
            userId: user.id,
            isReady: true,
          },
        });

        // Create the nude
        const possiblePrices = [0, 10, 20];
        const randomFiatPrice =
          possiblePrices[Math.floor(Math.random() * possiblePrices.length)];

        const nude = await prisma.nude.create({
          data: {
            description: nudeData.description,
            fiatPrice: randomFiatPrice,
            creditPrice: randomFiatPrice * 2,
            currency: 'USD',
            userId: user.id,
            mediaId: media.id,
            tags: ['nsfw'],
          },
        });

        console.log(`Created nude and media for user: ${user.pseudo}`);
      }
    }

    console.log('Database seeding completed successfully!');
  } catch (error) {
    console.error('Error seeding database:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
