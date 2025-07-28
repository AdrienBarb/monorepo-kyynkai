'use client';

import { useUser } from '@/hooks/users/useUser';
import { Button } from '../ui/Button';
import useApi from '@/hooks/requests/useApi';
import { appRouter } from '@/constants/appRouter';
import { useRouter } from 'next/navigation';
import { formatCredits } from '@/utils/prices/formatCredits';
import { NudeWithPermissions } from '@/types/nudes';
import { getEncodedFullUrl } from '@/utils/links/getEncodedFullUrl';
import { useGlobalModalStore } from '@/stores/GlobalModalStore';
import { useTranslations } from 'next-intl';

interface Props {
  nude: NudeWithPermissions;
  afterBuyAction: (nude: NudeWithPermissions) => void;
}

const BuyButton = ({ nude, afterBuyAction }: Props) => {
  const { user, refetch } = useUser();
  const { openModal } = useGlobalModalStore();
  const router = useRouter();
  const t = useTranslations();

  const { usePost } = useApi();
  const { mutate: buyNude, isPending } = usePost(`/api/nudes/${nude.id}/buy`, {
    onSuccess: (boughtNude: NudeWithPermissions) => {
      refetch();
      afterBuyAction(boughtNude);
    },
  });

  const handleBuy = () => {
    if (!user) {
      const encodedUrl = getEncodedFullUrl();
      router.push(`${appRouter.login}?previousUrl=${encodedUrl}`);
      return;
    }

    if (user.creditsAmount < nude.creditPrice) {
      openModal('notEnoughCredits');
      return;
    }

    buyNude({});
  };

  return (
    <Button onClick={handleBuy} isLoading={isPending} disabled={isPending}>
      {t('buyForCredits', { credits: formatCredits(nude.creditPrice) })}
    </Button>
  );
};

export default BuyButton;
