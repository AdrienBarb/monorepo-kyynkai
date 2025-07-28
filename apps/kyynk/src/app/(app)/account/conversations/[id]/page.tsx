import { getConversationById } from '@/services/conversations/getConversationById';
import React from 'react';
import Conversation from '@/components/conversations/Conversation';
import { ConversationType } from '@/types/conversations';
import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import { appRouter } from '@/constants/appRouter';

export type PageProps = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

const CurrentConversationPage = async ({ params }: PageProps) => {
  const { id } = await params;
  const session = await auth();
  const conversation = (await getConversationById({
    conversationId: id,
  })) as ConversationType;

  if (!session) {
    redirect(appRouter.login);
  }

  if (
    !conversation ||
    !conversation.participants.some((p) => p.id === session.user.id)
  ) {
    redirect(appRouter.home);
  }

  return <Conversation initialConversation={conversation} />;
};

export default CurrentConversationPage;
