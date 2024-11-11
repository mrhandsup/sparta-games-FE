import { Link, useSearchParams } from "react-router-dom";

import GamePlay, { GamePlayData } from "../components/gameDetailComponents/GamePlay";
import Review from "../components/gameDetailComponents/Review";

import useGameDetail from "../hook/gameDetailHook/useGameDetail";

import CaretLeft from "../assets/CaretLeft";
import { useQuery } from "@tanstack/react-query";
import { getGameDetail } from "../api/game";

const GameDetail = () => {
  const { more, onClickMoreToggleHandler } = useGameDetail();

  const [searchParams] = useSearchParams();
  const gameDetailId = searchParams.get("id");

  const { data } = useQuery<GamePlayData>({
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
      <GamePlay data={data} more={more} onClickMoreToggleHandler={onClickMoreToggleHandler} />
      <Review />
    </main>
  );
};

export default GameDetail;
