import React from "react";
import GameCardList, { GameData } from "../HomeComponents/GameCardList";
import { useQuery } from "@tanstack/react-query";
import { getGameList } from "../../api/game";
import log from "../../assets/Log.svg";
import { User } from "../../types";
import { getUserGameMadeList, getUserLikedGameList } from "../../api/user";

type TLogsProps = {
  user: User;
};

type TListData = {
  item_list: any[];
};

const Logs = (props: TLogsProps) => {
  //* Hooks
  const myGameData = useQuery<TListData>({
    queryKey: ["myGameList", props.user.user_pk],
    queryFn: () => getUserGameMadeList(props.user.user_pk),
  });

  const myLikedData = useQuery<TListData>({
    queryKey: ["myLikesList", props.user.user_pk],
    queryFn: () => getUserLikedGameList(props.user.user_pk),
  });

  const gameData = myGameData.data && myGameData.data.item_list;

  const likedData = myLikedData.data && myLikedData.data.item_list;

  //* Styles
  const LogsClassName = "bg-gray-800 rounded-xl px-7 py-5 flex flex-col gap-4 justify-start items-start w-full";

  return (
    <div className="flex flex-col gap-10">
      {/* 만든 게임 */}
      <GameCardList
        data={gameData}
        maxNum={3}
        containerClassName={LogsClassName}
        noNavigation={(gameData?.length ?? 0) < 4}
      >
        <div className="flex items-center gap-4 justify-start ">
          <img src={log} />
          <p className="font-DungGeunMo text-heading-32 text-white">[{props.user.nickname}]의 개발중인 게임</p>
        </div>
      </GameCardList>
      {/* 즐겨찾는 게임 */}
      <GameCardList
        data={likedData}
        maxNum={3}
        containerClassName={LogsClassName}
        noNavigation={(likedData?.length ?? 0) < 4}
      >
        <div className="flex items-center gap-4 justify-start ">
          <img src={log} />
          <p className="font-DungGeunMo text-heading-32 text-white">[{props.user.nickname}]이 즐겨찾는 게임</p>
        </div>
      </GameCardList>
      {/* 플레이한 게임 */}
      {/* <GameCardList data={data} maxNum={3} containerClassName={LogsClassName} noNavigation={(data?.length ?? 0) < 4}>
        <div className="flex items-center gap-4 justify-start ">
          <img src={log} />
          <p className="font-DungGeunMo text-heading-32 text-white">[{props.user.nickname}]이 플레이한 게임</p>
        </div>
      </GameCardList> */}
      {/* 커뮤니티 활동 */}
      {/* <GameCardList data={data} maxNum={3} containerClassName={LogsClassName} noNavigation={(data?.length ?? 0) < 4}>
        <div className="flex items-center gap-4 justify-start ">
          <img src={log} />
          <p className="font-DungGeunMo text-heading-32 text-white">[{props.user.nickname}]의 최근 커뮤니티 활동</p>
        </div>
      </GameCardList> */}
    </div>
  );
};

export default Logs;
