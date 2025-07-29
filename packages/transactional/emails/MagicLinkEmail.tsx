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

interface MagicLinkEmailProps {
  magicLink: string;
}

const MagicLinkEmail = ({ magicLink }: MagicLinkEmailProps) => {
  return (
    <Html>
      <Head />
      <Tailwind config={tailwindConfig}>
        <Body className="bg-white font-sans">
          <Preview>Login with your magic link</Preview>
          <Container className="mx-auto p-4">
            <Section>
              <Heading className="text-2xl font-bold text-primary">
                Welcome Back!
              </Heading>
              <Text className="mt-2 text-lg">Hello,</Text>
              <Text className="mt-1">
                Click the button below to log in to your account using our
                secure magic link.
              </Text>
              <Section className="mt-4">
                <Button
                  href={magicLink}
                  className="bg-primary text-secondary-dark px-4 py-2 rounded-sm text-center text-lg font-semibold"
                >
                  Log In
                </Button>
              </Section>
              <Text className="mt-4">Best regards,</Text>
              <Text>KYYNK Team</Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default MagicLinkEmail;
