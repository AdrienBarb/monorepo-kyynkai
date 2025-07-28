import apiVideoClient from '@/lib/api-video/client';
import path from 'path';
import { createReadStream, createWriteStream } from 'fs';
import { prisma } from '@/lib/db/client';
import * as PImage from 'pureimage';

export const createWatermark = async ({
  userId,
  slug,
}: {
  userId: string;
  slug: string;
}) => {
  try {
    const watermarkPath = await generateWatermark(slug);

    const watermark = await apiVideoClient.watermarks.upload(
      createReadStream(watermarkPath),
    );

    await prisma.user.update({
      where: { id: userId },
      data: { watermarkId: watermark.watermarkId! },
    });

    console.log('Watermark uploaded:', watermark);
    return watermark;
  } catch (error) {
    console.error('Error uploading watermark:', error);
    throw error;
  }
};

export const generateWatermark = async (slug: string): Promise<string> => {
  const width = 975;
  const height = 150;
  const img = PImage.make(width, height);
  const ctx = img.getContext('2d');

  const fontPath = path.join(process.cwd(), 'public', 'fonts', 'ARIAL.TTF');

  const font = PImage.registerFont(fontPath, 'Arial');
  await font.loadSync();

  // Background color (fully transparent)
  ctx.clearRect(0, 0, width, height);

  // Add text with bold style
  ctx.font = '42pt Arial';
  ctx.fillStyle = '#A9A9A9'; // Dark gray text color
  ctx.textAlign = 'right';
  ctx.fillText(`kyynk.com/${slug}`, width, height / 2 + 60); // Move text down by 20 pixels

  // Save the image
  const watermarkPath = path.join('/tmp', `watermark-${slug}.png`);
  await PImage.encodePNGToStream(img, createWriteStream(watermarkPath));

  return watermarkPath;
};
