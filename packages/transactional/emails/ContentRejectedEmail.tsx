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

interface ContentRejectedEmailProps {
  contentDescription?: string;
  rejectionReason?: string;
  creatorName: string;
}

const ContentRejectedEmail = ({
  contentDescription,
  rejectionReason,
  creatorName,
}: ContentRejectedEmailProps) => {
  return (
    <Html>
      <Head />
      <Tailwind config={tailwindConfig}>
        <Body className="bg-white font-sans">
          <Preview>Content Rejected</Preview>
          <Container className="mx-auto p-4">
            <Section>
              <Heading className="text-2xl font-bold text-primary">
                Content Rejected
              </Heading>
              <Text className="mt-2 text-lg">Hello {creatorName},</Text>
              <Text className="mt-1">
                We regret to inform you that your content has been rejected
                during our moderation review.
              </Text>

              {contentDescription && (
                <Text className="mt-2">
                  <strong>Content:</strong> {contentDescription}
                </Text>
              )}

              {rejectionReason && (
                <Text className="mt-2">
                  <strong>Reason for rejection:</strong> {rejectionReason}
                </Text>
              )}

              <Text className="mt-2">
                Please review our community guidelines and ensure your content
                complies with our platform&apos;s standards before uploading new
                content.
              </Text>

              <Text className="mt-2">
                If you believe this decision was made in error, please
                don&apos;t hesitate to contact our support team.
              </Text>

              <Text className="mt-2">
                Thank you for your understanding and for helping us maintain a
                safe and respectful community.
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

export default ContentRejectedEmail;
