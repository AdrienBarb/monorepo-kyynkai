import imgixLoader from '@/lib/imgix/loader';
import Image from 'next/image';
import Title from '@/components/ui/Title';
import { AiGirlfriendType } from '@/types/ai-girlfriends';

const ProfileHeader = ({
  aiGirlfriend,
}: {
  aiGirlfriend: AiGirlfriendType;
}) => {
  const profileImageUrl = imgixLoader({
    src: aiGirlfriend.profileImageId || '',
    width: 600,
    quality: 90,
  });

  return (
    <>
      <div className="relative aspect-[3/4] w-full max-w-48 overflow-hidden rounded-lg border border-primary/20 shadow-lg mb-2">
        <Image
          src={profileImageUrl}
          alt={aiGirlfriend.pseudo}
          fill
          className="object-cover transition-all duration-500 ease-in-out"
        />
      </div>

      <div className="text-center mb-4">
        <Title
          Tag="h1"
          className="text-xl font-bold font-karla text-primary mb-2"
        >
          {`${aiGirlfriend.pseudo}, ${aiGirlfriend.age}`}
        </Title>
        <p className="text-sm font-semibold font-karla text-muted-foreground">
          {aiGirlfriend.archetype}
        </p>
        {aiGirlfriend.hook && (
          <p className="text-xs text-muted-foreground max-w-xs mx-auto">
            {aiGirlfriend.hook}
          </p>
        )}
      </div>
    </>
  );
};

export default ProfileHeader;
