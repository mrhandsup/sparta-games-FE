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

/**
 * 팀빌딩 프로필 생성
 */
export const postTeamBuildProfile = async (formData: FormData) => {
  try {
    const res = await sparta_games_auth.post("/teams/api/teambuild/profile/", formData, {
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
 * 팀빌딩 프로필 전체 목록 조회
 */
export const getTeamBuildProfile = async (params?: URLSearchParams) => {
  try {
    const res = await sparta_games.get(`/teams/api/teambuild/profile/?${params?.toString()}`);

    return res?.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error;
    }
    throw error;
  }
};

/**
 * 팀빌딩 프로필 상세 조회
 */
export const getTeamBuildProfileByUserId = async (userId: number | undefined) => {
  try {
    const res = await sparta_games.get(`/teams/api/teambuild/profile/${userId}/`);

    return res?.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error;
    }
    throw error;
  }
};

/**
 * 팀빌딩 프로필 삭제
 */
export const deleteTeamBuildProfile = async (userId: number | undefined) => {
  try {
    const res = await sparta_games_auth.delete(`/teams/api/teambuild/profile/${userId}/`);
    return res?.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error;
    }
    throw error;
  }
};

/**
 * 팀빌딩 프로필 수정
 */
export const putTeamBuildProfile = async (userId: number | undefined, formData: FormData) => {
  try {
    const res = await sparta_games_auth.put(`/teams/api/teambuild/profile/${userId}/`, formData, {
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
 * 팀빌딩 댓글 생성
 */
export const postTeamBuildComments = async (postId: number | undefined, content: string) => {
  try {
    const res = await sparta_games_auth.post(`/teams/api/teambuild/${postId}/comments/`, {
      content,
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
 * 팀빌딩 댓글 조회
 */
export const getTeamBuildComments = async (postId: number | undefined, page: number, sortTab: "new" | "old") => {
  try {
    const res = await sparta_games.get(`/teams/api/teambuild/${postId}/comments/?page=${page}&order=${sortTab}`);

    return res?.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error;
    }
    throw error;
  }
};

/**
 * 팀빌딩 댓글 수정
 */

export const putTeamBuildComments = async (commentId: number | null | undefined, content: string) => {
  try {
    const res = await sparta_games_auth.put(`/teams/api/teambuild/comments/${commentId}/`, {
      content,
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
 * 팀빌딩 댓글 삭제
 */
export const deleteTeamBuildComments = async (comment_id: number | undefined) => {
  try {
    const res = await sparta_games_auth.delete(`/teams/api/teambuild/comments/${comment_id}/`);
    return res?.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error;
    }
    throw error;
  }
};

/**
 * 팀빌딩 모집글 검색
 */
export const getTeamBuildSearch = async (keyword: string) => {
  try {
    const res = await sparta_games.get(`/teams/api/teambuild/search?keyword=${keyword}`);

    return res?.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error;
    }
    throw error;
  }
};

/**
 * 팀빌딩 프로필 검색
 */
export const getTeamBuildProfileSearch = async (keyword: string) => {
  try {
    const res = await sparta_games.get(`/teams/api/teambuild/profile/search?keyword=${keyword}`);

    return res?.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error;
    }
    throw error;
  }
};

/**
 * 팀빌딩 프로젝트 목적 목록 불러오기
 */
export const getTeamBuildPurposeList = async () => {
  try {
    const res = await sparta_games.get("/teams/api/purpose-list/");
    return res?.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error;
    }
    throw error;
  }
};
/**
 * 팀빌딩 프로젝트 기간 목록 불러오기
 */
export const getTeamBuildDurationList = async () => {
  try {
    const res = await sparta_games.get("/teams/api/duration-list/");
    return res?.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error;
    }
    throw error;
  }
};
/**
 * 팀빌딩 프로젝트 진행 방식 목록 불러오기
 */
export const getTeamBuildMeetingTypeList = async () => {
  try {
    const res = await sparta_games.get("/teams/api/meeting-type-list/");
    return res?.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error;
    }
    throw error;
  }
};

/**
 * 팀빌딩 현재 상태 목록 불러오기
 */
export const getTeamBuildCareerList = async () => {
  try {
    const res = await sparta_games.get("/teams/api/career-list/");
    return res?.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error;
    }
    throw error;
  }
};

/**
 * 팀빌딩 포지션 목록 불러오기
 */
export const getTeamBuildRoleList = async () => {
  try {
    const res = await sparta_games.get("/teams/api/role-list/");
    return res?.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error;
    }
    throw error;
  }
};
