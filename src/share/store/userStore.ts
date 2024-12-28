import { create } from "zustand";
import { jwtDecode } from "jwt-decode";
import { getUserData } from "../../api/user";
import { TUser } from "../../types";

type Store = {
  userData?: TUser;
  setUser: (accessToken?: string) => void;
  logout: () => void;
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
      set({ userData: userData });
      if (userData.is_staff) {
        sessionStorage.setItem("is_staff", "true");
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      set({ userData: undefined });
    }
  },
  logout: () => {
    sessionStorage.removeItem("accessToken");
    sessionStorage.removeItem("refreshToken");
    set({ userData: undefined });
  },
}));
