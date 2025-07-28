import { prisma } from '@/lib/db/client';
import { errorMessages } from '@/lib/constants/errorMessage';

interface ValidateMessageCreationParams {
  userId: string;
  recipientSlug: string;
}

interface ValidationResult {
  isValid: boolean;
  error?: {
    message: string;
    status: number;
  };
  data?: {
    currentUser: {
      creditsAmount: number;
    };
    recipient: {
      id: string;
      settings: {
        creditMessage: number | null;
      } | null;
    };
  };
}

export const validateMessageCreation = async ({
  userId,
  recipientSlug,
}: ValidateMessageCreationParams): Promise<ValidationResult> => {
  const currentUser = await prisma.user.findUnique({
    where: { id: userId },
    select: { creditsAmount: true },
  });

  if (!currentUser) {
    return {
      isValid: false,
      error: {
        message: errorMessages.USER_NOT_FOUND,
        status: 404,
      },
    };
  }

  const recipient = await prisma.user.findUnique({
    where: { slug: recipientSlug },
    select: {
      id: true,
      settings: { select: { creditMessage: true } },
    },
  });

  if (!recipient) {
    return {
      isValid: false,
      error: {
        message: errorMessages.USER_NOT_FOUND,
        status: 404,
      },
    };
  }

  const requiredCredits = recipient.settings?.creditMessage || 0;
  if (requiredCredits > 0 && currentUser.creditsAmount < requiredCredits) {
    return {
      isValid: false,
      error: {
        message: errorMessages.INSUFFICIENT_CREDITS,
        status: 400,
      },
    };
  }

  return {
    isValid: true,
    data: {
      currentUser,
      recipient,
    },
  };
};
