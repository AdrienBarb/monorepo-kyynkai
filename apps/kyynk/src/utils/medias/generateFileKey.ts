import { v4 as uuidv4 } from 'uuid';

export const generateFileKey = (
  fileType: string,
  folder: 'medias' | 'thumbnails' | 'identity' | 'generated_medias',
) => {
  const uniqueId = uuidv4();
  const fileExtension = fileType.split('/')[1] || 'jpg';
  const fileKey = `${folder}/${uniqueId}.${fileExtension}`;
  return fileKey;
};
