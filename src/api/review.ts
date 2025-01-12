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
    return res;
  } catch (error) {
    if (error instanceof Error) {
      window.alert(error.message);
    }
  }
};

export const deleteGameReview = async (reviewId: number | undefined, game_pk: number | undefined) => {
  try {
    const res = await sparta_games_auth.delete(`/games/api/review/${reviewId}/`, {
      data: { game_pk },
    });
    return res;
  } catch (error) {
    if (error instanceof Error) {
      window.alert(error.message);
    }
  }
};

export const postReviewLike = async (reviewId: number | undefined, action: "like" | "dislike") => {
  try {
    await sparta_games_auth.post(`/games/api/review/${reviewId}/like/`, {
      action: action,
    });
  } catch (error) {
    if (error instanceof Error) {
      window.alert(error.message);
    }
  }
};
