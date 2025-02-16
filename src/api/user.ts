import { TUser, TUserInformationInputForm } from "../types";
import { sparta_games, sparta_games_auth } from "./axios";

/**
 * 유저 정보 조회
 */
export const getUserData = async (userId: number) => {
  try {
    const res = await sparta_games.get(`/users/api/${userId}/`);
    return res.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

/**
 * 유저 정보 수정
 */
export const updateUserData = async (
  userId: number,
  data: Partial<TUserInformationInputForm> | FormData,
): Promise<TUser> => {
  try {
    const res = await sparta_games_auth.put(`/users/api/${userId}/`, data, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

/**
 * 유저 정보 삭제
 */
export const deleteUser = async (userId: number) => {
  try {
    const res = await sparta_games_auth.delete(`/users/api/${userId}/`);
    return res.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

/**
 * 유저가 만든 게임 리스트 조회
 */
export const getUserGameList = async (userId: number, page?: number) => {
  try {
    const res = await sparta_games.get(`/users/api/${userId}/games/?limit=3&page=${page}`);
    return res.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

/**
 * 유저가 만든 게임 리스트 조회(본인 조회)
 */
export const getUserGameMadeList = async (userId: number, page?: number) => {
  try {
    const res = await sparta_games_auth.get(`/users/api/${userId}/games/?limit=3&page=${page}`);
    return res.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

/**
 * 유저가 좋아요한 게임 리스트 조회
 */
export const getUserLikedGameList = async (userId: number, page?: number) => {
  try {
    const res = await sparta_games_auth.get(`/users/api/${userId}/likes/?limit=4&page=${page ? page : 1}`);
    return res.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

/**
 * 유저가 최근 플레이한 게임 리스트 조회
 */
export const getUserRecentGameList = async (userId: number, page?: number) => {
  try {
    const res = await sparta_games_auth.get(`/users/api/${userId}/recent/?limit=4&page=${page ? page : 1}`);
    return res.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

/**
 * 패스워드 수정
 */
export const updatePassword = async (
  userId: number,
  password: string,
  new_password: string,
  new_password_check: string,
) => {
  try {
    const res = await sparta_games_auth.put(`/users/api/${userId}/password/`, {
      password,
      new_password,
      new_password_check,
    });
    return res.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

/**
 * 유저 게임팩 조회
 */
export const getUserGamePackList = async (userId: number) => {
  try {
    const res = await sparta_games_auth.get(`/users/api/${userId}/gamepacks/`);
    return res.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

/**
 * 회원 탈퇴
 */
export const leaveUser = async (userId: number) => {
  try {
    const res = await sparta_games_auth.delete(`/users/api/${userId}/`);
    return res.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
