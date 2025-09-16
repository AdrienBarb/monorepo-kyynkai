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

interface IdentityVerifiedEmailProps {
  link: string;
}

const IdentityVerifiedEmail = ({ link }: IdentityVerifiedEmailProps) => {
  return (
    <Html>
      <Head />
      <Tailwind config={tailwindConfig}>
        <Body className="bg-white font-sans">
          <Preview>Your identity has been verified!</Preview>
          <Container className="mx-auto p-4">
            <Section>
              <Heading className="text-2xl font-bold text-primary">
                Congratulations!
              </Heading>
              <Text className="mt-2 text-lg">Hello,</Text>
              <Text className="mt-1">
                We are thrilled to inform you that your identity has been
                successfully verified. You can now start uploading content and
                engage in discussions with other users.
              </Text>
              <Section className="mt-4">
                <Button
                  href={link}
                  className="bg-primary text-background px-4 py-2 rounded-sm text-center text-lg font-semibold"
                >
                  Get Started
                </Button>
              </Section>
              <Text className="mt-4">
                Join our private Telegram group to connect with other creators,
                get tips, and chat directly with the KYYNK team.
              </Text>
              <Section className="mt-4">
                <Button
                  href="https://t.me/+ApoqYZr0s0E2ZjI0"
                  className="bg-primary text-background px-4 py-2 rounded-sm text-center text-lg font-semibold"
                >
                  Join us on Telegram
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

export default IdentityVerifiedEmail;
