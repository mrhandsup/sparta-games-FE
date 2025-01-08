import { useRef } from "react";

import expand from "../../../assets/gameDetail/expand.svg";
import share from "../../../assets/gameDetail/linkshare.svg";
import bookmark from "../../../assets/gameDetail/bookmark.svg";
import randomgame from "../../../assets/gameDetail/randomgame.svg";
import { sparta_games_auth } from "../../../api/axios";
import { useMutation } from "@tanstack/react-query";
import { postBookMark } from "../../../api/game";

type Props = {
  gamePk?: number;
  title?: string;
  makerNmae?: string;
  gamePath?: string;
};

const GamePlay = ({ gamePk, title, makerNmae, gamePath }: Props) => {
  const gameUrl = `${import.meta.env.VITE_PROXY_HOST}${gamePath}/index.html`;
  const fullScreenRef = useRef<HTMLDivElement>(null);

  const handleFullscreen = () => {
    fullScreenRef.current?.requestFullscreen();
  };

  const bookMarkMutation = useMutation({
    mutationFn: (gamePk: number | undefined) => postBookMark(gamePk),
    onSuccess: () => {
      console.log("즐겨찾기 완료했습니다.");
    },
    onError: () => {
      console.log("즐겨찾기에 실패했습니다. 잠시후에 다시 시도해주세요.");
    },
  });

  const handleBookMark = () => {
    bookMarkMutation.mutate(gamePk);
  };

  return (
    <div className="w-[880px]">
      <div className="flex flex-col gap-2 font-DungGeunMo text-[32px] text-white">
        <p>[{title}]</p>
        <div className="flex justify-between">
          <p className="text-gray-100 text-[28px]">[{makerNmae}]</p>
          <div className="flex gap-6">
            <img src={bookmark} alt="즐겨찾기" onClick={handleBookMark} className="cursor-pointer" />
            <img src={share} alt="링크 공유" className="cursor-pointer" />
            <img src={randomgame} alt="랜덤 게임 추천" className="cursor-pointer" />
            <img src={expand} onClick={handleFullscreen} alt="전체화면" className="cursor-pointer" />
          </div>
        </div>
      </div>
      <div className="mt-5 w-full h-[560px] bg-gray-400 rounded-xl" ref={fullScreenRef}>
        <iframe src={gameUrl} width="100%" height="100%" className="rounded-xl" />
      </div>
    </div>
  );
};

export default GamePlay;
