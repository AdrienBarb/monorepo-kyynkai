import { create } from 'zustand';

interface TypingIndicatorState {
  isAiTyping: boolean;
  setIsAiTyping: (isTyping: boolean) => void;
}

export const useTypingIndicatorStore = create<TypingIndicatorState>((set) => ({
  isAiTyping: false,
  setIsAiTyping: (isTyping) => set({ isAiTyping: isTyping }),
}));
