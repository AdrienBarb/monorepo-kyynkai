import React from 'react';
import PageContainer from '@/components/PageContainer';
import { genPageMetadata } from '@/app/seo';
import Title from '@/components/ui/Title';
import Text from '@/components/ui/Text';
import PaddingContainer from '@/components/layout/PaddingContainer';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata() {
  const t = await getTranslations();

  return genPageMetadata({
    title: t('dmcaPolicyTitle'),
    description: t('dmcaPolicyDescription'),
  });
}

const dmcaPolicyPage = () => {
  return (
    <PageContainer>
      <PaddingContainer className="max-w-screen-lg mx-auto">
        <Title Tag="h1">DMCA Policy</Title>
        <Text>Last Updated: February 2025</Text>
        <Title Tag="h2">1. Introduction</Title>
        <Text>
          Kyynk respects intellectual property rights and complies with the
          Digital Millennium Copyright Act (DMCA). This policy explains how
          copyright owners can report infringement and how users can file
          counter-notices.
        </Text>
        <Title Tag="h2">2. Copyright Protection</Title>
        <Text>
          All content uploaded to Kyynk must respect copyright laws. Users are
          responsible for ensuring that they have the legal rights to distribute
          the content they upload.
        </Text>
        <Title Tag="h2">3. How to Submit a DMCA Takedown Request</Title>
        <Text>
          If you believe your copyrighted work has been infringed on our
          platform, please send a DMCA takedown request to{' '}
          <strong>legal@kyynk.com</strong> with the following details:
        </Text>
        <ul>
          <li>Your full name and contact information.</li>
          <li>
            A description of the copyrighted work you claim has been infringed.
          </li>
          <li>
            The URL or other identifying details of the infringing content.
          </li>
          <li>
            A statement that you have a good faith belief that the use of the
            content is unauthorized.
          </li>
          <li>
            A statement, under penalty of perjury, that the information provided
            is accurate and that you are the copyright owner or authorized to
            act on behalf of the copyright owner.
          </li>
          <li>Your physical or electronic signature.</li>
        </ul>
        <Title Tag="h2">4. Counter-Notice Process</Title>
        <Text>
          If you believe your content was removed by mistake, you may file a
          counter-notice to <strong>legal@kyynk.com</strong> including:
        </Text>
        <ul>
          <li>Your full name and contact information.</li>
          <li>
            A description of the removed content and its location before
            removal.
          </li>
          <li>
            A statement that you have a good faith belief that the content was
            removed by mistake or misidentification.
          </li>
          <li>
            A statement that you consent to the jurisdiction of the courts in
            your country and will accept service of process from the party who
            filed the DMCA takedown request.
          </li>
          <li>Your physical or electronic signature.</li>
        </ul>
        <Title Tag="h2">5. Repeat Infringer Policy</Title>
        <Text>
          Kyynk follows a strict repeat infringer policy. If a user repeatedly
          uploads infringing content, their account may be suspended or
          permanently banned.
        </Text>
        <Title Tag="h2">6. Contact Information</Title>
        <Text>For all DMCA-related inquiries, please contact us at:</Text>
        <Text>
          <strong>Email:</strong> legal@kyynk.com
        </Text>
      </PaddingContainer>
    </PageContainer>
  );
};

export default dmcaPolicyPage;
