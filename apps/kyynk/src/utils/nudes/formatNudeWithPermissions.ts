import { NudeFromPrisma, NudeWithPermissions } from '@/types/nudes';

export const formatNudeWithPermissions = (
  nude: NudeFromPrisma,
  connectedUserId: string | undefined,
): NudeWithPermissions => {
  const isFree = nude.creditPrice === 0;
  const isConnectedUserBoughtTheNude =
    connectedUserId && nude.buyers.includes(connectedUserId);
  const isOwner = nude.userId === connectedUserId;

  const canView = Boolean(isFree || isConnectedUserBoughtTheNude);
  const canEdit = Boolean(isOwner);
  const canBuy = Boolean(!isOwner && !isConnectedUserBoughtTheNude && !isFree);

  return {
    ...nude,
    media: {
      ...nude.media,
      videoId: canView ? nude.media.videoId : null,
    },
    permissions: {
      canView,
      canEdit,
      canBuy,
    },
  };
};
