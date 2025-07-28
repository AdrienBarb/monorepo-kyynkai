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
    title: t('termsOfServiceTitle'),
    description: t('termsOfServiceDescription'),
  });
}

const TermsOfUsePage = () => {
  return (
    <PageContainer>
      <PaddingContainer className="max-w-screen-lg mx-auto">
        <Title Tag="h1">Terms of Service</Title>
        <Text>Last Updated: April 2025</Text>
        <Title Tag="h2">1. Introduction</Title>
        <Text>
          Welcome to Kyynk. These Terms of Service (ToS) govern your use of our
          platform. By accessing or using our services, you agree to comply with
          these terms.
        </Text>
        <Text>
          KYYNK is operated by ALLY CORPORATION, with registered address 60 rue
          francois 1er, paris, 75008, France, under the laws of France, with
          registered number 814 428785.
        </Text>
        <Title Tag="h2">2. Eligibility and Age Verification</Title>
        <Text>
          Users must be at least 18 years old to access Kyynk. All users must
          verify their identity by uploading a government-issued ID, which is
          reviewed by our internal verification team. Attempts to bypass
          verification will result in account termination.
        </Text>
        <Title Tag="h2">3. Content Management Policy & Procedures</Title>
        <Text>
          Kyynk enforces strict content management policies, including:
        </Text>
        <Text>
          • <strong>Pre-publication review:</strong> All content is reviewed
          before being published to ensure compliance.
        </Text>
        <Text>
          • <strong>Real-time monitoring:</strong> Our team actively monitors
          content and removes any violating materials.
        </Text>
        <Text>
          • <strong>Prohibited content:</strong> Child exploitation,
          non-consensual content, bestiality, extreme violence, and illegal
          activities are strictly prohibited.
        </Text>
        <Text>
          • <strong>Human trafficking prevention:</strong> The platform may not
          be used for any form of trafficking or exploitation.
        </Text>
        <Text>
          • <strong>Content removal:</strong> Any illegal or policy-violating
          content will be removed immediately.
        </Text>
        <Title Tag="h2">4. Title 18 U.S.C. 2257 Compliance</Title>
        <Text>
          Kyynk complies with U.S. record-keeping laws for adult content. We
          require all content providers to submit valid age verification
          documents. Our compliance officer can be reached at legal@kyynk.com.
        </Text>
        <Title Tag="h2">5. Payments, Taxes, Refunds & Disputes</Title>
        <Title Tag="h3">5.1 Payments</Title>
        <Text>
          We accept payments through our payment processor via the payment
          methods available on the Kyynk platform at the time of checkout. To
          purchase Kyynk Credits or access any paid content or services, you
          must use a valid accepted form of payment. You are also responsible
          for complying with the terms and conditions associated with your
          chosen payment method. By submitting your payment information, you
          authorize us to share your payment card details with our third-party
          payment processor to complete the transaction.
        </Text>
        <Text>
          For billing support, visit{' '}
          <a
            href="https://www.cgbilling.com/secure"
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
          >
            CGBilling Support
          </a>{' '}
          (powered by{' '}
          <a
            href="https://www.commercegate.com"
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
          >
            CommerceGate
          </a>
          )
        </Text>
        <Text>
          Kyynk Credit prices may change at any time, and we do not provide
          price protection or refunds in the event of a promotional discount or
          price reduction. Your card issuer may apply currency conversion fees
          if applicable. We do not control these exchange rates or associated
          fees. It is your responsibility to confirm the final price, including
          any applicable taxes or fees, before completing your purchase. We will
          charge your selected payment method for the full transaction amount,
          which may include processing fees, bank fees, currency fluctuation
          charges, and applicable taxes.
        </Text>
        <Title Tag="h3">5.2 Taxes</Title>
        <Text>
          You are solely responsible for any applicable federal, national,
          regional, or local taxes, including but not limited to sales tax, use
          tax, value-added tax (VAT), or similar charges related to your
          purchases on Kyynk. If we are legally obligated to collect taxes for a
          transaction, those taxes will be added at checkout and charged to your
          selected payment method.
        </Text>
        <Title Tag="h3">5.3 Refunds</Title>
        <Text>
          All sales and transactions on Kyynk are final. Payments are
          non-refundable and considered fully earned upon receipt. Kyynk does
          not issue refunds or credits for unused credits, missed content, or
          failure to use the platform. In cases involving platform-related
          technical issues, we will work with you to find a resolution. Refunds
          may be considered in the form of credit only under exceptional
          circumstances and solely at our discretion.
        </Text>
        <Text>
          To request a refund due to exceptional circumstances, contact us at
          billing@kyynk.com and explain your situation. We do not guarantee that
          any refund will be issued. If approved, refunds will be issued either
          as credits to your Kyynk Credit balance or to your original payment
          method. Refunds will not be issued in cash, check, or through free
          services. Approval of a refund for one transaction does not constitute
          an obligation to provide a refund in the future.
        </Text>
        <Title Tag="h3">5.4 Disputes and Chargebacks</Title>
        <Text>
          If you believe you were charged in error, you must notify us in
          writing within 30 days from the date of the billing statement in
          question. Failure to notify us within this timeframe will result in
          the waiver of any claim related to the disputed charge.
        </Text>
        <Text>
          To dispute a charge, please contact billing@kyynk.com with a detailed
          explanation of the disputed transaction and its amount. We will
          investigate and correct any confirmed errors by applying a credit to
          your account or payment method.
        </Text>
        <Text>
          We reserve the right to suspend or terminate any account involved in
          fraudulent payment activity or chargeback abuse. Submitting
          chargebacks in bad faith may result in permanent account suspension
          and/or legal action.
        </Text>
        <Title Tag="h3">5.5 Delivery Policy</Title>
        <Text>
          Once credits are purchased, they are immediately added to the
          user&apos;s account. No physical delivery is involved. Access to
          services is instant.
        </Text>
        <Title Tag="h2">6. Complaint & Content Removal Policy</Title>
        <Text>
          • <strong>User complaints:</strong> Users can report illegal or
          policy-violating content by emailing complaints@kyynk.com.
        </Text>
        <Text>
          • <strong>Resolution timeframe:</strong> Complaints will be reviewed
          within <strong>7 business days</strong>.
        </Text>
        <Text>
          • <strong>Content removal:</strong> Illegal content will be removed{' '}
          <strong>immediately</strong>.
        </Text>
        <Text>
          • <strong>Appeals:</strong> Individuals depicted in content may
          request removal via our complaint process.
        </Text>
        <Title Tag="h2">7. Prohibited Activities</Title>
        <Text>Users may not:</Text>
        <Text>• Upload or share illegal or non-consensual content.</Text>
        <Text>
          • Use the platform for trafficking, exploitation, or other unlawful
          activities.
        </Text>
        <Text>• Engage in harassment, threats, or abusive behavior.</Text>
        <Title Tag="h2">8. Account Suspension & Termination</Title>
        <Text>
          Kyynk may suspend or terminate user accounts for violations of these
          terms. Users can appeal a termination decision by contacting
          legal@kyynk.com.
        </Text>
        <Title Tag="h2">9. Liability and Indemnification</Title>
        <Text>
          Users agree to indemnify and hold Kyynk harmless from any claims,
          damages, or legal actions resulting from their activities on the
          platform.
        </Text>
        <Title Tag="h2">10. Governing Law</Title>
        <Text>These Terms of Service are governed by the laws of France.</Text>
        <Title Tag="h2">11. Contact Information</Title>
        <Text>For legal or compliance inquiries, contact:</Text>
        <Text>
          <strong>Correspondence Address:</strong> ALLY CORPORATION, 60 rue
          Francois 1er, Paris, 75008, France francois 1er, paris, 75008, France
        </Text>
        <Text>
          <strong>Legal & Compliance:</strong> legal@kyynk.com
        </Text>
        <Text>
          <strong>Billing & Refunds:</strong> billing@kyynk.com
        </Text>
        <Text>
          <strong>User Complaints & Content Removal:</strong>
          complaints@kyynk.com
        </Text>
        <Text>
          <strong>Technical Support / Refund Requests:</strong> help@kyynk.com
        </Text>
      </PaddingContainer>
    </PageContainer>
  );
};

export default TermsOfUsePage;
