import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { getUserGameList } from "../../../../api/user";

import MyGameCard from "../../../mypageComponents/MyGameCard";
import SpartaPagination from "../../../../spartaDesignSystem/SpartaPagination";

import log from "../../../../assets/Log.svg";
import { TTeamBuildProfileListItem } from "../../../../types";

type Props = {
  postDetail: TTeamBuildProfileListItem | undefined;
};
export default function ProfileUserGame({ postDetail }: Props) {
  const [page, setPage] = useState<number>(1);

  const { data } = useQuery({
    queryKey: ["profileUserGameList", postDetail?.author_data.id, page],
    queryFn: () => getUserGameList(Number(postDetail?.author_data.id), page),
  });

  const gameData = (data && data?.data) || [];
  const totalCount = (data && data.pagination.count) || 0;

  return (
    <div className="bg-gray-800 rounded-xl px-7 py-5 flex flex-col gap-4 justify-start items-center">
      <div className="flex  items-center gap-4 w-full mb-3 h-12">
        <img src={log} />
        <p className="font-DungGeunMo text-heading-32 text-white font-[400]">
          {postDetail?.author_data.nickname}님의 개발중인 게임
        </p>
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
}
