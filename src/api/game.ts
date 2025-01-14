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
    throw error;
  }
};

/**
 * 게임 리스트 조회(인증)
 */
export const getGameListAuth = async () => {
  try {
    const res = await sparta_games_auth.get("/games/api/list/");
    return res.data;
  } catch (error) {
    console.error(error);
    throw error;
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
export const getGameDetail = async (id: number) => {
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

/**
 * 게임 전체 카테고리 조회
 */
export const getGameCategory = async () => {
  try {
    const res = await sparta_games.get("/games/api/categories/");
    return res.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

/**
 * 게임 검색
 */
export const searchGame = async (keyword: string) => {
  try {
    const res = await sparta_games.get(`/games/api/list/search/?game-q=${keyword}&maker-q=${keyword}`);
    return res.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

/**
 * 게임 즐겨찾기
 */
export const postBookMark = async (gamePk: number | undefined) => {
  try {
    const res = await sparta_games_auth.post(`/games/api/list/${gamePk}/like/`);
    console.log(res);
    return res.data.message;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
