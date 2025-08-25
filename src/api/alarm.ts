/**
 * 알림 목록 불러오기
 */

import { sparta_games_auth } from "./axios";

export const getAlarm = async (url?: string) => {
  try {
    const res = await sparta_games_auth.get(url ? url : "/commons/api/alarm/");
    return res.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

/**
 * 알림 읽음 처리
 */

export const patchReadAlarm = async (id: number) => {
  try {
    const res = await sparta_games_auth.patch(`/commons/api/alarm/${id}/read/`);
    return res.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
