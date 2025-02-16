import { create } from "zustand";
import { jwtDecode } from "jwt-decode";
import { getUserData } from "../../api/user";
import { TUser } from "../../types";

type Store = {
  userData?: TUser;
  setUser: (accessToken?: string) => Promise<TUser | undefined>;
  setUserData: (key: keyof TUser, value: any) => void;
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
      console.log(userData);
      set({ userData: userData });
      if (userData?.is_staff) {
        sessionStorage.setItem("isAdmin", "true");
      }
      return userData;
    } catch (error) {
      console.error("Error fetching user data:", error);
      set({ userData: undefined });
    }
  },
  setUserData: (key: keyof TUser, value: any) => {
    set((state) => {
      if (!state.userData) return state;
      return {
        userData: {
          ...state.userData,
          [key]: value,
        },
      };
    });
  },
  logout: () => {
    sessionStorage.removeItem("accessToken");
    sessionStorage.removeItem("refreshToken");
    sessionStorage.removeItem("isAdmin");
    set({ userData: undefined });
    window.location.href = "/";
  },
}));
