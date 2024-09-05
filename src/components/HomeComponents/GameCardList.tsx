import { useEffect, useState } from "react";

import { AiFillCaretRight } from "react-icons/ai";

import GameCard from "./GameCard";
import { getGameList } from "../../api/game";

export type GameData = {
  pk: number;
  thumbnail: string;
  title: string;
};

const GameCardList = ({ children }: { children: React.ReactNode }) => {
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
    <div className="flex flex-col justify-evenly items-center w-full h-[536px] bg-gray-700">
      <p className="flex justify-between items-center mx-auto w-[1180px] h-12 text-5xl font-bold">
        {children}
        <AiFillCaretRight className="w-8 h-8 text-white" />
      </p>
      <div className="flex justify-between w-[1180px] h-[408px]">
        {data && data.length ? (
          data.map((item, idx) => {
            if (idx < 4) {
              return <GameCard item={item} />;
            } else {
              false;
            }
          })
        ) : (
          <>
            <GameCard />
            <GameCard />
            <GameCard />
            <GameCard />
          </>
        )}
      </div>
    </div>
  );
};

export default GameCardList;
