import {
  Tailwind,
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Preview,
  Section,
  Text,
} from '@react-email/components';
import * as React from 'react';

interface ReactivationEmailProps {
  userName?: string | null;
  ctaUrl: string;
  message: string;
  girlName: string;
  profileImageUrl: string;
}

const ReactivationEmail = ({
  ctaUrl,
  message,
  girlName,
  profileImageUrl,
}: ReactivationEmailProps) => {
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
              <Section className="my-6 text-center">
                <Img
                  src={profileImageUrl}
                  alt={girlName}
                  width="200"
                  height="200"
                  className="mx-auto block rounded-full object-cover border-4 border-[#cecaff]"
                />
              </Section>

              <Text className="text-xl font-semibold text-[#fff0eb] text-center">
                {message}
              </Text>

              <Section className="my-8 text-center">
                <Button
                  href={ctaUrl}
                  className="rounded-lg bg-[#cecaff] px-8 py-4 text-lg font-bold text-[#000000] no-underline shadow-lg"
                >
                  Come Play With {girlName}
                </Button>
              </Section>

              <Text className="mt-6 text-base text-[#fff0eb] text-center">
                Don&apos;t keep {girlName} waiting... She&apos;s online and
                ready for you.
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

export default ReactivationEmail;

export const previewProps = {
  userName: 'John',
  ctaUrl: 'https://kyynk.com/fantasy/123',
  message: "Hey babe, you miss me. Don't you want to come play with me?",
  girlName: 'Jessica',
  profileImageUrl: 'https://via.placeholder.com/200',
};
