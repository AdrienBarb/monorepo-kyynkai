'use server';
import { signIn } from '@/auth';
import { errorMessages } from '@/lib/constants/errorMessage';
import { appRouter } from '@/constants/appRouter';
import { AuthError } from 'next-auth';
import { isRedirectError } from 'next/dist/client/components/redirect-error';

export async function authenticate({
  email,
  password,
  previousUrl,
}: {
  email: string;
  password: string;
  previousUrl?: string | null;
}) {
  try {
    await signIn('credentials', {
      email: email,
      password: password,
      redirect: true,
      redirectTo: previousUrl || appRouter.home,
    });

    return { success: true };
  } catch (error) {
    if (isRedirectError(error)) {
      throw error;
    }

    if (error instanceof AuthError) {
      return { success: false, error: error?.cause?.err?.message };
    }

    return { success: false, error: errorMessages.FAILED_TO_AUTHENTICATE };
  }
}
