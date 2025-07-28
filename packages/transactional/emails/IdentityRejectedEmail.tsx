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

interface IdentityRejectedEmailProps {
  link: string;
}

const IdentityRejectedEmail = ({ link }: IdentityRejectedEmailProps) => {
  return (
    <Html>
      <Head />
      <Tailwind config={tailwindConfig}>
        <Body className="bg-white font-sans">
          <Preview>Identity Verification Rejected</Preview>
          <Container className="mx-auto p-4">
            <Section>
              <Heading className="text-2xl font-bold text-primary">
                Identity Verification Rejected
              </Heading>
              <Text className="mt-2 text-lg">Hello,</Text>
              <Text className="mt-1">
                We regret to inform you that your identity verification has been
                rejected. Please upload your identity documents again on the
                app.
              </Text>
              <Section className="mt-4">
                <Button
                  href={link}
                  className="bg-primary text-secondary-dark px-4 py-2 rounded-sm text-center text-lg font-semibold"
                >
                  Connect to the App
                </Button>
              </Section>
              <Text className="mt-4">
                If you have any questions, please contact our support team.
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

export default IdentityRejectedEmail;
