import { create } from "zustand";
import { jwtDecode } from "jwt-decode";

type Store = {
  accessToken?: string;
  refreshToken?: string;
  userId?: number;
  setToken: (accessToken?: string, refreshToken?: string, userId?: number) => void;
};

export const userStore = create<Store>()((set) => ({
  setToken: (accessToken?: string, refreshToken?: string) => {
    if (!refreshToken) {
      set({ accessToken: undefined, refreshToken: undefined, userId: undefined });
      return;
    }
    if (accessToken) {
      const decoded_jwt = jwtDecode<{ user_id: number }>(accessToken);
      set({ accessToken, refreshToken, userId: decoded_jwt.user_id });
    }
  },
}));
