import React, { FC } from 'react';
import { TwitterShareButton, TelegramShareButton } from 'react-share';
import LinkIcon from '@mui/icons-material/Link';
import TwitterIcon from '@mui/icons-material/Twitter';
import TelegramIcon from '@mui/icons-material/Telegram';
import {
  Dialog,
  DialogContent,
  DialogClose,
  DialogTitle,
  VisuallyHidden,
} from '@/components/ui/Dialog';
import toast from 'react-hot-toast';

interface ShareModalProps {
  open: boolean;
  setOpen: (value: boolean) => void;
  urlToShare: string;
  title: string;
}

const ShareModal: FC<ShareModalProps> = ({
  open,
  setOpen,
  urlToShare,
  title,
}) => {
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(urlToShare);
      toast.success('Link copied to clipboard');
    } catch (error) {
      console.error('Failed to copy link:', error);
    }
  };

  const renderShareButton = (
    ShareButtonComponent: React.ComponentType<any>,
    IconComponent: React.ComponentType<any>,
    platformName: string,
  ) => (
    <ShareButtonComponent url={urlToShare} title={title}>
      <div className="flex flex-col items-center gap-2 cursor-pointer">
        <div className="bg-primary w-10 h-10 flex items-center justify-center rounded-full">
          <IconComponent sx={{ color: '#FFF0EB' }} />
        </div>
        <p className="font-karla font-light text-xs text-background">
          {platformName}
        </p>
      </div>
    </ShareButtonComponent>
  );

  return (
    <Dialog open={open} onOpenChange={setOpen} modal={true}>
      <DialogContent className="z-[1000] bg-secondary p-16">
        <VisuallyHidden>
          <DialogTitle>Share</DialogTitle>
        </VisuallyHidden>
        <div className="flex flex-wrap justify-around items-center gap-8">
          {renderShareButton(TwitterShareButton, TwitterIcon, 'Twitter')}
          {renderShareButton(TelegramShareButton, TelegramIcon, 'Telegram')}
          <div
            className="flex flex-col items-center gap-2 cursor-pointer"
            onClick={copyToClipboard}
          >
            <div className="bg-primary w-10 h-10 flex items-center justify-center rounded-full">
              <LinkIcon sx={{ color: '#FFF0EB' }} />
            </div>
            <p className="font-karla font-light text-xs text-background">
              Link
            </p>
          </div>
        </div>
        <DialogClose className="absolute right-4 top-4">
          <span className="sr-only">Close</span>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
};

export default ShareModal;
