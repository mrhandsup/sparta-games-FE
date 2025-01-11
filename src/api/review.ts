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
      data: { game_pk }, // 요청 본문에 game_pk를 전달
    });
    return res;
  } catch (error) {
    window.alert("에러가 발생했습니다.");
    console.log(error);
  }
};
