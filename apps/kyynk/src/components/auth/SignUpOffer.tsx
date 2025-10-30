'use client';

import Avatar from '../ui/Avatar';
import { cn } from '@/utils/tailwind/cn';

export type SignUpOfferVariant = 'message' | 'media' | 'default' | 'fantasy';

interface SignUpOfferProps {
  context?: SignUpOfferVariant;
  girlfriendName?: string;
  avatarImageId?: string;
  className?: string;
}

const copy = (v: SignUpOfferVariant, name: string) => {
  const you = name || 'I';
  const cta = 'Create your account to see it';

  switch (v) {
    case 'message':
      return {
        title: `${you} wrote you a reply 💌`,
        cta,
      };
    case 'media':
      return {
        title: `${you} sent you a photo 📸`,
        cta,
      };
    case 'fantasy':
      return {
        title: `Let’s get a little closer 🔥`,
        cta: 'Create your account to play with her',
      };
    default:
      return {
        title: `Let’s get a little closer 🔥`,
        cta: 'Create your account to chat with her',
      };
  }
};

const SignUpOffer: React.FC<SignUpOfferProps> = ({
  context = 'default',
  girlfriendName,
  avatarImageId,
  className,
}) => {
  const { title, cta } = copy(context, girlfriendName || '');

  return (
    <div
      className={cn(
        'w-full flex flex-col items-center justify-center relative p-6 pb-4 text-primary',
        className,
      )}
    >
      <div className="relative">
        <Avatar imageId={avatarImageId} size={160} />
      </div>

      <h3 className="text-xl font-semibold text-primary mt-4 text-center">
        {title}
      </h3>

      <p className="mt-2 text-sm text-primary/90 text-center">{cta}</p>
    </div>
  );
};

export default SignUpOffer;
