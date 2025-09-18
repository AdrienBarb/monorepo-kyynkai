import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Tailwind,
  Preview,
  Section,
  Text,
} from '@react-email/components';
import * as React from 'react';
import { tailwindConfig } from '../config';

interface NewAiGirlfriendEmailProps {
  aiGirlfriendName: string;
  aiGirlfriendAge: number;
  aiGirlfriendImageUrl: string;
  aiGirlfriendProfileUrl: string;
  aiGirlfriendArchetype: string;
}

const NewAiGirlfriendEmail = ({
  aiGirlfriendName,
  aiGirlfriendAge,
  aiGirlfriendImageUrl,
  aiGirlfriendProfileUrl,
  aiGirlfriendArchetype,
}: NewAiGirlfriendEmailProps) => {
  return (
    <Html>
      <Head />
      <Tailwind config={tailwindConfig}>
        <Body
          style={{ backgroundColor: '#1c131e' }}
          className="font-sans m-0 p-0"
        >
          <Preview>
            💋 {aiGirlfriendName} just joined and she&apos;s waiting for you...
          </Preview>
          <Container className="max-w-2xl mx-auto p-5">
            <Section className="text-center">
              <Heading
                style={{ color: '#fff0eb' }}
                className="text-3xl font-bold mb-5 mt-0"
              >
                🔥 New Beauty Alert! 🔥
              </Heading>

              <Section className="mb-5">
                <Img
                  src={aiGirlfriendImageUrl}
                  alt={aiGirlfriendName}
                  width="300"
                  height="400"
                  className="rounded-xl mx-auto block"
                  style={{
                    boxShadow: '0 10px 25px rgba(0,0,0,0.3)',
                    objectFit: 'cover',
                  }}
                />
              </Section>

              <Text
                style={{ color: '#fff0eb' }}
                className="text-2xl font-bold mb-2 mt-0"
              >
                {aiGirlfriendName}, {aiGirlfriendAge}
              </Text>

              <Text style={{ color: '#cecaff' }} className="text-lg mb-5 mt-0">
                {aiGirlfriendArchetype}
              </Text>

              <Section
                style={{
                  backgroundColor: '#fff0eb',
                  borderLeft: '4px solid #cecaff',
                }}
                className="p-5 rounded-xl mb-8"
              >
                <Text
                  style={{ color: '#1c131e' }}
                  className="text-lg italic m-0 leading-6"
                >
                  &quot;Hey there... I&apos;m new here and I&apos;m looking for
                  someone special to talk to. I can&apos;t wait to get to know
                  you better and share some intimate moments together. Come chat
                  with me? 💕&quot;
                </Text>
              </Section>

              <Section className="mb-8">
                <Button
                  href={aiGirlfriendProfileUrl}
                  style={{
                    backgroundColor: '#cecaff',
                    color: '#1c131e',
                    boxShadow: '0 4px 12px rgba(206, 202, 255, 0.3)',
                  }}
                  className="px-8 py-4 rounded-lg text-lg font-bold no-underline inline-block"
                >
                  💋 Meet {aiGirlfriendName} Now 💋
                </Button>
              </Section>

              <Text style={{ color: '#fff0eb' }} className="text-sm mb-5 mt-0">
                Don&apos;t keep her waiting... She&apos;s online and ready to
                chat! 😈
              </Text>

              <Text style={{ color: '#cecaff' }} className="text-xs m-0">
                Best regards,
                <br />
                KYYNK Team
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default NewAiGirlfriendEmail;
