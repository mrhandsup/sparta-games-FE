//axios 예시 이 파일은 작업을 시작할때 지워도 됩니다.

import axios from "axios";
import { userStore } from "../share/store/userStore";

// async/await 사용을 원한다면, 함수 외부에 `async` 키워드를 추가하세요.
export async function getUser() {
  try {
    const response = await axios.get("/user?ID=12345");
    console.log(response);
  } catch (error) {
    console.error(error);
  }
}

// v1 코드 보고 만든 코드라 확실하지 않습니다!
// accessToken갱신 함수
const retrieveAccessToken = async () => {
  const refreshToken = sessionStorage.getItem("refreshToken");

  try {
    const response = await sparta_games.post("/accounts/api/refresh/", {
      refresh: refreshToken,
    });
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
    const { setUser } = userStore();

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const token = await retrieveAccessToken();
      setUser(token?.accessToken);
      originalRequest.headers.Authorization = `Bearer ${token?.accessToken}`;
      return sparta_games(originalRequest);
    }
    return Promise.reject(error);
  },
);
