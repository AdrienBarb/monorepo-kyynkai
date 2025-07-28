import React from 'react';
import LandingHeader from '@/components/home/LandingHeader';
import { getTranslations } from 'next-intl/server';

const CreatorFAQ = async () => {
  const t = await getTranslations();

  const data = {
    rows: [
      {
        title: t('creatorFaqQ1'),
        content: t('creatorFaqA1'),
      },
      {
        title: t('creatorFaqQ2'),
        content: t('creatorFaqA2'),
      },
      {
        title: t('creatorFaqQ3'),
        content: t('creatorFaqA3'),
      },
      {
        title: t('creatorFaqQ4'),
        content: t('creatorFaqA4'),
      },
      {
        title: t('creatorFaqQ5'),
        content: t('creatorFaqA5'),
      },
      {
        title: t('creatorFaqQ6'),
        content: t('creatorFaqA6'),
      },
    ],
  };

  return (
    <section className="max-w-4xl mx-auto py-16 px-4">
      <LandingHeader title={t('creatorFaqTitle')} />
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

export default CreatorFAQ;
