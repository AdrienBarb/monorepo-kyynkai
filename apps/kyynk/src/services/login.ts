import { errorMessages } from '@/lib/constants/errorMessage';
import { prisma } from '@/lib/db/client';
import bcrypt from 'bcryptjs';

export async function login({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  if (!email || !password) {
    throw new Error(errorMessages.MISSING_FIELDS);
  }

  const formattedEmail = email.toLowerCase();

  const user = await prisma.user.findUnique({
    where: { email: formattedEmail },
  });

  if (!user) {
    throw new Error(errorMessages.USER_NOT_FOUND);
  }

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) {
    throw new Error(errorMessages.INCORRECT_PASSWORD);
  }

  return user;
}
