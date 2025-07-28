'use client';

import React, { useState, useEffect } from 'react';
import useApi from '@/hooks/requests/useApi';
import { TAGS } from '@/constants/constants';
import { useUser } from '@/hooks/users/useUser';
import { apiRouter } from '@/constants/apiRouter';
import { Button } from '@/components/ui/Button';
import { toast } from 'react-hot-toast';
import Text from '../ui/Text';
import { Card } from '../ui/Card';
import { useTranslations } from 'next-intl';

const PreferencesSettings = () => {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const { usePut } = useApi();
  const { user, refetch } = useUser();
  const t = useTranslations();

  useEffect(() => {
    if (user?.preferences) {
      setSelectedTags(user.preferences);
    }
  }, [user]);

  const { mutate: editUserPreferences, isPending } = usePut(apiRouter.me, {
    onSuccess: () => {
      refetch();
      toast.success(t('preferencesUpdateSuccess'));
    },
  });

  const handleTagSelection = (tag: string) => {
    let clonedSelectedTags = [...selectedTags];

    if (clonedSelectedTags.includes(tag)) {
      clonedSelectedTags = [...clonedSelectedTags.filter((t) => t !== tag)];
    } else {
      clonedSelectedTags = [...clonedSelectedTags, tag];
    }

    setSelectedTags(clonedSelectedTags);
  };

  return (
    <Card>
      <div className="w-full mb-4">
        <Text className="font-bold">{t('preferencesSettingsTitle')}</Text>
        <Text className="text-sm">{t('preferencesSettingsDescription')}</Text>
      </div>
      <div className="flex flex-wrap gap-4 mb-4 w-full">
        {TAGS.map((currentTag, index) => {
          return (
            <div
              key={index}
              onClick={() => handleTagSelection(currentTag.value)}
              className={`text-center lg:w-fit border border-neutral-200 rounded-md p-2 cursor-pointer hover:border-neutral-200 hover:bg-neutral-200 ${
                selectedTags.includes(currentTag.value)
                  ? 'bg-primary border-primary'
                  : ''
              }`}
            >
              {t(`nudeCategories.${currentTag.value}`)}
            </div>
          );
        })}
      </div>

      <Button
        isLoading={isPending}
        onClick={() => {
          editUserPreferences({ preferences: selectedTags });
        }}
      >
        {t('save')}
      </Button>
    </Card>
  );
};

export default PreferencesSettings;
