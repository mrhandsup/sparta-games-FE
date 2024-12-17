import { useRef } from "react";

import expand from "../../../assets/gameDetail/interface-essential-signin-expand.svg";
import share from "../../../assets/gameDetail/interface-essential-share-1.svg";
import bookmark from "../../../assets/gameDetail/content-files-close-book-bookmark.svg";

type Props = {
  title?: string;
  makerNmae?: string;
  gamePath?: string;
};

const GamePlay = ({ title, makerNmae, gamePath }: Props) => {
  const gameUrl = `${import.meta.env.VITE_PROXY_HOST}${gamePath}/index.html`;
  const fullScreenRef = useRef<HTMLDivElement>(null);

  const handleFullscreen = () => {
    fullScreenRef.current?.requestFullscreen();
  };

  return (
    <div className="w-[880px]">
      <div className="flex flex-col gap-2 font-DungGeunMo text-[32px] text-white">
        <p>[{title}]</p>
        <div className="flex justify-between">
          <p className="text-gray-100 text-[28px]">[{makerNmae}]</p>
          <div className="flex gap-6">
            <img src={expand} onClick={handleFullscreen} alt="" className="cursor-pointer" />
            <img src={share} alt="" className="cursor-pointer" />
            <img src={bookmark} alt="" className="cursor-pointer" />
          </div>
        </div>
      </div>
      <div className="mt-5 w-full h-[560px] bg-gray-400 rounded-t-lg" ref={fullScreenRef}>
        <iframe src={gameUrl} width="100%" height="100%" />
      </div>
    </div>
  );
};

export default GamePlay;
