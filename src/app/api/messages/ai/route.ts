import { z } from 'zod';
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db/client';
import { errorHandler } from '@/utils/errors/errorHandler';
import { strictlyAuth } from '@/hoc/strictlyAuth';
import { errorMessages } from '@/lib/constants/errorMessage';
import { MessageSender } from '@prisma/client';
import { auth } from '@/lib/better-auth/auth';
import { headers } from 'next/headers';
import { getRecentHistory } from '@/utils/llm/getRecentHistory';
import { systemFromCard } from '@/utils/llm/systemFromCard';
import { ChatHistory } from '@/utils/llm/buildQwenPromptTGI';
import Together from 'together-ai';
import { getAiGirlfriendBySlug } from '@/services/ai-girlfriends-service/getAiGirlfriendBySlug';
import { getGuestFromCookie } from '@/services/guests/getGuestFromCookie';
import { getRotatingFallbackResponse } from '@/constants/fallbackResponses';

const conversationSchema = z.object({
  slug: z.string(),
  message: z.string(),
});

export const POST = async (req: NextRequest) => {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });
    const userId = session?.user?.id ?? null;

    const body = await req.json();
    const payload = conversationSchema.parse(body);

    const aiGirlfriend = await getAiGirlfriendBySlug({
      slug: payload.slug,
      selectFields: {
        voice: true,
        boundaries: true,
        styleReminders: true,
        petNames: true,
        emojiRatio: true,
        sentenceLength: true,
        aftercare: true,
        consentChecks: true,
        genTemperature: true,
        genTopP: true,
        genMaxTokens: true,
      },
    });

    if (!aiGirlfriend) {
      return NextResponse.json(
        { error: errorMessages.NOT_FOUND },
        { status: 404 },
      );
    }

    let conversation = null;

    if (userId) {
      conversation = await prisma.conversation.findFirst({
        where: {
          userId,
          aiGirlfriendId: aiGirlfriend.id,
        },
      });
    } else {
      const guest = await getGuestFromCookie();
      if (!guest) {
        return NextResponse.json(
          { error: errorMessages.NOT_AUTHORIZED },
          { status: 400 },
        );
      }
      conversation = await prisma.conversation.findFirst({
        where: { guestId: guest.id, aiGirlfriendId: aiGirlfriend.id },
        select: { id: true },
      });

      const aiRepliesCount = await prisma.message.count({
        where: { conversationId: conversation?.id!, sender: MessageSender.AI },
      });
      if (aiRepliesCount > 0) {
        return NextResponse.json(
          { error: errorMessages.NOT_AUTHORIZED },
          { status: 400 },
        );
      }
    }

    if (!conversation) {
      return NextResponse.json(
        { error: errorMessages.NOT_FOUND },
        { status: 404 },
      );
    }

    const history = (await getRecentHistory(
      conversation.id,
      20,
    )) as ChatHistory[];

    const system = systemFromCard(aiGirlfriend);

    const messages = [
      {
        role: 'system' as const,
        content: system,
      },
      ...history.map((msg) => ({
        role: msg.role as 'user' | 'assistant',
        content: msg.content,
      })),
    ];

    const genTemperature = aiGirlfriend.genTemperature ?? 0.9;
    const genTopP = aiGirlfriend.genTopP ?? 0.9;
    const genMaxTokens = aiGirlfriend.genMaxTokens ?? 220;

    const TOGETHER_API_KEY = process.env.TOGETHER_API_KEY!;

    const aiRepliesCount = await prisma.message.count({
      where: { conversationId: conversation.id, sender: MessageSender.AI },
    });

    let assistantText: string = getRotatingFallbackResponse(aiRepliesCount);

    try {
      const together = new Together({
        apiKey: TOGETHER_API_KEY,
      });

      const response = await together.chat.completions.create({
        messages,
        model: 'Qwen/Qwen2.5-7B-Instruct-Turbo',
        temperature: genTemperature,
        top_p: genTopP,
        max_tokens: genMaxTokens,
        stop: ['<|im_end|>', '<|im_start|>'],
      });

      const generatedText = response.choices[0]?.message?.content ?? '';

      if (generatedText.trim()) {
        assistantText = generatedText;
      }
    } catch (llmError) {
      console.error('LLM request failed:', llmError);
    }

    const assistantMsg = await prisma.message.create({
      data: {
        content: assistantText,
        conversationId: conversation.id,
        sender: MessageSender.AI,
      },
    });

    return NextResponse.json(assistantMsg, { status: 201 });
  } catch (error) {
    return errorHandler(error);
  }
};
