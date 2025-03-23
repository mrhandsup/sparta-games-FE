import { useQuery } from "@tanstack/react-query";
import { getUserGameList, getUserGameMadeList } from "../../api/user";
import { TListResponse, TUser } from "../../types";
import MyGameCard from "./MyGameCard";
import log from "../../assets/Log.svg";
import { useState } from "react";
import SpartaPagination from "../../spartaDesignSystem/SpartaPagination";
import { useParams } from "react-router-dom";

type TMyGameProps = {
  user: TUser;
  isMyPage: boolean;
};

const MyGame = (props: TMyGameProps) => {
  const [page, setPage] = useState<number>(1);
  const { id } = useParams();
  //* Hooks
  const myGameData = useQuery<TListResponse>({
    queryKey: ["myGameList", props.user.user_pk, page],
    queryFn: () => (props.isMyPage ? getUserGameMadeList(props.user.user_pk, page) : getUserGameList(Number(id), page)),
  });

  const gameData = (myGameData.data && myGameData.data.results) || [];
  const totalCount = (myGameData.data && myGameData.data.count) || 0;

  return (
    <div className="bg-gray-800 rounded-xl px-7 py-5 flex flex-col gap-4 justify-start items-center">
      <div className="flex  items-center gap-4 w-full mb-3 h-12">
        <img src={log} />
        <p className="font-DungGeunMo text-heading-32 text-white font-[400]">{props.user.nickname}의 개발중인 게임</p>
      </div>
      {/* 만든 게임 */}
      {gameData && gameData.length > 0 ? (
        gameData.map((game: any) => <MyGameCard item={game} />)
      ) : (
        <p className="text-white w-full text-center py-20 text-heading-20">개발중인 게임이 없습니다.</p>
      )}
      <SpartaPagination dataTotalCount={totalCount} countPerPage={3} onChangePage={(e, page) => setPage(page)} />
    </div>
  );
};

export default MyGame;
