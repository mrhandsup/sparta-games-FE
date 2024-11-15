import { User } from "../types";
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
    return null;
  }
};

/**
 * 유저 정보 수정
 */
export const updateUserData = async (userId: number, data: Partial<User>) => {
  try {
    const res = await sparta_games_auth.put(`/users/api/${userId}/`, data);
    return res.data;
  } catch (error) {
    console.error(error);
    return null;
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
    return null;
  }
};

/**
 * 유저가 만든 게임 리스트 조회
 */
export const getUserGameMadeList = async (userId: number) => {
  try {
    const res = await sparta_games.get(`/users/api/${userId}/games/`);
    return res.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

/**
 * 유저가 좋아요한 게임 리스트 조회
 */
export const getUserLikedGameList = async (userId: number) => {
  try {
    const res = await sparta_games_auth.get(`/users/api/${userId}/likes/`);
    return res.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};
