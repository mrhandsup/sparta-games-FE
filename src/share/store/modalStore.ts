import { create } from "zustand";

type Store = {
  openLoginModal: boolean;
  openModal: () => void;
  closeModal: () => void;
};

const useLoginModalStore = create<Store>((set) => ({
  openLoginModal: false,
  openModal: () => set({ openLoginModal: true }),
  closeModal: () => set({ openLoginModal: false }),
}));

export default useLoginModalStore;
