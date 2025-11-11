import { create } from 'zustand';

interface ErrorStore {
  isError: boolean;
  setIsError: (isError: boolean) => void;
  statusCode: number;
  setStatusCode: (statusCode: number) => void;
  errorMessage: string;
  setErrorMessage: (errorMessage: string) => void;
  clearError: () => void;
}

export const useErrorStore = create<ErrorStore>((set) => ({
  isError: false,
  setIsError: (isError) => set({ isError }),
  statusCode: 0,
  setStatusCode: (statusCode) => set({ statusCode }),
  errorMessage: '',
  setErrorMessage: (errorMessage) => set({ errorMessage }),
  clearError: () => set({ isError: false, statusCode: 0, errorMessage: '' }),
}));
