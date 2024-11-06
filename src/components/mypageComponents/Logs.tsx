import React from "react";
import GameCardList, { GameData } from "../HomeComponents/GameCardList";
import { useQuery } from "@tanstack/react-query";
import { getGameList } from "../../api/game";
import log from "../../assets/Log.svg";
import { User } from "../../types";

type TLogsProps = {
  user: User;
};

const Logs = (props: TLogsProps) => {
  const { data } = useQuery<GameData[]>({
    queryKey: ["gameList"],
    queryFn: getGameList,
  });

  const LogsClassName = "bg-gray-800 rounded-xl px-7 py-5 flex flex-col gap-4 justify-start items-start w-full";

  return (
    <div className="flex flex-col gap-10">
      <GameCardList data={data} maxNum={3} containerClassName={LogsClassName} noNavigation={(data?.length ?? 0) < 4}>
        <div className="flex items-center gap-4 justify-start ">
          <img src={log} />
          <p className="font-DungGeunMo text-heading-32 text-white">[{props.user.nickname}]의 개발중인 게임</p>
        </div>
      </GameCardList>
      <GameCardList data={data} maxNum={3} containerClassName={LogsClassName} noNavigation={(data?.length ?? 0) < 4}>
        <div className="flex items-center gap-4 justify-start ">
          <img src={log} />
          <p className="font-DungGeunMo text-heading-32 text-white">[{props.user.nickname}]의 개발중인 게임</p>
        </div>
      </GameCardList>
      <GameCardList data={data} maxNum={3} containerClassName={LogsClassName} noNavigation={(data?.length ?? 0) < 4}>
        <div className="flex items-center gap-4 justify-start ">
          <img src={log} />
          <p className="font-DungGeunMo text-heading-32 text-white">[{props.user.nickname}]의 개발중인 게임</p>
        </div>
      </GameCardList>
      <GameCardList data={data} maxNum={3} containerClassName={LogsClassName} noNavigation={(data?.length ?? 0) < 4}>
        <div className="flex items-center gap-4 justify-start ">
          <img src={log} />
          <p className="font-DungGeunMo text-heading-32 text-white">[{props.user.nickname}]의 개발중인 게임</p>
        </div>
      </GameCardList>
    </div>
  );
};

export default Logs;
