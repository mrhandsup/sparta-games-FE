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
  console.log("id", id);
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
    const response = await sparta_games_auth.post(
      `/directs/api/list/${id}/dzip/`,
      {}, // POST body는 비어있음
      {
        responseType: "blob", // 바이너리 데이터로 받기 위해 필요
      },
    );

    // Content-Disposition 헤더에서 파일명 추출
    const contentDisposition = response.headers["content-disposition"];
    const filename = contentDisposition
      ? decodeURIComponent(contentDisposition.split("filename=")[1].replace(/"/g, ""))
      : "download.zip";

    // Blob 객체 생성 및 다운로드 URL 생성
    const blob = new Blob([response.data], { type: "application/zip" });
    const url = window.URL.createObjectURL(blob);

    // 다운로드 링크 생성 및 클릭
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();

    // cleanup
    window.URL.revokeObjectURL(url);
    document.body.removeChild(link);

    return true;
  } catch (error) {
    console.error("ZIP 다운로드 실패:", error);
    throw error;
  }
};
