// import { sparta_games } from "./axios";

import { sparta_games } from "./axios";

export const getUserInfo = async (code: string) => {
  try {
    const response = await sparta_games.get("/accounts/api/google/callback/", {
      withCredentials: true,
      headers: {
        AUTHORIZATION: code,
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const login = async (email: string, password: string) => {
  try {
    const response = await sparta_games.post("/accounts/api/login/", {
      email,
      password,
    });

    return response;
  } catch (error) {
    throw error;
  }
};

export const googleLogin = async (code: string) => {
  try {
    const response = await sparta_games.get("/accounts/api/google/callback/", {
      withCredentials: true,
      headers: {
        AUTHORIZATION: code,
      },
    });

    return response;
  } catch (error) {
    throw error;
  }
};

export const kakaoLogin = async (code: string) => {
  try {
    const response = await sparta_games.get("/accounts/api/kakao/callback/", {
      headers: {
        AUTHORIZATION: code,
      },
    });

    return response;
  } catch (error) {
    throw error;
  }
};

export const naverLogin = async (code: string) => {
  try {
    const response = await sparta_games.get("/accounts/api/naver/callback/", {
      withCredentials: true,
      headers: {
        AUTHORIZATION: code,
      },
    });

    return response;
  } catch (error) {
    throw error;
  }
};

export const discordLogin = async (code: string) => {
  try {
    const response = await sparta_games.get("/accounts/api/discord/callback/", {
      withCredentials: true,
      headers: {
        AUTHORIZATION: code,
      },
    });

    return response;
  } catch (error) {
    throw error;
  }
};

export const signUp = async (data: any) => {
  try {
    const response = await sparta_games.post("/accounts/api/signup/", data);

    return response;
  } catch (error) {
    throw error;
  }
};
