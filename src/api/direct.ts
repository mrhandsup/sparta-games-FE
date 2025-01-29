import { sparta_games, sparta_games_auth } from "./axios";

/**
 * 등록 게임 목록 호출
 */
export const getRegisterGameList = async (props: string) => {
  try {
    const res = await sparta_games_auth.get(`/directs/api/admin/list/?${props}`);
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
    const res = await sparta_games_auth.post(`/directs/api/list/${id}/register/`);
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
    const res = await sparta_games_auth.post(`/directs/api/list/${id}/dzip/`, {
      responseType: "blob",
    });

    // Blob 객체 생성
    const blob = new Blob([res.data], { type: "application/zip" });

    // Blob URL 생성
    const url = window.URL.createObjectURL(blob);

    // 임시 링크 생성 및 클릭 이벤트 트리거
    const link = document.createElement("a");
    link.href = url;
    // Content-Disposition 헤더에서 파일명을 가져오거나, 기본 파일명 사용
    link.download = "download.zip"; // 또는 서버에서 전달받은 파일명 사용
    document.body.appendChild(link);
    link.click();

    // cleanup
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);

    return res.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
