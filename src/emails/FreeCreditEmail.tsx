import {
  Tailwind,
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
} from '@react-email/components';
import * as React from 'react';

interface FreeCreditEmailProps {
  userName?: string | null;
  ctaUrl: string;
  creditsAmount: number;
}

const FreeCreditEmail = ({
  userName,
  ctaUrl,
  creditsAmount,
}: FreeCreditEmailProps) => {
  const greeting = userName ? `Hey ${userName},` : 'Hey there,';
  const message = `Your weekly ${creditsAmount} free credits are ready to claim! Don't miss out on this week's rewards.`;

  return (
    <Html>
      <Tailwind>
        <Head />
        <Body className="bg-[#000000] font-sans">
          <Preview>{message}</Preview>
          <Container className="mx-auto max-w-[600px] bg-[#000000]">
            <Section className="bg-gradient-to-r from-[#cecaff] to-[#cecaff] px-8 py-12 text-center">
              <Heading className="m-0 text-3xl font-bold text-[#000000]">
                KYYNK
              </Heading>
            </Section>

            <Section className="px-8 py-10">
              <Text className="text-xl font-semibold text-[#fff0eb] text-center mb-6">
                {greeting}
              </Text>

              <Text className="text-lg text-[#fff0eb] text-center mb-6">
                {message}
              </Text>

              <Section className="my-8 text-center">
                <Button
                  href={ctaUrl}
                  className="rounded-lg bg-[#cecaff] px-8 py-4 text-lg font-bold text-[#000000] no-underline shadow-lg"
                >
                  Claim Your {creditsAmount} Free Credits
                </Button>
              </Section>

              <Text className="mt-6 text-base text-[#fff0eb] text-center">
                Use your credits to unlock exclusive content and experiences.
                Claim them now before they expire!
              </Text>
            </Section>

            <Section className="bg-[#000000] px-8 py-6 text-center border-t border-[#cecaff]/10">
              <Text className="m-0 text-xs text-[#fff0eb]">
                © {new Date().getFullYear()} KYYNK. All rights reserved.
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default FreeCreditEmail;

export const previewProps = {
  userName: 'John',
  ctaUrl: 'https://kyynk.com/',
  creditsAmount: 5,
};

