import { genPageMetadata } from '@/app/seo';
import Footer from '@/components/layout/Footer';
import NavigationBar from '@/components/layout/NavigationBar';
import { Metadata } from 'next';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import { appRouter } from '@/constants/appRouter';
import { auth } from '@/auth';
import Feature from '@/components/landing/FeatureWithAdvantages';
import CreatorFAQ from '@/components/landing/CreatorFAQ';
import { getUsers } from '@/services/users/getUsers';
import LastCreators from '@/components/landing/LastCreators';
import { User } from '@prisma/client';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata(): Promise<Metadata | undefined> {
  const t = await getTranslations();

  return genPageMetadata({
    title: t('joinCreatorTitle'),
    description: t('joinCreatorDescription'),
  });
}

const Home = async () => {
  const session = await auth();
  const t = await getTranslations();

  const lastCreators = (await getUsers({ limit: 8 })) as User[];

  return (
    <>
      <NavigationBar type="app" />
      <div className="bg-primary lg:h-[80dvh] flex justify-center items-center mt-16 mx-4 rounded-md px-8 py-16 h-3/4">
        <div className="flex flex-col justify-between items-center gap-16 max-w-5xl w-full">
          <div className="flex flex-col text-center items-center justify-center lg:max-w-lg">
            <h1
              data-id="homepage-title"
              className="text-4xl lg:text-5xl font-bold font-rubik text-secondary"
            >
              {t('joinCreatorHeading')}
            </h1>
            <h2 className="text-xl font-normal font-karla text-secondary mt-4">
              {t('joinCreatorSubheading')}
            </h2>

            <div className="mt-4">
              <Button variant="secondary" asChild>
                <Link href={session ? appRouter.home : appRouter.register}>
                  {t('startEarningNow')}
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <LastCreators lastCreators={lastCreators} />
      <Feature />
      <CreatorFAQ />

      <Footer />
    </>
  );
};

export default Home;
