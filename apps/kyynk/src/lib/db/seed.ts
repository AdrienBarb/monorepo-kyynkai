import { PrismaClient } from '@prisma/client';
import { readFile } from 'fs/promises';
import { join } from 'path';

const prisma = new PrismaClient();

interface SeedAIGirlfriend {
  id: string;
  pseudo: string;
  slug: string;
  profileImageId: string;
  archetype: string;
  traits: string[];
  hook: string;
  chatOpeningLine: string;
  age: number;
  voice: string;
  boundaries: string[];
  styleReminders: string[];
  petNames: string[];
  emojiRatio: number;
  sentenceLength: string;
  aftercare: boolean;
  consentChecks: string[];
  version: string;
  bodyBuild?: string;
  bustSize?: string;
  hipSize?: string;
  hairColor?: string;
  hairStyle?: string;
  skinTone?: string;
  genTemperature: number;
  genTopP: number;
  faceIdKey: string;
  genMaxTokens: number;
  visualStylePrompt: string;
  profileVideoId?: string;
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
          profileImageId: aiGirlfriendData.profileImageId,
          profileVideoId: aiGirlfriendData.profileVideoId,
          archetype: aiGirlfriendData.archetype,
          traits: aiGirlfriendData.traits,
          hook: aiGirlfriendData.hook,
          age: aiGirlfriendData.age,
          chatOpeningLine: aiGirlfriendData.chatOpeningLine,
          voice: aiGirlfriendData.voice,
          boundaries: aiGirlfriendData.boundaries,
          styleReminders: aiGirlfriendData.styleReminders,
          petNames: aiGirlfriendData.petNames,
          emojiRatio: aiGirlfriendData.emojiRatio,
          sentenceLength: aiGirlfriendData.sentenceLength,
          aftercare: aiGirlfriendData.aftercare,
          consentChecks: aiGirlfriendData.consentChecks,
          version: aiGirlfriendData.version,
          bodyBuild: aiGirlfriendData.bodyBuild,
          bustSize: aiGirlfriendData.bustSize,
          hipSize: aiGirlfriendData.hipSize,
          hairColor: aiGirlfriendData.hairColor,
          hairStyle: aiGirlfriendData.hairStyle,
          skinTone: aiGirlfriendData.skinTone,
          genTemperature: aiGirlfriendData.genTemperature,
          faceIdKey: aiGirlfriendData.faceIdKey,
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
