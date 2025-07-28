import React from 'react';
import { getTranslations } from 'next-intl/server';

const Landing = async () => {
  const t = await getTranslations();

  return (
    <div className="bg-primary flex justify-center items-center rounded-md px-8 py-8 max-w-screen-lg mx-auto">
      <div className="flex flex-col justify-between items-center gap-16 max-w-5xl w-full">
        <div className="flex flex-col text-center items-center justify-center lg:max-w-lg">
          <h1
            data-id="homepage-title"
            className="text-xl lg:text-3xl font-bold font-rubik text-secondary"
          >
            {t('landingTitle')}
          </h1>
          <h2 className="text-base lg:text-lg font-normal font-karla text-secondary mt-2">
            {t('landingSubtitle')}
          </h2>
        </div>
      </div>
    </div>
  );
};

export default Landing;
