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
    title: t('privacyPolicyTitle'),
    description: t('privacyPolicyDescription'),
  });
}

const privacyPage = () => {
  return (
    <PageContainer>
      <PaddingContainer className="max-w-screen-lg mx-auto">
        <Title Tag="h1">Privacy Policy</Title>
        <Text>Last Updated: February 2025</Text>
        <Title Tag="h2">1. Introduction</Title>
        <Text>
          Welcome to Kyynk. Your privacy is important to us. This Privacy Policy
          explains how we collect, use, share, and protect your personal data
          when you use our platform.
        </Text>
        <Title Tag="h2">2. What Data We Collect</Title>
        <Text>
          We collect different types of personal data to provide and improve our
          services:
        </Text>
        <ul>
          <li>
            <strong>Personal Data</strong>: Name, email, government-issued ID,
            payment details.
          </li>
          <li>
            <strong>Browsing Data</strong>: IP address, cookies, device
            information, user interactions.
          </li>
          <li>
            <strong>Uploaded Content</strong>: Any images, videos, or texts
            submitted to the platform.
          </li>
        </ul>
        <Title Tag="h2">3. How We Use Data</Title>
        <Text>We process your personal data for the following purposes:</Text>
        <ul>
          <li>
            <strong>Age Verification & Security</strong>: Ensuring compliance
            with legal age requirements.
          </li>
          <li>
            <strong>Payment Processing & Fraud Prevention</strong>: Ensuring
            secure transactions.
          </li>
          <li>
            <strong>Platform Analytics</strong>: Improving the user experience.
          </li>
          <li>
            <strong>Marketing & Communications</strong>: Sending updates and
            promotions (opt-out available).
          </li>
        </ul>
        <Title Tag="h2">4. Who We Share Data With</Title>
        <Text>
          We do not sell or rent your personal data. However, we may share it
          with:
        </Text>
        <ul>
          <li>
            <strong>Third-Party Services</strong>: Payment processors (e.g.,
            Stripe), cloud storage, analytics providers.
          </li>
          <li>
            <strong>Law Enforcement</strong>: If legally required to prevent
            fraud, abuse, or illegal activities.
          </li>
        </ul>
        <Title Tag="h2">5. User Rights (GDPR & CCPA Compliance)</Title>
        <Text>Under GDPR and CCPA, you have the following rights:</Text>
        <ul>
          <li>
            <strong>Right to Access</strong>: Request a copy of your data.
          </li>
          <li>
            <strong>Right to Modify or Delete</strong>: Request corrections or
            account deletion.
          </li>
          <li>
            <strong>Right to Data Portability</strong>: Request transfer of your
            data to another service.
          </li>
          <li>
            <strong>Right to Object to Processing</strong>: Opt-out of certain
            data processing activities.
          </li>
        </ul>
        <Title Tag="h2">6. Data Storage & Security</Title>
        <Text>We implement strict security measures to protect your data:</Text>
        <ul>
          <li>
            <strong>Encryption</strong>: All sensitive data is stored with
            encryption.
          </li>
          <li>
            <strong>Restricted Access</strong>: Only authorized personnel can
            access user data.
          </li>
          <li>
            <strong>Data Retention</strong>: Personal data is stored for as long
            as required by law.
          </li>
        </ul>
        <Text>
          https://kyynk.com uses SSL encryption that ensures the confidentiality
          of your information in the transmission of data.
        </Text>
        <Title Tag="h3">Payment Data Security</Title>
        <Text>
          In no case, we do collect, store, or transfer data from your card.
        </Text>
        <Text>
          The payment operations are carried out entirely through the secure
          server of the payment gateway(s) and/or payment processor(s).
        </Text>
        <Text>
          ALLY CORPORATION will not sell, purchase, provide, exchange or in any
          other manner disclose Account or Transaction data, or personal
          information of or about a Cardholder to anyone, except its Acquirer,
          Card networks/associations or in response to valid government demands.
        </Text>
        <Title Tag="h2">7. Cookies & Tracking Technologies</Title>
        <Text>
          We use cookies and similar tracking technologies to enhance user
          experience. You can manage cookie preferences in your browser
          settings.
        </Text>
        <Title Tag="h2">8. Retention Period</Title>
        <Text>
          We retain personal data for as long as necessary to comply with legal
          obligations or until the user requests deletion.
        </Text>
        <Title Tag="h2">9. How to Contact Us</Title>
        <Text>For privacy-related inquiries, please contact us at:</Text>
        <Text>
          <strong>Email:</strong> legal@kyynk.com
        </Text>
      </PaddingContainer>
    </PageContainer>
  );
};

export default privacyPage;
