'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import Title from '@/components/ui/Title';
import { TAGS } from '@/constants/constants';

interface PreferencesStepProps {
  selectedPreferences: string[];
  onPreferenceToggle: (preference: string) => void;
}

const PreferencesStep: React.FC<PreferencesStepProps> = ({
  selectedPreferences,
  onPreferenceToggle,
}) => {
  const t = useTranslations();

  return (
    <div className="space-y-8">
      <div className="text-center">
        <Title Tag="h2" className="mb-4 text-custom-black font-semibold">
          {t('whatInterestsYou')}
        </Title>
        <p className="text-custom-black font-medium">
          {t('selectPreferences')}
        </p>
      </div>

      <div className="flex flex-wrap gap-3 max-h-96 overflow-y-auto p-4 border border-custom-black/30 rounded-lg">
        {TAGS.map((tag) => (
          <button
            key={tag.value}
            onClick={() => onPreferenceToggle(tag.value)}
            className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
              selectedPreferences.includes(tag.value)
                ? 'bg-custom-black text-secondary'
                : 'bg-background/10 text-custom-black/80 hover:bg-custom-black/20'
            }`}
          >
            {t(`nudeCategories.${tag.label}`)}
          </button>
        ))}
      </div>
    </div>
  );
};

export default PreferencesStep;
