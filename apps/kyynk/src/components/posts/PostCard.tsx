'use client';

import { FC, useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { Button } from '@/components/ui/Button';
import Text from '@/components/ui/Text';
import Avatar from '@/components/ui/Avatar';
import { Lock, Calendar } from 'lucide-react';
import imgixLoader from '@/lib/imgix/loader';
import { cn } from '@/utils/tailwind/cn';
import useApi from '@/hooks/requests/useApi';
import { useUser } from '@/hooks/users/useUser';
import MediaViewerModal from '@/components/modals/MediaViewerModal';
import { useGlobalModalStore } from '@/stores/GlobalModalStore';
import { POST_UNLOCK_COST } from '@/constants/creditPackages';
import { hasEnoughCredits } from '@/utils/users/hasEnoughCredits';
import { PostWithMedia, PostWithAiGirlfriend } from '@/types/posts';

type PostCardProps = {
  post: PostWithMedia | PostWithAiGirlfriend;
  onUnlock?: (postId: string, userId: string) => void;
  showAuthor?: boolean;
};

const PostCard: FC<PostCardProps> = ({
  post,
  onUnlock,
  showAuthor = false,
}) => {
  const { user, refetch: refetchUser } = useUser();
  const { usePut } = useApi();
  const { openModal } = useGlobalModalStore();

  const isPrivate = post.media?.visibility === 'PRIVATE';
  const hasMedia = post.media?.mediaKey;
  const isAlreadyUnlocked =
    user?.id && post.media?.unlockUsers?.includes(user.id);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [showMediaModal, setShowMediaModal] = useState(false);

  useEffect(() => {
    setIsUnlocked(isAlreadyUnlocked || false);
  }, [isAlreadyUnlocked]);

  const isBlurred = isPrivate && !isUnlocked;

  const { mutate: unlockMutation, isPending } = usePut('/api/unlock-media', {
    onSuccess: () => {
      setIsUnlocked(true);
      refetchUser();
      if (user?.id && onUnlock) {
        onUnlock(post.id, user.id);
      }
    },
  });

  const handleUnlock = () => {
    if (!post.media?.id) return;

    if (!user) {
      openModal('auth');
      return;
    }

    if (
      !hasEnoughCredits({
        user: user,
        requiredCredits: POST_UNLOCK_COST,
      })
    ) {
      openModal('notEnoughCredits');
      return;
    }

    unlockMutation({
      mediaId: post.media.id,
    });
  };

  const handleMediaClick = () => {
    if (hasMedia && !isBlurred) {
      setShowMediaModal(true);
    }
  };

  const formatDate = (date: Date | string) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const aiGirlfriend = 'aiGirlfriend' in post ? post.aiGirlfriend : null;

  return (
    <>
      <div className="bg-background-light rounded-lg border border-primary/20 overflow-hidden">
        {hasMedia && (
          <div className="relative aspect-[3/4] w-full overflow-hidden">
            <Image
              src={imgixLoader({
                src: post.media!.mediaKey,
                width: 400,
                quality: 80,
              })}
              alt="Post media"
              fill
              className={cn(
                'object-cover transition-all duration-300',
                isBlurred && 'blur-xl scale-110',
                !isBlurred && 'cursor-pointer hover:scale-105',
              )}
              onClick={handleMediaClick}
            />

            {isBlurred && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <div className="text-center space-y-4">
                  <Lock className="w-8 h-8 text-white mx-auto" />
                  <Text className="text-white font-medium">Unlock to view</Text>
                  <Button
                    onClick={handleUnlock}
                    isLoading={isPending}
                    size="sm"
                    className="bg-white text-black hover:bg-white/90"
                  >
                    {isPending ? 'Unlocking...' : 'Unlock 🔓'}
                  </Button>
                </div>
              </div>
            )}
          </div>
        )}

        <div className="p-4 space-y-3">
          {showAuthor && aiGirlfriend && (
            <div className="flex items-center gap-2 mb-2">
              <Link
                href={`/${aiGirlfriend.slug}`}
                className="flex items-center gap-2 hover:opacity-80 transition-opacity"
              >
                <Avatar imageId={aiGirlfriend.profileImageId} size={34} />
                <Text className="font-medium text-primary">
                  {aiGirlfriend.pseudo}
                </Text>
              </Link>
            </div>
          )}

          <Text className="text-primary leading-relaxed">{post.content}</Text>

          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="w-4 h-4" />
            <span>{formatDate(post.createdAt)}</span>
            {isPrivate && (
              <>
                <span>•</span>
                <div className="flex items-center gap-1">
                  <Lock className="w-3 h-3" />
                  <span>Private</span>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {hasMedia && !isBlurred && (
        <MediaViewerModal
          isOpen={showMediaModal}
          onClose={() => setShowMediaModal(false)}
          mediaKey={post.media!.mediaKey}
          caption={post.content}
        />
      )}
    </>
  );
};

export default PostCard;
