import { genPageMetadata } from '@/app/seo';
import PageContainer from '@/components/PageContainer';
import Title from '@/components/ui/Title';
import Text from '@/components/ui/Text';
import PaddingContainer from '@/components/layout/PaddingContainer';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata() {
  const t = await getTranslations();

  return genPageMetadata({
    title: t('contactUsTitle'),
    description: t('contactUsDescription'),
  });
}

const ContactUsPage = async () => {
  const t = await getTranslations();

  return (
    <PageContainer>
      <PaddingContainer>
        <div className="flex flex-col items-center text-center">
          <Title Tag="h2">{t('contactUsHeading')}</Title>
          <Text>
            {t('contactUsLegal')}{' '}
            <a href="mailto:legal@kyynk.com">legal@kyynk.com</a>
          </Text>
          <Text>
            {t('contactUsBilling')}{' '}
            <a href="mailto:billing@kyynk.com">billing@kyynk.com</a>
          </Text>
          <Text>
            {t('contactUsComplaints')}{' '}
            <a href="mailto:complaints@kyynk.com">complaints@kyynk.com</a>
          </Text>
        </div>
      </PaddingContainer>
    </PageContainer>
  );
};

export default ContactUsPage;
