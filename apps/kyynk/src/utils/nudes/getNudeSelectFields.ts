export const getNudeSelectFields = () => ({
  id: true,
  description: true,
  creditPrice: true,
  fiatPrice: true,
  createdAt: true,
  userId: true,
  buyers: true,
  tags: true,
  isArchived: true,
  media: {
    select: {
      id: true,
      thumbnailId: true,
      videoId: true,
    },
  },
  user: {
    select: {
      id: true,
      pseudo: true,
      profileImageId: true,
      slug: true,
    },
  },
});
