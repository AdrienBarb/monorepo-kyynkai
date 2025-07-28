import React, { useState } from 'react';
import { Dialog, DialogContent } from '../ui/Dialog';
import ApiVideoPlayer from '@api.video/react-player';
import NudeCard from '../nudes/NudeCard';
import BuyButton from '../nudes/BuyButton';
import { NudeWithPermissions } from '@/types/nudes';
import HeaderNudeModal from '../nudes/HeaderNudeModal';

interface NudeModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  nude?: NudeWithPermissions | null;
  refetch: () => void;
  setSelectedNude: (nude: NudeWithPermissions | null) => void;
  showHeader?: boolean;
}

const NudeModal: React.FC<NudeModalProps> = ({
  open,
  setOpen,
  nude,
  refetch,
  showHeader = false,
}) => {
  const [displayedNude, setDisplayedNude] =
    useState<NudeWithPermissions | null>(nude!);

  const handleAfterBuyAction = (newNude: NudeWithPermissions) => {
    refetch();
    setDisplayedNude(newNude);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="z-[1000] pt-12">
        {showHeader && displayedNude && (
          <HeaderNudeModal nude={displayedNude} />
        )}

        {displayedNude &&
        displayedNude.permissions.canView &&
        displayedNude.media?.videoId ? (
          <div className="rounded-md overflow-hidden">
            <ApiVideoPlayer
              video={{ id: displayedNude.media.videoId }}
              style={{ height: '400px', width: '100%' }}
              hideTitle={true}
              controls={['play', 'progressBar', 'volume', 'fullscreen']}
            />
          </div>
        ) : (
          displayedNude && <NudeCard nude={displayedNude} />
        )}
        {displayedNude && displayedNude.permissions.canBuy && (
          <BuyButton
            nude={displayedNude}
            afterBuyAction={handleAfterBuyAction}
          />
        )}
      </DialogContent>
    </Dialog>
  );
};

export default NudeModal;
