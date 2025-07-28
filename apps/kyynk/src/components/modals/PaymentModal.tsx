'use client';

import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '../ui/Dialog';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '../ui/Carousel';
import { creditPackages } from '@/constants/creditPackages';
import { Button } from '../ui/Button';
import useApi from '@/hooks/requests/useApi';
import { cn } from '@/utils/tailwind/cn';
import { useTranslations } from 'next-intl';

const PaymentModal = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
}) => {
  console.log('🚀 ~ PaymentModal ~ open:', open);
  const { usePost } = useApi();
  const [selectedPackageId, setSelectedPackageId] = useState<number | null>(
    null,
  );
  const t = useTranslations();

  const { mutate: buyCredit, isPending } = usePost('/api/payment', {
    onSuccess: (data: { forwardUrl: string }) => {
      window.location.href = data.forwardUrl;
      setOpen(false);
    },
  });

  const handleBuy = () => {
    if (selectedPackageId !== null) {
      buyCredit({
        packageId: selectedPackageId,
        currentUrl: window.location.href,
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="z-[1000] max-w-screen-sm">
        <DialogHeader className="flex flex-col items-center">
          <DialogTitle>{t('paymentModalBuyCredits')}</DialogTitle>
          <DialogDescription>
            {t('paymentModalSelectPackage')}
          </DialogDescription>
        </DialogHeader>
        <Carousel
          opts={{
            align: 'start',
          }}
          className="w-full max-w-44 md:max-w-md mx-auto"
        >
          <CarouselContent>
            {creditPackages.map((pkg) => (
              <CarouselItem
                key={pkg.id}
                className="basis-full md:basis-1/2 lg:basis-1/3"
              >
                <div
                  className={cn(
                    'p-4 border rounded-lg flex flex-col items-center cursor-pointer',
                    selectedPackageId === pkg.id && 'border-primary',
                  )}
                  onClick={() => setSelectedPackageId(pkg.id)}
                >
                  <h3 className="text-lg font-bold">{pkg.name}</h3>
                  <p>
                    {t('paymentModalPrice')}: {pkg.price / 100} €
                  </p>
                  <p>
                    {t('paymentModalCoins')}: {pkg.coinsAmount / 100}
                  </p>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
        <DialogFooter>
          <Button
            className="w-full"
            disabled={isPending || selectedPackageId === null}
            isLoading={isPending}
            onClick={handleBuy}
          >
            {t('buy')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PaymentModal;
