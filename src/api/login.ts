// import { sparta_games } from "./axios";
import axios from "axios";

export const getUserInfo = async (code: string) => {
  try {
    const response = await axios.get("/accounts/api/google/callback/", {
      withCredentials: true,
      headers: {
        AUTHORIZATION: code,
      },
    });

    console.log(response);
  } catch (error) {
    console.log(error);
  }
};
