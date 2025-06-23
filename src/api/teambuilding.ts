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
export const getTeamBuild = async (userId?: number, params?: URLSearchParams) => {
  try {
    const client = userId ? sparta_games_auth : sparta_games;

    const res = await client.get(`/teams/api/teambuild/?${params?.toString()}`);

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

/**
 * 팀빌딩 모집 수정
 */
export const putTeamBuild = async (postId: number | undefined, formData: FormData) => {
  try {
    const res = await sparta_games_auth.put(`/teams/api/teambuild/${postId}/`, formData, {
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
