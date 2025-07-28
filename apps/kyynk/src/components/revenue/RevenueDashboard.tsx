import { Card } from '../ui/Card';
import Text from '../ui/Text';
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from '@/components/ui/Popover';
import { Info } from 'lucide-react';
import { getFiatWithCredits } from '@/utils/prices/getMediaPrice';
import React, { FC } from 'react';
import { formatCredits } from '@/utils/prices/formatCredits';
import { formatFiat } from '@/utils/prices/formatFiat';
import { useTranslations } from 'next-intl';

interface RevenueDashboardProps {
  availableRevenue: number;
  incomingRevenue: number;
}

const RevenueDashboard: FC<RevenueDashboardProps> = ({
  availableRevenue,
  incomingRevenue,
}) => {
  const t = useTranslations();
  const { fiatPrice: incomingRevenueFiat, creditPrice: incomingRevenueCredit } =
    getFiatWithCredits(incomingRevenue);

  const {
    fiatPrice: availableRevenueFiat,
    creditPrice: availableRevenueCredit,
  } = getFiatWithCredits(availableRevenue);

  return (
    <div>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <Card>
          <div className="flex items-center justify-between">
            <Text className="text-lg font-light mb-2">
              {t('revenueDashboardIncoming')}
            </Text>
            <Popover>
              <PopoverTrigger asChild>
                <span className="ml-2 cursor-pointer">
                  <Info size={20} strokeWidth={1} />
                </span>
              </PopoverTrigger>
              <PopoverContent>
                <Text>{t('revenueDashboardIncomingDesc')}</Text>
              </PopoverContent>
            </Popover>
          </div>
          <Text className="text-2xl font-bold">
            {formatFiat(incomingRevenueFiat)} €
          </Text>
          <Text className="text-sm font-thin">
            {formatCredits(incomingRevenueCredit)} {t('credits')}
          </Text>
        </Card>
        <Card>
          <div className="flex items-center justify-between">
            <Text className="text-lg font-light mb-2">
              {t('revenueDashboardAvailable')}
            </Text>
            <Popover>
              <PopoverTrigger asChild>
                <span className="ml-2 cursor-pointer">
                  <Info size={20} strokeWidth={1} />
                </span>
              </PopoverTrigger>
              <PopoverContent>
                <Text>{t('revenueDashboardAvailableDesc')}</Text>
              </PopoverContent>
            </Popover>
          </div>
          <Text className="text-2xl font-bold">
            {formatFiat(availableRevenueFiat)} €
          </Text>
          <Text className="text-sm font-thin">
            {formatCredits(availableRevenueCredit)} {t('credits')}
          </Text>
        </Card>
      </div>
    </div>
  );
};

export default RevenueDashboard;
