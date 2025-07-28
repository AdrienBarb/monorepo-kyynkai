import { Metadata } from 'next';
import { genPageMetadata } from '@/app/seo';
import { redirect } from 'next/navigation';
import imgixLoader from '@/lib/imgix/loader';
import { getNudeById } from '@/services/nudes/getNudesById';
import { getTranslations } from 'next-intl/server';

export type PageProps = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata | undefined> {
  const { id } = await params;
  const nude = await getNudeById({ nudeId: id });
  const t = await getTranslations();

  if (!nude) {
    return undefined;
  }

  const imageUrl = imgixLoader({
    src: nude.media?.thumbnailId || '',
    width: 400,
    quality: 80,
    transformations: nude.fiatPrice > 0 ? { blur: 500 } : {},
  });

  return genPageMetadata({
    title: `${t('nudes')} - ${nude.user.pseudo}`,
    description: nude.description ?? '',
    image: imageUrl,
    url: `/nudes/${nude.id}`,
  });
}

const NudePage = async ({ params }: PageProps) => {
  const { id } = await params;
  const nude = await getNudeById({ nudeId: id });

  if (!nude) {
    redirect('/404');
  }

  if (nude.isArchived) {
    redirect(`/${nude.user.slug}`);
  }

  redirect(`/${nude.user.slug}?view=feed&n=${nude.id}`);
};

export default NudePage;
