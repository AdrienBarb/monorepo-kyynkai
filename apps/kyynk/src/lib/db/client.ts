import { isProduction } from '@/utils/environments';
import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

export const prisma = globalForPrisma.prisma || new PrismaClient();

if (!isProduction) globalForPrisma.prisma = prisma;
