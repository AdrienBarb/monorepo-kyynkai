import { MessageType } from '@/types/messages';
import { useEffect, useRef } from 'react';

export const useChatScroll = (dep: MessageType[]) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.scrollTop = ref.current.scrollHeight;
    }
  }, [dep]);

  return ref;
};
