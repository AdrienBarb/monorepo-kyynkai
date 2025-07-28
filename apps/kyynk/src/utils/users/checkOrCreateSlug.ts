import slugify from 'slugify';

export async function checkOrCreateSlug(pseudo: string) {
  const slug = slugify(pseudo, { lower: true, strict: true });

  return slug;
}
