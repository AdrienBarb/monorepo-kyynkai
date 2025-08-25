import { auth } from '@/lib/better-auth/auth';
import { headers } from 'next/headers';
import { getCurrentUser } from '@/services/users/getCurrentUser';
import { redirect } from 'next/navigation';
import { UserRole } from '@prisma/client';
import Link from 'next/link';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-8">
              <h1 className="text-xl font-semibold text-gray-900">
                Admin Panel
              </h1>
              <nav className="flex space-x-4">
                <Link
                  href="/admin/ai"
                  className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
                >
                  AI Girlfriends
                </Link>
              </nav>
            </div>
            <div className="text-sm text-gray-600">
              Logged in as: {user.email}
            </div>
          </div>
        </div>
      </div>
      {children}
    </div>
  );
}
