import axios from "axios";
import { sparta_games, sparta_games_auth } from "./axios";

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
  userId?: number,
  status_chip?: string,
  roles?: string,
  purpose?: string,
  duration?: string,
  page?: number,
  limit?: number,
) => {
  try {
    const client = userId ? sparta_games_auth : sparta_games;
    const params = new URLSearchParams();

    if (status_chip) params.append("status_chip", status_chip);
    if (roles) params.append("roles", roles);
    if (purpose) params.append("purpose", purpose);
    if (duration) params.append("duration", duration);
    if (page !== undefined) params.append("page", String(page));
    if (limit !== undefined) params.append("limit", String(limit));

    const res = await client.get(`/teams/api/teambuild/?${params.toString()}`);

    return res?.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error;
    }
    throw error;
  }
};

/**
 * 팀빌딩 모집글 상세조회
 */
export const getTeamBuildDetail = async (postId: number) => {
  try {
    const res = await sparta_games.get(`/teams/api/teambuild/${postId}`);
    return res?.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error;
    }
    throw error;
  }
};

/**
 * 팀빌딩 모집 마감
 */
export const patchTeamBuild = async (postId: number | undefined) => {
  try {
    const res = await sparta_games_auth.patch(`/teams/api/teambuild/${postId}/`);
    return res?.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error;
    }
    throw error;
  }
};

/**
 * 팀빌딩 모집 삭제
 */
export const deleteTeamBuild = async (postId: number | undefined) => {
  try {
    const res = await sparta_games_auth.delete(`/teams/api/teambuild/${postId}/`);
    return res?.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error;
    }
    throw error;
  }
};
