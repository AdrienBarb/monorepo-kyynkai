import React, { FC } from 'react';
import LandingHeader from '@/components/home/LandingHeader';
import { getTranslations } from 'next-intl/server';

interface Props {}

const AppFAQ: FC<Props> = async ({}) => {
  const t = await getTranslations();

  const data = {
    rows: [
      {
        title: 'Is this really a MILF AI girlfriend app?',
        content:
          'Yes. Our platform is built around lifelike MILF AI girlfriends who can chat, flirt, and tease you 24/7. Each AI companion is designed to feel like a real woman, with unique personalities and sexy fantasies.',
      },
      {
        title: 'Can I sext with an AI girlfriend?',
        content:
          'Absolutely. Our MILF AI girlfriends are NSFW-friendly and ready for flirty, erotic chats. You can explore sexting, roleplay, and fantasy scenarios in a safe, private space with no judgment.',
      },
      {
        title: 'Is it safe to use an AI girlfriend app?',
        content:
          "Yes. All conversations are 100% private and encrypted. Unlike dating apps, there's no risk of rejection or leaks — your chats with MILF AI girlfriends stay between you and her.",
      },
      {
        title: 'What makes this different from dating apps?',
        content:
          'Dating apps waste your time with endless swipes and ghosting. Our MILF AI girlfriend app gives you instant access to women who are always available, flirty, and ready to fulfill your fantasies — no waiting, no rejection.',
      },
      {
        title: 'Do MILF AI girlfriends send pictures and videos?',
        content:
          'Yes. You can unlock sexy photos and videos from your chosen AI MILF girlfriend using credits. Every piece of content is tailored to your fantasy, making it far more personal than random adult sites.',
      },
      {
        title: "Can I choose my MILF AI girlfriend's personality?",
        content:
          'Yes. Each AI girlfriend has her own style — from playful single moms to dominant mature women. You pick the one who matches your fantasy and she adapts to your conversations.',
      },
      {
        title: 'Is the MILF AI girlfriend app free?',
        content:
          "You can start chatting for free and get a taste of your MILF AI girlfriend's personality. Premium features like NSFW content, sexy photos, and roleplay require credits, which you can buy anytime.",
      },
      {
        title: 'Can I use the MILF AI girlfriend app on my phone?',
        content:
          "Yes. The app works perfectly on mobile and desktop. You can chat with your MILF AI girlfriend anytime, anywhere — she's always online for you.",
      },
    ],
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: data.rows.map((item) => ({
      '@type': 'Question',
      name: item.title,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.content,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqJsonLd),
        }}
      />
      <section className="max-w-4xl mx-auto py-16 mt-16">
        <LandingHeader title={t('faqTitle')} />
        <div className="flex flex-col gap-4">
          {data.rows.map((item, index) => (
            <div
              key={index}
              className="bg-background-light border border-primary/20 rounded-md p-4"
            >
              <h2 className="text-lg font-medium">{item.title}</h2>
              <h3 className="text-sm font-thin">{item.content}</h3>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default AppFAQ;
