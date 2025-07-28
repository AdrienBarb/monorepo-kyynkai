import React, { FC } from 'react';
import LandingHeader from '@/components/home/LandingHeader';
import { getTranslations } from 'next-intl/server';

interface Props {}

const AppFAQ: FC<Props> = async ({}) => {
  const t = await getTranslations();

  const data = {
    rows: [
      {
        title: t('faqQuestion1'),
        content: t('faqAnswer1'),
      },
      {
        title: t('faqQuestion2'),
        content: t('faqAnswer2'),
      },
      {
        title: t('faqQuestion3'),
        content: t('faqAnswer3'),
      },
      {
        title: t('faqQuestion4'),
        content: t('faqAnswer4'),
      },
      {
        title: t('faqQuestion5'),
        content: t('faqAnswer5'),
      },
    ],
  };

  return (
    <section className="max-w-4xl mx-auto py-16">
      <LandingHeader title={t('faqTitle')} />
      <div className="flex flex-col gap-4">
        {data.rows.map((item, index) => (
          <div key={index} className="bg-primary rounded-md p-4">
            <h2 className="text-lg font-medium">{item.title}</h2>
            <h3 className="text-sm font-thin">{item.content}</h3>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AppFAQ;
