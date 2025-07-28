'use client';

import Text from '../ui/Text';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectItem,
} from '../ui/Select';
import { useUser } from '@/hooks/users/useUser';
import useApi from '@/hooks/requests/useApi';
import { Card } from '../ui/Card';
import toast from 'react-hot-toast';
import { PRICE_OPTIONS } from '@/constants/constants';
import { useTranslations } from 'next-intl';

const ConversationSettings = () => {
  const { user, refetch } = useUser();
  const { usePut } = useApi();
  const t = useTranslations();

  const { mutate: updatePrice } = usePut(
    '/api/settings/conversations/messages-price',
    {
      onSuccess: () => {
        refetch();
        toast.success(t('priceUpdateSuccess'));
      },
    },
  );

  const handlePriceChange = (value: string) => {
    updatePrice({ fiatMessage: value });
  };

  return (
    <Card>
      <div className="flex justify-between items-center gap-4">
        <div className="w-full">
          <Text className="font-bold">{t('conversationSettingsTitle')}</Text>
          <Text className="text-sm">
            {t('conversationSettingsDescription')}
          </Text>
        </div>
        <Select
          value={user?.settings?.fiatMessage.toString()}
          onValueChange={handlePriceChange}
        >
          <SelectTrigger className="w-24">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {PRICE_OPTIONS.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </Card>
  );
};

export default ConversationSettings;
