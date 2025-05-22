import Hero from "../components/homeComponents/Hero";
import GameCardList from "../components/homeComponents/GameCardList";

import pixelMeteor from "../assets/homeImage/pixelMeteor.svg";
import pixelPaperPlane from "../assets/homeImage/pixelPaperPlane.svg";
import { useQuery } from "@tanstack/react-query";
import { getGameList, getGameListAuth } from "../api/game";
import { TGameData } from "../types";
import { userStore } from "../share/store/userStore";

type TRandGame = {
  category_name: string;
  game_list: TGameData[];
};

type TMainHttpResponse = {
  data: {
    trending_games: TGameData[];
    recent: TGameData[];
    rand1: TRandGame;
    rand2: TRandGame;
    rand3: TRandGame;
  };
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

  const gameListData = data?.data;

  console.log("게임리스트 데이터입니다!!!!!!!!!", data);
  console.log("유저 데이터입니다!!!!!!!!!", userData);
  console.log("아무거나 찍어보겠습니다!!!!!!!!!!!!!!!!");
  return (
    gameListData && (
      <main>
        <div className="bg-gray-800 w-full">
          <Hero />
        </div>
        <div className="relative flex flex-col mx-auto max-w-[1440px] min-w-[1440px] font-Pretendard">
          <GameCardList data={gameListData?.trending_games} noNavigation>
            <div className="flex items-center gap-3">
              <img src={pixelMeteor} />
              <p className="font-DungGeunMo text-[32px] font-[400] text-white">인기 급상승</p>
            </div>
          </GameCardList>
          <GameCardList data={gameListData?.recent} noNavigation>
            <div className="flex items-center gap-3">
              <img src={pixelPaperPlane} />
              <p className="font-DungGeunMo text-heading-32 font-[400] text-white">새롭게 등록된 게임</p>
            </div>
          </GameCardList>
          {gameListData.rand1.game_list.length > 0 && (
            <GameCardList
              data={gameListData?.rand1.game_list}
              to={`/category?category=${gameListData?.rand1.category_name}`}
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-[32px] h-[32px] "
                  style={{ backgroundImage: `url(${getIconUrl(gameListData?.rand1.category_name)})` }}
                />
                <p className="font-DungGeunMo text-heading-32 font-[400] text-white">
                  {gameListData?.rand1.category_name}
                </p>
              </div>
            </GameCardList>
          )}
          {gameListData?.rand2.game_list.length > 0 && (
            <GameCardList
              data={gameListData?.rand2.game_list}
              to={`/category?category=${gameListData?.rand2.category_name}`}
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-[32px] h-[32px] "
                  style={{ backgroundImage: `url(${getIconUrl(gameListData?.rand2.category_name)})` }}
                />
                <p className="font-DungGeunMo font-[400] text-heading-32 text-white">
                  {gameListData?.rand2.category_name}
                </p>
              </div>
            </GameCardList>
          )}
          {gameListData?.rand3.game_list.length > 0 && (
            <GameCardList
              data={gameListData?.rand3.game_list}
              to={`/category?category=${gameListData?.rand3.category_name}`}
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-[32px] h-[32px] "
                  style={{ backgroundImage: `url(${getIconUrl(gameListData?.rand3.category_name)})` }}
                />
                <p className="font-DungGeunMo font-[400] text-heading-32 text-white">
                  {gameListData?.rand3.category_name}
                </p>
              </div>
            </GameCardList>
          )}
        </div>
      </main>
    )
  );
};

export default Home;
