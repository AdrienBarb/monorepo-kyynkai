import { z } from 'zod';
import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/better-auth/auth';
import { errorMessages } from '@/lib/constants/errorMessage';
import { errorHandler } from '@/utils/errors/errorHandler';
import { strictlyAuth } from '@/hoc/strictlyAuth';
import { getCurrentUser } from '@/services/users/getCurrentUser';
import { NUDE_COST } from '@/constants/creditPackages';
import { prisma } from '@/lib/db/client';
import { getAiGirlfriendBySlug } from '@/services/ai-girlfriends-service/getAiGirlfriendBySlug';
import {
  CreditSaleType,
  GenerationStatus,
  MediaType,
  MessageSender,
} from '@prisma/client';
import { findOrCreateConversation } from '@/utils/conversations/findOrCreateConversation';
import { getRandomImageDeliveryResponse } from '@/constants/fallbackResponses';

const generateNudeSchema = z.object({
  slug: z.string(),
});

export const POST = strictlyAuth(async (req: NextRequest) => {
  try {
    const session = await auth.api.getSession({
      headers: req.headers,
    });
    const userId = session?.user.id;

    if (!userId) {
      return NextResponse.json(
        { error: errorMessages.AUTH_REQUIRED },
        { status: 401 },
      );
    }

    const body = await req.json();
    const payload = generateNudeSchema.parse(body);

    const aiGirlfriend = await getAiGirlfriendBySlug({ slug: payload.slug });
    if (!aiGirlfriend) {
      return NextResponse.json(
        { error: errorMessages.NOT_FOUND },
        { status: 404 },
      );
    }

    const loggedUser = await getCurrentUser({
      userId: userId!,
    });

    if (NUDE_COST > loggedUser?.creditBalance!) {
      return NextResponse.json(
        { error: errorMessages.INSUFFICIENT_CREDITS },
        { status: 400 },
      );
    }

    const result = await prisma.$transaction(async (tx) => {
      const conversation = await findOrCreateConversation({
        userId: userId!,
        aiGirlfriendId: aiGirlfriend.id,
        tx,
      });

      const generatedMedia = await tx.generatedMedia.create({
        data: {
          type: MediaType.IMAGE,
          status: GenerationStatus.PENDING,
          userId: userId!,
          conversationId: conversation.id,
        },
      });

      await tx.message.create({
        data: {
          content: getRandomImageDeliveryResponse(),
          conversationId: generatedMedia.conversationId!,
          sender: MessageSender.AI,
          generatedMediaId: generatedMedia.id,
        },
      });

      await tx.conversation.update({
        where: { id: generatedMedia.conversationId! },
        data: { lastMessageAt: new Date() },
      });

      await tx.user.update({
        where: {
          id: userId!,
        },
        data: {
          creditBalance: { decrement: NUDE_COST },
        },
      });

      await tx.creditSale.create({
        data: {
          userId: userId!,
          type: CreditSaleType.NUDE,
          amount: NUDE_COST,
        },
      });

      return generatedMedia;
    });

    try {
      const appUrl = process.env.NEXT_PUBLIC_BASE_URL;
      const falWebhookUrl = `${appUrl}/api/webhooks/fal`;

      const falResponse = await fetch(
        `https://queue.fal.run/fal-ai/lora?fal_webhook=${falWebhookUrl}`,
        {
          method: 'POST',
          headers: {
            Authorization: `Key ${process.env.FAL_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            model_name:
              'https://huggingface.co/adrienfndr/cyberrealistic-pony/resolve/60ea6d7e5b3ca88168feaea651060415f478114f/cyberrealisticPony_v130.safetensors',
            prompt: `${aiGirlfriend.triggerWords}, a brunette girl, on a bed, legs open, showing her pussy, big natural breasts, natural skin texture, crisp detailed eyes, soft cinematic lighting, shallow depth of field, 50mm look`,
            negative_prompt:
              '(worst quality:1.2), (low quality:1.2), (normal quality:1.2), lowres, bad anatomy, bad hands, (bad finger:1.2), signature, watermarks, ugly, blurry face, imperfect eyes, skewed eyes, unnatural face, unnatural body, error, extra limb, missing limbs',
            prompt_weighting: true,
            loras: [
              {
                path: aiGirlfriend.hfLoraPath,
                scale: 0.5,
              },
            ],
            embeddings: [],
            controlnets: [],
            image_size: 'portrait_4_3',
            num_inference_steps: 30,
            guidance_scale: 3.4,
            sampler: 'DPM++ 2M SDE',
            scheduler: 'DPM++ 2M SDE Karras',
            prediction_type: 'epsilon',
            image_format: 'jpeg',
            num_images: 1,
            width: 1024,
            height: 1365,
            tile_width: 1024,
            tile_height: 1024,
            tile_stride_width: 512,
            tile_stride_height: 512,
          }),
        },
      );
      console.log('🚀 ~ falResponse:', falResponse);

      if (!falResponse.ok) {
        await prisma.generatedMedia.update({
          where: { id: result.id },
          data: {
            status: GenerationStatus.FAILED,
          },
        });
        throw new Error('Failed to submit generation request');
      }

      const falData = await falResponse.json();

      await prisma.generatedMedia.update({
        where: { id: result.id },
        data: {
          status: GenerationStatus.PROCESSING,
          externalId: falData.request_id,
        },
      });
    } catch (falError) {
      await prisma.generatedMedia.update({
        where: { id: result.id },
        data: {
          status: GenerationStatus.FAILED,
        },
      });
      throw falError;
    }

    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    return errorHandler(error);
  }
});
