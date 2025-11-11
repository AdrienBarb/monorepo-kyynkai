import { uploadToS3 } from '../s3Uploader';

export const downloadAndUploadToS3 = async (
  imageUrl: string,
): Promise<string> => {
  try {
    const response = await fetch(imageUrl);

    if (!response.ok) {
      throw new Error(`Failed to download image: ${response.statusText}`);
    }

    const contentType = response.headers.get('content-type') || 'image/jpeg';
    const buffer = Buffer.from(await response.arrayBuffer());

    const s3Key = await uploadToS3({
      file: buffer,
      folder: 'generated_medias',
      fileType: contentType,
    });

    return s3Key;
  } catch (error) {
    console.error('Error downloading and uploading to S3:', error);
    throw new Error('Failed to process generated image');
  }
};
