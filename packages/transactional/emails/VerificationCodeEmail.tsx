import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Tailwind,
  Preview,
  Section,
  Text,
} from '@react-email/components';
import * as React from 'react';
import { tailwindConfig } from '../config';

interface VerificationCodeEmailProps {
  code: number;
}

const VerificationCodeEmail = ({ code }: VerificationCodeEmailProps) => {
  return (
    <Html>
      <Head />
      <Tailwind config={tailwindConfig}>
        <Body className="bg-white font-sans">
          <Preview>Verification Code</Preview>
          <Container className="mx-auto p-4">
            <Section>
              <Heading className="text-2xl font-bold text-primary">
                Verification Code
              </Heading>
              <Text className="mt-2 text-lg">Hello,</Text>
              <Text className="mt-1">
                Thank you for signing up. Please use the following code to
                verify your email address:
              </Text>
              <Section className="mt-4">
                <div className="p-2 bg-primary text-secondary rounded-sm text-center text-xl font-semibold">
                  {code}
                </div>
              </Section>
              <Text className="mt-4">
                If you did not request this code, please ignore this email.
              </Text>
              <Text className="mt-4">Best regards,</Text>
              <Text>KYYNK Team</Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default VerificationCodeEmail;
