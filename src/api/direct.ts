import { sparta_games, sparta_games_auth } from "./axios";

/**
 * 등록 게임 목록 호출
 */
export const getRegisterGameList = async () => {
  try {
    const res = await sparta_games_auth.get("/directs/api/admin/list/");
    return res.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

/**
 * 등록 게임 상세 조회
 */
export const getRegisterGameDetail = async (id: number) => {
  try {
    const res = await sparta_games_auth.get(`/directs/api/admin/list/${id}`);
    return res.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

/**
 * 등록 게임 통계
 */
export const getRegisterGameStat = async () => {
  try {
    const res = await sparta_games_auth.get("/directs/api/admin/stats/");
    return res.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

/**
 * 등록 거부 로그 불러오기
 */
export const getRegisterGameRejectLog = async (id: number) => {
  try {
    const res = await sparta_games_auth.get(`/directs/api/denylog/${id}/`);
    return res.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

/**
 * 게임 등록 거부
 */
export const rejectRegisterGame = async (id: number, content: string) => {
  try {
    const res = await sparta_games_auth.post(`/directs/api/list/${id}/deny/`, { content });
    return res.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

/**
 * 게임 등록 승인
 */
export const approveRegisterGame = async (id: number) => {
  try {
    const res = await sparta_games_auth.post(`/directs/api/list/${id}/approve/`);
    return res.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

/**
 * ZIP 다운로드
 */
export const downloadZip = async (id: number) => {
  try {
    const res = await sparta_games_auth.get(`/directs/api/list/${id}/dzip/`, {
      responseType: "blob",
    });
    return res.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
