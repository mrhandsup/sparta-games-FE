import Hero from "../components/HomeComponents/Hero";
import GameCardList from "../components/HomeComponents/GameCardList";

import pixelMeteor from "../assets/homeImage/pixelMeteor.svg";
import pixelPaperPlane from "../assets/homeImage/pixelPaperPlane.svg";
import pixelGame from "../assets/homeImage/pixelGame.svg";
import { useQuery } from "@tanstack/react-query";
import { getGameList, getGameListAuth } from "../api/game";
import { TGameData } from "../types";
import { userStore } from "../share/store/userStore";

type TRandGame = {
  category_name: string;
  game_list: TGameData[];
};

type TMainHttpResponse = {
  trending_games: TGameData[];
  recent: TGameData[];
  rand1: TRandGame;
  rand2: TRandGame;
  rand3: TRandGame;
};

const Home = () => {
  const { userData } = userStore();

  const { data } = useQuery<TMainHttpResponse>({
    queryKey: ["gameList", userData],
    queryFn: userData ? getGameListAuth : getGameList,
  });
  const getIconUrl = (category: string) => {
    return new URL(`../assets/gameIcon/${category}.png`, import.meta.url).href;
  };

  return (
    data && (
      <main>
        <div className="bg-gray-800 w-full">
          <Hero />
        </div>
        <div className="relative flex flex-col mx-auto max-w-[1440px] min-w-[1440px] font-Pretendard">
          <GameCardList data={data?.trending_games} noNavigation>
            <div className="flex items-center gap-3">
              <img src={pixelMeteor} />
              <p className="font-DungGeunMo text-[32px] font-[400] text-white">인기 급상승</p>
            </div>
          </GameCardList>
          <GameCardList data={data?.recent} noNavigation>
            <div className="flex items-center gap-3">
              <img src={pixelPaperPlane} />
              <p className="font-DungGeunMo text-heading-32 font-[400] text-white">새롭게 등록된 게임</p>
            </div>
          </GameCardList>
          {data?.rand1.game_list.length > 0 && (
            <GameCardList data={data?.rand1.game_list} to={`/category?category=${data?.rand1.category_name}`}>
              <div className="flex items-center gap-3">
                <div
                  className="w-[32px] h-[32px] "
                  style={{ backgroundImage: `url(${getIconUrl(data?.rand1.category_name)})` }}
                />
                <p className="font-DungGeunMo text-heading-32 font-[400] text-white">[{data?.rand1.category_name}]</p>
              </div>
            </GameCardList>
          )}
          {data?.rand2.game_list.length > 0 && (
            <GameCardList data={data?.rand2.game_list} to={`/category?category=${data?.rand2.category_name}`}>
              <div className="flex items-center gap-3">
                <div
                  className="w-[32px] h-[32px] "
                  style={{ backgroundImage: `url(${getIconUrl(data?.rand2.category_name)})` }}
                />
                <p className="font-DungGeunMo font-[400] text-heading-32 text-white">[{data?.rand2.category_name}]</p>
              </div>
            </GameCardList>
          )}
          {data?.rand3.game_list.length > 0 && (
            <GameCardList data={data?.rand3.game_list} to={`/category?category=${data?.rand3.category_name}`}>
              <div className="flex items-center gap-3">
                <div
                  className="w-[32px] h-[32px] "
                  style={{ backgroundImage: `url(${getIconUrl(data?.rand3.category_name)})` }}
                />
                <p className="font-DungGeunMo font-[400] text-heading-32 text-white">[{data?.rand3.category_name}]</p>
              </div>
            </GameCardList>
          )}
        </div>
      </main>
    )
  );
};

export default Home;
