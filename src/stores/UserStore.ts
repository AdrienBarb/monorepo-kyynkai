import { LoggedUserType } from '@/types/users';
import { create } from 'zustand';

interface UserState {
  user: LoggedUserType | null;
  setUser: (user: LoggedUserType) => void;
  clearUser: () => void;
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  clearUser: () => set({ user: null }),
}));
