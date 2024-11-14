import { User } from "../types";
import { sparta_games, sparta_games_auth } from "./axios";

export const getUserData = async (userId: number) => {
  try {
    const res = await sparta_games.get(`/users/api/${userId}/`);
    return res.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const updateUserData = async (userId: number, data: Partial<User>) => {
  try {
    const res = await sparta_games_auth.put(`/users/api/${userId}/`, data);
    return res.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};
