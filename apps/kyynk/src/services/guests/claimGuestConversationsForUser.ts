// lib/conversations/claimGuest.ts
import { prisma } from '@/lib/db/client';

type ClaimResult = { claimed: number; merged: number };

export async function claimGuestConversationsForUser(
  userId: string,
  guestId: string | null,
): Promise<ClaimResult> {
  if (!guestId) return { claimed: 0, merged: 0 };

  return prisma.$transaction(async (tx) => {
    // 1) Get all guest convos
    const guestConvos = await tx.conversation.findMany({
      where: { guestId },
      select: { id: true, aiGirlfriendId: true },
    });
    if (guestConvos.length === 0) {
      // No convos to claim; safe to remove guest
      await tx.guest.delete({ where: { id: guestId } }).catch(() => {});
      return { claimed: 0, merged: 0 };
    }

    // 2) Check what the user already has for these AIs
    const aiIds = [...new Set(guestConvos.map((c) => c.aiGirlfriendId))];
    const existing = await tx.conversation.findMany({
      where: { userId, aiGirlfriendId: { in: aiIds } },
      select: { id: true, aiGirlfriendId: true },
    });
    const existingByAi = new Map(existing.map((e) => [e.aiGirlfriendId, e]));

    // Partition guest convos into "claim directly" vs "merge into existing"
    const toClaimIds: string[] = [];
    const toMergePairs: Array<{ fromId: string; toId: string }> = [];

    for (const c of guestConvos) {
      const ex = existingByAi.get(c.aiGirlfriendId);
      if (ex) toMergePairs.push({ fromId: c.id, toId: ex.id });
      else toClaimIds.push(c.id);
    }

    // 3) Bulk-claim the non-conflicting ones
    if (toClaimIds.length) {
      await tx.conversation.updateMany({
        where: { id: { in: toClaimIds } },
        data: { userId, guestId: null },
      });
    }

    // 4) Merge conflicts one-by-one (preserve messages + lastMessageAt)
    for (const { fromId, toId } of toMergePairs) {
      await tx.message.updateMany({
        where: { conversationId: fromId },
        data: { conversationId: toId },
      });

      // keep lastMessageAt accurate
      const last = await tx.message.findFirst({
        where: { conversationId: toId },
        orderBy: { createdAt: 'desc' },
        select: { createdAt: true },
      });
      if (last) {
        await tx.conversation.update({
          where: { id: toId },
          data: { lastMessageAt: last.createdAt },
        });
      }

      await tx.conversation.delete({ where: { id: fromId } });
    }

    // 5) Remove the guest row (conversations are now reassigned/merged)
    await tx.guest.delete({ where: { id: guestId } }).catch(() => {});

    return { claimed: toClaimIds.length, merged: toMergePairs.length };
  });
}
