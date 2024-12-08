import { userStore } from "../share/store/userStore";
import { sparta_games, sparta_games_auth } from "./axios";

/**
 * 게임 리스트 조회(메인)
 */
export const getGameList = async () => {
  try {
    const res = await sparta_games.get("/games/api/list/");
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

/**
 * 게임 리스트 조회(카테고리)
 */
export const getGameListByCategory = async (category: string, page?: number, limit?: number) => {
  try {
    let url = `/games/api/list/search/?category-q=${category}`;

    // page와 limit이 있을 때만 URL에 추가
    if (page !== undefined) {
      url += `&page=${page}`;
    }
    if (limit !== undefined) {
      url += `&limit=${limit}`;
    }

    const res = await sparta_games.get(url);
    return res.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

/**
 * 게임 상세 조회
 */
export const getGameDetail = async (id: string | null) => {
  try {
    const res = await sparta_games.get(`/games/api/list/${id}`);
    return res.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

/**
 * 내 북마크 게임 리스트 조회
 */
export const getMyBookmarkList = async () => {
  const { userData } = userStore();
  try {
    const res = await sparta_games_auth.get(`/user/api/${userData?.user_pk}/likes/`);
    return res.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
