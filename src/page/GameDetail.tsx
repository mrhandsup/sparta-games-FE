import { Link, useSearchParams } from "react-router-dom";

import GamePlaySection from "../components/gameDetailComponents/GamePlaySection/GamePlaySection";
import Review from "../components/gameDetailComponents/ReviewSection/Review";

import CaretLeft from "../assets/CaretLeft";
import { useQuery } from "@tanstack/react-query";
import { getGameDetail } from "../api/game";
import { TGamePlayData } from "../types";
import loading from "../assets/common/loading.gif";

const GameDetail = () => {
  const [searchParams] = useSearchParams();
  const gameDetailId = Number(searchParams.get("id"));

  const { data: gamePlayData, isLoading } = useQuery<TGamePlayData>({
    queryKey: ["gameList"],
    queryFn: () => getGameDetail(gameDetailId),
  });

  const gameCategory = gamePlayData?.category[0].name;

  return (
    <>
      {isLoading ? (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <img src={loading} className="w-[300px] h-[300px]" alt="로딩 중" />
        </div>
      ) : (
        <main className="mx-[130px]">
          <div className="inline-block mt-10 font-DungGeunMo text-[24px] text-gray-300">
            <Link to={"/category?category=Action"} className="flex gap-3">
              <CaretLeft />
              <p>{gameCategory}</p>
            </Link>
          </div>
          <GamePlaySection gamePlayData={gamePlayData} />
          <Review gamePk={gameDetailId} />
        </main>
      )}
    </>
  );
};

export default GameDetail;
