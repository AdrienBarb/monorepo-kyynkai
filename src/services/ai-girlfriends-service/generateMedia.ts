import { MediaType } from '@prisma/client';
import { prisma } from '@/lib/db/client';

interface GeneratePictureParams {
  pictureType: 'ass' | 'pussy' | 'tits';
}

export async function generatePicture({
  pictureType,
}: GeneratePictureParams): Promise<string> {
  const mockImagePaths = {
    ass: '/images/mvp/ass.png',
    pussy: '/images/mvp/pussy.png',
    tits: '/images/mvp/tits.png',
  };

  const imageUrl = mockImagePaths[pictureType];

  const media = await prisma.media.create({
    data: {
      type: MediaType.IMAGE,
      mediaKey: imageUrl,
      unlockUsers: [],
    },
  });

  return media.id;
}
