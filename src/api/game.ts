import { userStore } from "../share/store/userStore";
import { sparta_games, sparta_games_auth } from "./axios";

export const getGameList = async () => {
  try {
    const res = await sparta_games.get("/games/api/list/");
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

export const getGameDetail = async (id: string | null) => {
  try {
    const res = await sparta_games.get(`/games/api/list/${id}`);
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

export const getMyBookmarkList = async () => {
  const { userData } = userStore();
  try {
    const res = await sparta_games_auth.get(`/user/api/${userData?.user_pk}/likes/`);
    return res.data;
  } catch (error) {
    console.error(error);
  }
};
