import { create } from "zustand";
import { jwtDecode } from "jwt-decode";
import { getUserData } from "../../api/user";
import { useQuery } from "@tanstack/react-query";

type Store = {
  userId?: number;
  setUser: (accessToken?: string) => void;
};

export const userStore = create<Store>()((set) => ({
  setUser: (accessToken?: string) => {
    if (!accessToken) {
      set({ userId: undefined });
      return;
    }
    if (accessToken) {
      const decoded_jwt = jwtDecode<{ user_id: number }>(accessToken);

      const { data } = useQuery({
        queryKey: ["gameList"],
        queryFn: () => getUserData(decoded_jwt.user_id),
      });

      //** 추가: data 타입에 따라 유저 정보 저장 부분 추가 */
      set({ userId: decoded_jwt.user_id });
    }
  },
}));
