import { auth } from '@/lib/better-auth/auth';
import { headers } from 'next/headers';
import { getCurrentUser } from '@/services/users/getCurrentUser';
import { redirect } from 'next/navigation';
import { UserRole } from '@prisma/client';

export default async function DemoPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const userId = session?.user?.id;

  if (!userId) {
    redirect('/');
  }

  const user = await getCurrentUser({ userId: userId! });

  if (!user?.roles.includes(UserRole.ADMIN)) {
    redirect('/');
  }

  return <div className="space-y-6">hello</div>;
}
