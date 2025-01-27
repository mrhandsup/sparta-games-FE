import { create } from "zustand";

type Store = {
  playTimePk: number | undefined;
  setPlayTimePk: (playTimePk: number | undefined) => void;
};

const usePlayTimeStore = create<Store>((set) => ({
  playTimePk: 0,
  setPlayTimePk: (playTimePk) => set({ playTimePk }),
}));

export default usePlayTimeStore;
