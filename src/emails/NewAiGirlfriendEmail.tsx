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
      <Tailwind>
        <Head />
        <Body className="bg-[#000000] font-sans">
          <Preview>
            💋 {aiGirlfriendName} just joined and she&apos;s waiting for you...
          </Preview>
          <Container className="mx-auto max-w-[672px] bg-[#000000] p-5">
            <Section className="bg-gradient-to-r from-[#cecaff] to-[#cecaff] px-8 py-6 text-center">
              <Heading className="m-0 text-3xl font-bold text-[#000000]">
                🔥 New Beauty Alert! 🔥
              </Heading>
            </Section>

            <Section className="my-5">
              <Img
                src={aiGirlfriendImageUrl}
                alt={aiGirlfriendName}
                width="300"
                height="400"
                className="mx-auto block rounded-xl object-cover shadow-2xl"
              />
            </Section>

            <Section className="text-center">
              <Text className="m-0 mt-4 text-2xl font-bold text-[#fff0eb]">
                {aiGirlfriendName}, {aiGirlfriendAge}
              </Text>

              <Text className="m-0 mt-2 text-lg text-[#cecaff]">
                {aiGirlfriendArchetype}
              </Text>

              <Section className="my-6 rounded-xl border-l-4 border-[#cecaff] bg-[#292929] p-5">
                <Text className="m-0 text-lg italic leading-6 text-[#fff0eb]">
                  &quot;Hey there... I&apos;m new here and I&apos;m looking for
                  someone special to talk to. I can&apos;t wait to get to know
                  you better and share some intimate moments together. Come chat
                  with me? 💕&quot;
                </Text>
              </Section>

              <Section className="my-8">
                <Button
                  href={aiGirlfriendProfileUrl}
                  className="rounded-lg bg-[#cecaff] px-8 py-4 text-lg font-bold text-[#000000] no-underline shadow-lg"
                >
                  💋 Meet {aiGirlfriendName} Now 💋
                </Button>
              </Section>

              <Text className="m-0 mt-6 text-sm text-[#fff0eb]">
                Don&apos;t keep her waiting... She&apos;s online and ready to
                chat! 😈
              </Text>

              <Section className="mt-10 border-t border-[#cecaff]/20 pt-6">
                <Text className="m-0 text-xs text-[#cecaff]">
                  Best regards,
                </Text>
                <Text className="m-0 mt-1 text-xs font-semibold text-[#fff0eb]">
                  KYYNK Team
                </Text>
              </Section>
            </Section>
          </Container>
        </Body>
      </Tailwind>
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
