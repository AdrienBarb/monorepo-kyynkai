import { isProduction } from '@/utils/environments';
import { PrismaClient } from '@prisma/client';

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
  });
};

const prisma = globalForPrisma.prisma || createPrismaClient();

if (!isProduction && typeof window === 'undefined') {
  globalForPrisma.prisma = prisma;
}

export { prisma };
