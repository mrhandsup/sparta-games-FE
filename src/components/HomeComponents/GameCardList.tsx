import { useEffect, useState } from "react";

import { IoIosArrowForward } from "react-icons/io";

import GameCard from "./GameCard";
import { getGameList } from "../../api/game";

export type GameData = {
  pk: number;
  thumbnail: string;
  title: string;
};

const GameCardList = ({ text }: { text: string }) => {
  const [data, setData] = useState<GameData[]>([]);

  useEffect(() => {
    const gameList = async () => {
      const res = await getGameList();
      setData(res);
      return res;
    };
    gameList();
  }, []);

  return (
    <div className="flex flex-col justify-evenly items-center w-full h-[536px]">
      <p className="flex mx-auto w-[1180px] h-12 text-5xl font-bold">
        {text}
        <IoIosArrowForward />
      </p>
      <div className="flex justify-between w-[1180px] h-[408px]">
        {data.map((item, idx) => {
          if (idx < 4) {
            return <GameCard item={item} />;
          } else {
            false;
          }
        })}
        {/* <GameCard />
        <GameCard />
        <GameCard />
        <GameCard /> */}
      </div>
    </div>
  );
};

export default GameCardList;
