import { useEffect, useState } from "react";

import { AiFillCaretRight } from "react-icons/ai";

import GameCard from "./GameCard";
import { getGameList } from "../../api/game";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

export type GameData = {
  pk: number;
  thumbnail: string;
  title: string;
  star: number;
  maker_name: string;
};

const GameCardList = ({ children }: { children?: React.ReactNode }) => {
  // const [data, setData] = useState<GameData[]>([]);

  // useEffect(() => {
  //   const gameList = async () => {
  //     const res = await getGameList();
  //     setData(res);
  //     return res;
  //   };
  //   gameList();
  // }, []);

  const { data } = useQuery<GameData[]>({
    queryKey: ["gameList"],
    queryFn: getGameList,
  });

  console.log(data);

  return (
    <div className="flex flex-col justify-evenly items-center w-full h-[536px] bg-gray-700">
      {children && (
        <p className="flex justify-between items-center mx-auto w-[1180px] h-12 text-5xl font-bold">
          {children}
          <AiFillCaretRight className="w-8 h-8 text-white" />
        </p>
      )}

      <div className="flex justify-between w-[1180px] h-[408px]">
        {data && data.length ? (
          data.map((item, idx) => {
            if (idx < 4) {
              return (
                <Link to={`/game-detail?id=${item.pk}`}>
                  <GameCard item={item} />
                </Link>
              );
            } else {
              false;
            }
          })
        ) : (
          <>
            <Link to={"/game-detail"}>
              <GameCard />
            </Link>
            <Link to={"/game-detail"}>
              <GameCard />
            </Link>
            <Link to={"/game-detail"}>
              <GameCard />
            </Link>
            <Link to={"/game-detail"}>
              <GameCard />
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default GameCardList;
