//zustand 예시 이 파일은 작업을 시작할 때 지워도 됩니다.

import { create } from "zustand";

type Store = {
  count: number;
  inc: () => void;
};

const useStore = create<Store>()((set) => ({
  count: 1,
  inc: () => set((state) => ({ count: state.count + 1 })),
}));
