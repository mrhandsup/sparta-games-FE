//axios 예시 이 파일은 작업을 시작할때 지워도 됩니다.

import axios from "axios";

// v1 코드 보고 만든 코드라 확실하지 않습니다!
// accessToken갱신 함수
export const retrieveAccessToken = async () => {
  const refreshToken = sessionStorage.getItem("refreshToken");

  try {
    const response = await sparta_games.post("/accounts/api/refresh/", {
      refresh: refreshToken,
    });
    sessionStorage.setItem("accessToken", response.data.access);
    sessionStorage.setItem("refreshToken", response.data.refresh);
    return {
      accessToken: response.data.access,
      refreshToken: response.data.refresh,
    };
  } catch (error) {
    sessionStorage.removeItem("refreshToken");
    sessionStorage.removeItem("accessToken");
    return null;
  }
};

// 토큰이 필요없는 요청
export const sparta_games = axios.create({
  baseURL: import.meta.env.VITE_PROXY_HOST,
  headers: { "Content-Type": "application/json" },
});

// 토큰이 필요한 요청
export const sparta_games_auth = axios.create({
  baseURL: import.meta.env.VITE_PROXY_HOST,
  headers: { "Content-Type": "application/json" },
});

sparta_games_auth.interceptors.request.use(
  (config) => {
    const accessToken = sessionStorage.getItem("accessToken");
    config.headers.Authorization = `Bearer ${accessToken}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

sparta_games_auth.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const token = await retrieveAccessToken();

      if (!token) {
        return Promise.reject(error);
      }

      originalRequest.headers.Authorization = `Bearer ${token.accessToken}`;
      return sparta_games(originalRequest);
    }
    return Promise.reject(error);
  },
);
