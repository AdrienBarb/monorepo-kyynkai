import { prisma } from '@/lib/db/client';
import { errorMessages } from '@/lib/constants/errorMessage';
import { checkOrCreateSlug } from '@/utils/users/checkOrCreateSlug';
import { Prisma, User } from '@prisma/client';
import { z } from 'zod';
import { updateUserSchema } from '@/schemas/users/updateUserSchema';

export async function updateUser({
  userId,
  body,
}: {
  userId: string;
  body: z.infer<typeof updateUserSchema>;
}): Promise<Partial<User>> {
  const data: Prisma.UserUpdateInput = {};

  if (body.pseudo) {
    const existingUser = await prisma.user.findFirst({
      where: { pseudo: body.pseudo.toLowerCase() },
    });

    if (existingUser && existingUser.id !== userId) {
      throw new Error(errorMessages.PSEUDO_ALREADY_EXIST);
    }

    data.pseudo = body.pseudo;
    data.slug = await checkOrCreateSlug(body.pseudo);
  }

  if (body.email) {
    data.email = body.email;
  }

  if (body.userType) {
    data.userType = body.userType;
  }

  if (body.preferences) {
    data.preferences = body.preferences;
  }

  if (body.description) {
    data.description = body.description;
  }

  if (body.age) {
    data.age = body.age;
  }

  if (body.gender) {
    data.gender = body.gender;
  }

  if (body.bodyType) {
    data.bodyType = body.bodyType;
  }

  if (body.hairColor) {
    data.hairColor = body.hairColor;
  }

  if (body.country) {
    data.country = body.country;
  }

  if (body.languages) {
    data.languages = body.languages;
  }

  if (body.tags) {
    data.tags = body.tags;
  }

  if (body.profileImageId) {
    data.profileImageId = body.profileImageId;
  }

  if (body.contentProviderPolicyAccepted) {
    data.contentProviderPolicyAccepted = body.contentProviderPolicyAccepted;
  }

  return prisma.user.update({
    where: { id: userId },
    data,
    select: {
      id: true,
      pseudo: true,
      email: true,
      userType: true,
      slug: true,
      description: true,
      profileImageId: true,
      isArchived: true,
      age: true,
      gender: true,
      bodyType: true,
      hairColor: true,
      country: true,
      languages: true,
      tags: true,
      contentProviderPolicyAccepted: true,
    },
  });
}
