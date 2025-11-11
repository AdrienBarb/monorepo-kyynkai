import { MessageType } from '@/types/messages';
import { useEffect, useRef } from 'react';
import { useTypingIndicatorStore } from '@/stores/TypingIndicatorStore';

export const useChatScroll = (dep: MessageType[]) => {
  const ref = useRef<HTMLDivElement>(null);
  const { isAiTyping } = useTypingIndicatorStore();

  useEffect(() => {
    if (ref.current) {
      ref.current.scrollTop = ref.current.scrollHeight;
    }
  }, [dep, isAiTyping]);

  return ref;
};
