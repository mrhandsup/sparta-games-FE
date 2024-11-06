import { create } from "zustand";
import { jwtDecode } from "jwt-decode";
import { getUserData } from "../../api/user";
import { useQuery } from "@tanstack/react-query";
import { User } from "../../types";

type Store = {
  userData?: User;
  setUser: (accessToken?: string) => void;
};

export const userStore = create<Store>()((set) => ({
  setUser: async (accessToken?: string) => {
    if (!accessToken) {
      set({ userData: undefined });
      return;
    }
    try {
      const decoded_jwt = jwtDecode<{ user_id: number }>(accessToken);
      const userData = await getUserData(decoded_jwt.user_id);
      set({ userData: userData.data });
    } catch (error) {
      console.error("Error fetching user data:", error);
      set({ userData: undefined });
    }
  },
}));
