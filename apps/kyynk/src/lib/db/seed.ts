import { PrismaClient } from '@prisma/client';
import { readFile } from 'fs/promises';
import { join } from 'path';

const prisma = new PrismaClient();

interface SeedAIGirlfriend {
  id: string;
  pseudo: string;
  slug: string;
  profileImageUrl: string;
  archetype: string;
  traits: string[];
  hook: string;
  chatOpeningLine: string;
  voice: string;
  boundaries: string[];
  styleReminders: string[];
  petNames: string[];
  emojiRatio: number;
  sentenceLength: string;
  aftercare: boolean;
  consentChecks: string[];
  genTemperature: number;
  genTopP: number;
  genMaxTokens: number;
  visualStylePrompt: string;
}

async function main() {
  try {
    const seedDataPath = join(process.cwd(), 'src/lib/db/seed.json');
    const seedData: SeedAIGirlfriend[] = JSON.parse(
      await readFile(seedDataPath, 'utf8'),
    );

    console.log('Starting database seeding...');

    for (const aiGirlfriendData of seedData) {
      const aiGirlfriend = await prisma.aIGirlfriend.create({
        data: {
          pseudo: aiGirlfriendData.pseudo,
          slug: aiGirlfriendData.slug,
          profileImageId: aiGirlfriendData.profileImageUrl,
          archetype: aiGirlfriendData.archetype,
          traits: aiGirlfriendData.traits,
          hook: aiGirlfriendData.hook,
          chatOpeningLine: aiGirlfriendData.chatOpeningLine,
          voice: aiGirlfriendData.voice,
          boundaries: aiGirlfriendData.boundaries,
          styleReminders: aiGirlfriendData.styleReminders,
          petNames: aiGirlfriendData.petNames,
          emojiRatio: aiGirlfriendData.emojiRatio,
          sentenceLength: aiGirlfriendData.sentenceLength,
          aftercare: aiGirlfriendData.aftercare,
          consentChecks: aiGirlfriendData.consentChecks,
          genTemperature: aiGirlfriendData.genTemperature,
          genTopP: aiGirlfriendData.genTopP,
          genMaxTokens: aiGirlfriendData.genMaxTokens,
          visualStylePrompt: aiGirlfriendData.visualStylePrompt,
        },
      });

      console.log(
        `Created AI Girlfriend: ${aiGirlfriend.pseudo} (${aiGirlfriend.slug})`,
      );
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
