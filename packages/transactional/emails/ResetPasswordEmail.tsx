import {
  Body,
  Button,
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

interface ResetPasswordEmailProps {
  link: string;
}

const ResetPasswordEmail = ({ link }: ResetPasswordEmailProps) => {
  return (
    <Html>
      <Head />
      <Tailwind config={tailwindConfig}>
        <Body className="bg-white font-sans">
          <Preview>Reset Your Password</Preview>
          <Container className="mx-auto p-4">
            <Section>
              <Heading className="text-2xl font-bold text-primary">
                Reset Your Password
              </Heading>
              <Text className="mt-2 text-lg">Hello,</Text>
              <Text className="mt-1">
                We received a request to reset your password. Click the button
                below to reset it:
              </Text>
              <Section className="mt-4">
                <Button
                  href={link}
                  className="bg-primary text-secondary-dark px-4 py-2 rounded-sm text-center text-lg font-semibold"
                >
                  Reset Password
                </Button>
              </Section>
              <Text className="mt-4">
                If you did not request a password reset, please ignore this
                email.
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

export default ResetPasswordEmail;
