import { sparta_games } from "./axios";

export const getUserData = async (userId: number) => {
  try {
    const res = await sparta_games.get(`/user/api/${userId}/`);
    return res.data;
  } catch (error) {
    console.error(error);
  }
};
