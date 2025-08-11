import { PrismaClient } from '@prisma/client';
import { readFile } from 'fs/promises';
import { join } from 'path';
import { checkOrCreateSlug } from '../../utils/users/checkOrCreateSlug.js';

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
      const aiGirlfriend = await prisma.aIGirlfriend.create({
        data: {
          pseudo: userData.pseudo,
          slug: await checkOrCreateSlug(userData.pseudo),
          profileImageId: userData.profileImageUrl,
          // @ts-ignore
          hook: userData.hook,
          // @ts-ignore
          chatOpeningLine: userData.chatOpeningLine,
          // @ts-ignore
          traits: userData.traits,
          // @ts-ignore
          archetype: userData.archetype,
        },
      });
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
