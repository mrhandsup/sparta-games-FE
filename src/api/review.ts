import { sparta_games_auth } from "./axios";

export const postGameReviews = async (
  gamePk: number,
  star: number | null,
  content: string,
  difficulty: number | undefined,
) => {
  try {
    const res = await sparta_games_auth.post(`/games/api/list/${gamePk}/reviews/`, {
      star: star,
      content: content,
      difficulty: difficulty,
    });
    console.log("Response:", res);
    return res;
  } catch (error) {
    console.error("Error occurred while posting review:", error);
  }
};
