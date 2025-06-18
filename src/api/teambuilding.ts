import axios from "axios";
import { sparta_games_auth } from "./axios";

/**
 * 팀빌딩 모집 등록
 */
export const postTeamBuild = async (formData: FormData) => {
  try {
    const res = await sparta_games_auth.post("/teams/api/teambuild/", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res?.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error;
    }
    throw error;
  }
};

/**
 * 팀빌딩 모집글 목록 조회
 */
export const getTeamBuild = async (
  status_chip?: string,
  roles?: string,
  purpose?: string,
  duration?: string,
  page?: number,
  limit?: number,
) => {
  try {
    const params = new URLSearchParams();

    if (status_chip) params.append("status_chip", status_chip);
    if (roles) params.append("roles", roles);
    if (purpose) params.append("purpose", purpose);
    if (duration) params.append("duration", duration);
    if (page !== undefined) params.append("page", String(page));
    if (limit !== undefined) params.append("limit", String(limit));

    const res = await sparta_games_auth.get(`/teams/api/teambuild/?${params.toString()}`);

    return res?.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error;
    }
    throw error;
  }
};

export const getGameMyReview = async (gamePk: number, page?: number, limit?: number) => {
  try {
    const res = await sparta_games_auth.get(`/games/api/list/${gamePk}/reviews/?page=${page}&limit=${limit}`);
    return res.data;
  } catch (error) {
    if (error instanceof Error) {
      window.alert(error.message);
    }
  }
};
