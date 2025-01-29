import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { getUserRecentGameList, getUserLikedGameList } from "../../api/user";
import { TListResponse } from "../../types";
import log from "../../assets/Log.svg";
import SpartaPagination from "../../spartaDesignSystem/SpartaPagination";
import { Link } from "react-router-dom";
import GameCard from "../HomeComponents/GameCard";

type Props = {
  user_name: string;
  user_pk: number;
  recent: boolean;
};

const MypageLogModal = ({ user_name, user_pk, recent }: Props) => {
  const [page, setPage] = useState<number>(1);
  const myRecentGameData = useQuery<TListResponse>({
    queryKey: ["myRecentGameList", user_pk, page],
    queryFn: () => getUserRecentGameList(user_pk, page),
  });

  const myLikedData = useQuery<TListResponse>({
    queryKey: ["myLikesList", user_pk, page],
    queryFn: () => getUserLikedGameList(user_pk, page),
  });

  const recentGameData = myRecentGameData.data && myRecentGameData.data?.results;
  const recentGameCount = myRecentGameData.data && myRecentGameData.data?.count;

  const likedData = myLikedData.data && myLikedData.data?.results;
  const likedCount = myLikedData.data && myLikedData.data?.count;

  const data = recent ? recentGameData : likedData;

  return (
    <div className="flex flex-col gap-6 min-w-[1000px] overflow-hidden">
      <div className="flex items-center gap-4 justify-start ">
        <img src={log} />
        <p className="font-DungGeunMo text-heading-32 text-white">
          [{user_name}]의 {recent ? "Playlist" : "Bookmark"}
        </p>
      </div>
      <div className="flex gap-3">
        {data?.map((item, idx) => (
          <div key={idx} className="cursor-pointer">
            <Link to={`/game-detail?id=${item.pk}`}>
              <GameCard item={item} />
            </Link>
          </div>
        ))}
      </div>
      <SpartaPagination
        dataTotalCount={recent ? recentGameCount : likedCount}
        countPerPage={4}
        onChangePage={(e, page) => setPage(page)}
      />
    </div>
  );
};

export default MypageLogModal;
