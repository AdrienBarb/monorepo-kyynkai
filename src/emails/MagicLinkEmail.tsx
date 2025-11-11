import {
  Tailwind,
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
} from '@react-email/components';
import * as React from 'react';

interface MagicLinkEmailProps {
  otp: string;
}

const MagicLinkEmail = ({ otp }: MagicLinkEmailProps) => {
  return (
    <Html>
      <Tailwind>
        <Head />
        <Body className="bg-[#000000] font-sans">
          <Preview>Your verification code for Kyynk</Preview>
          <Container className="mx-auto max-w-[600px] bg-[#000000]">
            <Section className="bg-gradient-to-r from-[#cecaff] to-[#cecaff] px-8 py-12 text-center">
              <Heading className="m-0 text-3xl font-bold text-[#000000]">
                KYYNK
              </Heading>
            </Section>

            <Section className="px-8 py-10">
              <Text className="text-lg text-[#fff0eb]">Hello,</Text>

              <Text className="mt-4 text-base leading-6 text-[#fff0eb]">
                Please use the verification code below to complete your sign-in:
              </Text>

              <Section className="my-8 rounded-lg bg-[#292929] p-6 text-center border border-[#cecaff]/20">
                <Text className="m-0 text-4xl font-bold tracking-wider text-[#fff0eb]">
                  {otp}
                </Text>
              </Section>

              <Text className="mt-6 text-sm text-[#cecaff]">
                This code will expire in 10 minutes. If you didn&apos;t request
                this code, you can safely ignore this email.
              </Text>

              <Section className="mt-10 border-t border-[#cecaff]/20 pt-8">
                <Text className="m-0 text-sm text-[#cecaff]">
                  Best regards,
                </Text>
                <Text className="m-0 mt-1 text-sm font-semibold text-[#fff0eb]">
                  The KYYNK Team
                </Text>
              </Section>
            </Section>

            <Section className="bg-[#000000] px-8 py-6 text-center border-t border-[#cecaff]/10">
              <Text className="m-0 text-xs text-[#cecaff]">
                © {new Date().getFullYear()} KYYNK. All rights reserved.
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default MagicLinkEmail;

export const previewProps = {
  otp: '123456',
};
