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
import {
  buildQwenPromptTGI,
  ChatHistory,
} from '@/utils/llm/buildQwenPromptTGI';
import axios from 'axios';
import { getAiGirlfriendBySlug } from '@/services/ai-girlfriends/getAiGirlfriendBySlug';

const conversationSchema = z.object({
  slug: z.string(),
  message: z.string(),
});

export const POST = strictlyAuth(async (req: NextRequest) => {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    const userId = session?.user?.id;

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

    const conversation = await prisma.conversation.findFirst({
      where: {
        userId,
        aiGirlfriendId: aiGirlfriend.id,
      },
    });

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

    const inputs = buildQwenPromptTGI(system, history);

    const genTemperature = aiGirlfriend.genTemperature ?? 0.9;
    const genTopP = aiGirlfriend.genTopP ?? 0.9;
    const genMaxTokens = aiGirlfriend.genMaxTokens ?? 220;

    const HF_ENDPOINT = process.env.HF_ENDPOINT!;
    const HF_TOKEN = process.env.HF_TOKEN!;

    let assistantText =
      'Sorry sweetheart, I am not feeling well today. Come back later.';

    try {
      const llmResponse = await axios.post(
        `${HF_ENDPOINT}/generate`,
        {
          inputs,
          parameters: {
            temperature: genTemperature,
            top_p: genTopP,
            max_new_tokens: genMaxTokens,
            return_full_text: false,
            stop: ['<|im_end|>', '<|im_start|>'],
          },
        },
        {
          headers: {
            Authorization: `Bearer ${HF_TOKEN}`,
            'Content-Type': 'application/json',
          },
        },
      );

      const data = llmResponse.data;
      const generatedText = Array.isArray(data)
        ? data[0]?.generated_text ?? ''
        : data.generated_text ?? '';

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
});
