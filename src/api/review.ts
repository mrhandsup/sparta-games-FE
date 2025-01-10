import { TReviewInputForm } from "../types";
import { sparta_games_auth } from "./axios";

export const postGameReviews = async (id: number, data: TReviewInputForm) => {
  try {
    const res = await sparta_games_auth.post(`/games/api/list/${id}/reviews/`, {
      content: data.content,
      star: data.star,
      difficulty: data.difficulty,
    });
    console.log("Response:", res);
    return res;
  } catch (error) {
    console.error("Error occurred while posting review:", error);
  }
};
