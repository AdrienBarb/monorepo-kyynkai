import { isProduction } from '@/utils/environments';
import { PrismaClient } from '@prisma/client';
import { withAccelerate } from '@prisma/extension-accelerate';

const globalForPrisma = global as unknown as {
  prisma: PrismaClient;
};

const createPrismaClient = () => {
  if (typeof window !== 'undefined') {
    throw new Error(
      'PrismaClient is unable to run in this browser environment',
    );
  }

  return new PrismaClient({
    log: isProduction ? ['error'] : ['query', 'error', 'warn'],
    datasources: {
      db: {
        url: process.env.DATABASE_URL,
      },
    },
  }).$extends(withAccelerate());
};

const prisma = globalForPrisma.prisma || createPrismaClient();

if (!isProduction && typeof window === 'undefined') {
  globalForPrisma.prisma = prisma;
}

export { prisma };
