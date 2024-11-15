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
    console.log(error);
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
    console.log(error);
  }
};
