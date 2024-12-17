import { Link, useSearchParams } from "react-router-dom";

import GamePlaySection from "../components/gameDetailComponents/GamePlaySection/GamePlaySection";
import Review from "../components/gameDetailComponents/ReviewSection/Review";

import useGameDetail from "../hook/gameDetailHook/useGameDetail";

import CaretLeft from "../assets/CaretLeft";
import { useQuery } from "@tanstack/react-query";
import { getGameDetail } from "../api/game";
import { TGamePlayData } from "../types";

const GameDetail = () => {
  const { more, onClickMoreToggleHandler } = useGameDetail();

  const [searchParams] = useSearchParams();
  const gameDetailId = Number(searchParams.get("id"));

  const { data: gamePlayData } = useQuery<TGamePlayData>({
    queryKey: ["gameList"],
    queryFn: () => getGameDetail(gameDetailId),
  });

  return (
    <main className="mx-[130px]">
      {/* 데이터를 가져왔을 때 게임에 맞는 카테고리로 변경 */}
      <Link to={"/category?category=Action"}>
        <div className="flex gap-3 mt-10 font-DungGeunMo text-[24px] text-gray-300">
          <CaretLeft />
          <p>Action</p>
        </div>
      </Link>
      <GamePlaySection gamePlayData={gamePlayData} more={more} onClickMoreToggleHandler={onClickMoreToggleHandler} />
      <Review gameDetailId={gameDetailId} />
    </main>
  );
};

export default GameDetail;
