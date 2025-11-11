import {
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
      <Body
        style={{
          backgroundColor: '#1c131e',
          fontFamily: 'sans-serif',
          margin: 0,
          padding: 0,
        }}
      >
        <Preview>
          💋 {aiGirlfriendName} just joined and she&apos;s waiting for you...
        </Preview>
        <Container style={{ maxWidth: '672px', margin: '0 auto', padding: '20px' }}>
          <Section style={{ textAlign: 'center' }}>
            <Heading
              style={{
                color: '#fff0eb',
                fontSize: '30px',
                fontWeight: 'bold',
                marginBottom: '20px',
                marginTop: 0,
              }}
            >
              🔥 New Beauty Alert! 🔥
            </Heading>

            <Section style={{ marginBottom: '20px' }}>
              <Img
                src={aiGirlfriendImageUrl}
                alt={aiGirlfriendName}
                width="300"
                height="400"
                style={{
                  borderRadius: '12px',
                  margin: '0 auto',
                  display: 'block',
                  boxShadow: '0 10px 25px rgba(0,0,0,0.3)',
                  objectFit: 'cover',
                }}
              />
            </Section>

            <Text
              style={{
                color: '#fff0eb',
                fontSize: '24px',
                fontWeight: 'bold',
                marginBottom: '8px',
                marginTop: 0,
              }}
            >
              {aiGirlfriendName}, {aiGirlfriendAge}
            </Text>

            <Text
              style={{
                color: '#cecaff',
                fontSize: '18px',
                marginBottom: '20px',
                marginTop: 0,
              }}
            >
              {aiGirlfriendArchetype}
            </Text>

            <Section
              style={{
                backgroundColor: '#fff0eb',
                borderLeft: '4px solid #cecaff',
                padding: '20px',
                borderRadius: '12px',
                marginBottom: '32px',
              }}
            >
              <Text
                style={{
                  color: '#1c131e',
                  fontSize: '18px',
                  fontStyle: 'italic',
                  margin: 0,
                  lineHeight: '24px',
                }}
              >
                &quot;Hey there... I&apos;m new here and I&apos;m looking for
                someone special to talk to. I can&apos;t wait to get to know
                you better and share some intimate moments together. Come chat
                with me? 💕&quot;
              </Text>
            </Section>

            <Section style={{ marginBottom: '32px' }}>
              <Button
                href={aiGirlfriendProfileUrl}
                style={{
                  backgroundColor: '#cecaff',
                  color: '#1c131e',
                  padding: '16px 32px',
                  borderRadius: '8px',
                  fontSize: '18px',
                  fontWeight: 'bold',
                  textDecoration: 'none',
                  display: 'inline-block',
                  boxShadow: '0 4px 12px rgba(206, 202, 255, 0.3)',
                }}
              >
                💋 Meet {aiGirlfriendName} Now 💋
              </Button>
            </Section>

            <Text
              style={{
                color: '#fff0eb',
                fontSize: '14px',
                marginBottom: '20px',
                marginTop: 0,
              }}
            >
              Don&apos;t keep her waiting... She&apos;s online and ready to
              chat! 😈
            </Text>

            <Text style={{ color: '#cecaff', fontSize: '12px', margin: 0 }}>
              Best regards,
            </Text>
            <Text style={{ color: '#cecaff', fontSize: '12px', margin: 0 }}>
              KYYNK Team
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

export default NewAiGirlfriendEmail;

export const previewProps = {
  aiGirlfriendName: 'Emma',
  aiGirlfriendAge: 25,
  aiGirlfriendImageUrl: 'https://via.placeholder.com/300x400',
  aiGirlfriendProfileUrl: 'https://kyynk.com/girls/emma',
  aiGirlfriendArchetype: 'The Girl Next Door',
};

