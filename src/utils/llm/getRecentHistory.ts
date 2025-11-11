import { MessageSender } from '@prisma/client';
import { prisma } from '@/lib/db/client';

export const getRecentHistory = async (conversationId: string, limit = 20) => {
  const msgs = await prisma.message.findMany({
    where: { conversationId },
    orderBy: { createdAt: 'desc' },
    take: limit,
  });

  return msgs.reverse().map((m) => ({
    role: m.sender === MessageSender.USER ? 'user' : 'assistant',
    content: m.content,
  }));
};
