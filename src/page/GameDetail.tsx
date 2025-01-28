import { Link, useSearchParams } from "react-router-dom";

import { useQuery } from "@tanstack/react-query";

import { userStore } from "../share/store/userStore";

import { getGameDetail } from "../api/game";

import GamePlaySection from "../components/gameDetailComponents/GamePlaySection/GamePlaySection";
import ReviewContents from "../components/gameDetailComponents/ReviewSection/ReviewContents";

import { TGamePlayData } from "../types";
import SpartaButton from "../spartaDesignSystem/SpartaButton";

import CaretLeft from "../assets/CaretLeft";
import loading from "../assets/common/loading.gif";

const GameDetail = () => {
  const [searchParams] = useSearchParams();
  const gameDetailId = Number(searchParams.get("id"));

  const { data: gamePlayData, isLoading } = useQuery<TGamePlayData>({
    queryKey: ["gameList"],
    queryFn: () => getGameDetail(gameDetailId),
  });

  const gameCategory = gamePlayData?.category[0].name;
  const { userData } = userStore();
  return (
    <>
      {isLoading ? (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <img src={loading} className="w-[300px] h-[300px]" alt="로딩 중" />
        </div>
      ) : (
        <main className="mx-[130px]">
          <div className="flex justify-between mt-10 font-DungGeunMo text-[24px] text-gray-300">
            <Link to={"/category?category=Action"} className="flex gap-3">
              <CaretLeft />
              <p>{gameCategory}</p>
            </Link>

            {userData?.is_maker && (
              <>
                <div className="flex gap-2">
                  <SpartaButton content={"수정하기"} colorType={"alert"} width={"w-[134px]"} size={"medium"} />
                  <SpartaButton content={"삭제하기"} colorType={"error"} width={"w-[134px]"} size={"medium"} />
                </div>
              </>
            )}
          </div>
          <GamePlaySection gamePlayData={gamePlayData} />
          <ReviewContents gamePk={gameDetailId} />
        </main>
      )}
    </>
  );
};

export default GameDetail;
