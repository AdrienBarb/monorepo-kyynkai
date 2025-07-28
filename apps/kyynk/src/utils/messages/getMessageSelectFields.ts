import { getNudeSelectFields } from '../nudes/getNudeSelectFields';

export const getMessageSelectFields = () => ({
  id: true,
  content: true,
  senderId: true,
  createdAt: true,
  status: true,
  attachment: {
    select: {
      id: true,
      type: true,
      nude: {
        select: getNudeSelectFields(),
      },
    },
  },
});
