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

type Props = {
  data: GameData[] | undefined;
  maxNum?: number;
  children?: React.ReactNode;
  simple?: boolean;
};

const GameCardList = ({ data, children, maxNum = 4, simple }: Props) => {
  const slicingData = data?.slice(0, maxNum);

  return (
    <div className="flex flex-col justify-evenly items-center w-full h-[536px] bg-gray-700">
      {children && (
        <p className="flex justify-between items-center mx-auto w-[1180px] h-12 text-5xl font-bold">
          {children}
          <AiFillCaretRight className="w-8 h-8 text-white" />
        </p>
      )}

      <div className="flex justify-evenly w-[1180px] h-[408px]">
        {slicingData && slicingData.length ? (
          slicingData.map((item, idx) => (
            <Link to={`/game-detail?id=${item.pk}`}>
              <GameCard item={item} simple={simple} />
            </Link>
          ))
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
