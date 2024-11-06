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
      console.log("accessToken", accessToken);
      const decoded_jwt = jwtDecode<{ user_id: number }>(accessToken);
      console.log("decoded_jwt", decoded_jwt);
      const userData = await getUserData(decoded_jwt.user_id);
      console.log("userData", userData);
      set({ userData: userData });
    } catch (error) {
      console.error("Error fetching user data:", error);
      set({ userData: undefined });
    }
  },
}));
