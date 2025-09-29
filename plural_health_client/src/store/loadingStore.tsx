import { create } from "zustand";

export interface LoadingStore {
  loading: boolean;
  loadingText: string;
  setLoading: (loadingText?: string) => void;
  endLoading: () => void;
}

export const useLoadingStore = create<LoadingStore>((set) => ({
  loading: false,
  loadingText: "Loading......",
  setLoading: (payload) => {
    set({ loading: true, loadingText: payload });
  },
  endLoading: () => set({ loading: false }),
}));
