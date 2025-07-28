import React from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
} from '../ui/AlertDialog';
import { useTranslations } from 'next-intl';
import Title from '../ui/Title';
import Text from '../ui/Text';

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
  handleAcceptPolicy: () => void;
}

const ContentProviderPolicyModal: React.FC<Props> = ({
  open,
  setOpen,
  handleAcceptPolicy,
}) => {
  const t = useTranslations();

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent className="z-[1000] h-[100vh] sm:h-[80vh] overflow-y-scroll">
        <AlertDialogHeader>
          <Title Tag="h2">{t('contentProviderAgreement')}</Title>
        </AlertDialogHeader>
        <div>
          <Text>{t('lastUpdated')}</Text>
          <Title Tag="h3">1. Introduction</Title>
          <Text>
            This Content Provider Agreement (the “Agreement”) is made between
            Kyynk (“Company”) and the Content Provider (“Creator”). By uploading
            content to the platform, you agree to comply with this Agreement and
            all applicable laws.
          </Text>
          <Title Tag="h3">2. Eligibility and Verification</Title>
          <Text>
            To become a content provider, you must:
            <ul>
              <li>
                Be at least 18 years old and provide a government-issued ID for
                verification.
              </li>
              <li>
                Undergo an internal verification process conducted by Kyynk.
              </li>
              <li>
                Not be listed on any prohibited persons or sanctions lists.
              </li>
            </ul>
          </Text>
          <Title Tag="h3">3. Content Ownership and Rights</Title>
          <Text>
            By uploading content, you confirm that:
            <ul>
              <li>You own or have the necessary rights to the content.</li>
              <li>
                You have obtained written consent from all persons depicted in
                the content for public distribution and, if applicable,
                downloading by users.
              </li>
              <li>
                You grant Kyynk a worldwide, non-exclusive license to distribute
                your content on the platform.
              </li>
            </ul>
          </Text>
          <Title Tag="h3">4. Prohibited Content</Title>
          <Text>
            Content providers are prohibited from uploading:
            <ul>
              <li>
                Content depicting child exploitation, non-consensual acts,
                bestiality, extreme violence, or any illegal activities.
              </li>
              <li>
                Content that violates copyright laws or intellectual property
                rights.
              </li>
              <li>
                Content intended to promote or facilitate human trafficking,
                abuse, or prostitution.
              </li>
            </ul>
          </Text>
          <Title Tag="h3">5. Content Review and Moderation</Title>
          <Text>
            All content uploaded to Kyynk is subject to review. Kyynk reserves
            the right to remove or modify any content that violates this
            Agreement or applicable laws.
          </Text>
          <Title Tag="h3">6. Payments and Payouts</Title>
          <Text>
            Content providers may earn revenue through the platform. Payments
            will be made in accordance with Kyynk’s payment policies. Kyynk
            reserves the right to withhold payments in cases of fraud,
            chargebacks, or violations of this Agreement.
          </Text>
          <Title Tag="h3">7. Compliance with Laws</Title>
          <Text>
            Content providers must comply with all applicable laws, including
            age verification laws and content distribution regulations.
          </Text>
          <Title Tag="h3">8. Termination and Account Suspension</Title>
          <Text>
            Kyynk may suspend or terminate your account if you violate this
            Agreement or engage in prohibited activities. You may request
            termination of your account by contacting{' '}
            <a href="mailto:legal@kyynk.com">legal@kyynk.com</a>.
          </Text>
          <Title Tag="h3">9. Liability and Indemnification</Title>
          <Text>
            You agree to indemnify and hold Kyynk harmless from any claims,
            damages, or legal actions arising from your content or activities on
            the platform.
          </Text>
          <Title Tag="h3">10. Governing Law</Title>
          <Text>
            This Agreement shall be governed by the laws of [Your Jurisdiction].
          </Text>
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel>{t('close')}</AlertDialogCancel>
          <AlertDialogAction onClick={handleAcceptPolicy}>
            {t('accept')}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ContentProviderPolicyModal;
