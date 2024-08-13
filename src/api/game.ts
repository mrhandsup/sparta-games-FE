import { sparta_games } from "./axios";

export const getGameList = async () => {
  try {
    const res = await sparta_games.get("/games/api/list/");
    console.log(res);
    return res.data;
  } catch (error) {
    console.error(error);
  }
};
