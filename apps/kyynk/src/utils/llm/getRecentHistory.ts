import { prisma } from '@/lib/db/client';

export const getRecentHistory = async (conversationId: string, limit = 20) => {
  const msgs = await prisma.message.findMany({
    where: { conversationId },
    orderBy: { createdAt: 'asc' },
    take: 9999,
  });
  return msgs.slice(-limit).map((m) => ({
    role: m.sender === 'USER' ? 'user' : 'assistant',
    content: m.content,
  }));
};
