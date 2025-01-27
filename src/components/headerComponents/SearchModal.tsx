import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { searchGame } from "../../api/game";
import type { TGameData } from "../../types";
import GameCard from "../HomeComponents/GameCard";
import { useNavigate } from "react-router-dom";

type Props = {
  onClose: () => void;
};

const SearchModal = ({ onClose }: Props) => {
  const [keyword, setKeyWord] = useState<string>("");

  const { data } = useQuery<{
    results: {
      all_games: TGameData[];
    };
  }>({
    queryKey: ["searchGame", keyword],
    queryFn: () => searchGame(keyword),
  });

  const navigate = useNavigate();

  return (
    <div className="w-[1000px] pt-2">
      {/* 검색 인풋창  */}
      <div className="w-full border-gray-100 rounded-lg h-10 border-[1px] border-solid items-center flex px-4 mb-3">
        <FaSearch className="text-gray-100 mr-3" />
        <input
          type="text"
          value={keyword}
          onChange={(e) => setKeyWord(e.target.value)}
          placeholder="검색어를 입력하세요"
          className="w-full bg-transparent focus:outline-none text-gray-100"
        />
      </div>
      {/* 검색 결과 */}
      <div className="flex flex-wrap gap-3">
        {data && data.results && data.results.all_games && data.results.all_games.length > 0 ? (
          data?.results.all_games.map((item, idx) => (
            <div
              onClick={() => {
                onClose();
                navigate(`/game-detail?id=${item.pk}`);
              }}
              className="cursor-pointer"
            >
              <GameCard key={idx} item={item} row />
            </div>
          ))
        ) : (
          <p className="text-white font-DungGeunMo text-heading-28 flex items-center justify-center w-full h-20">
            검색 결과가 없습니다.
          </p>
        )}
      </div>
    </div>
  );
};

export default SearchModal;
