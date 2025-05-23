import { useQuery } from "@tanstack/react-query";
import Hero from "../components/homeComponents/Hero";
import GameCardList from "../components/homeComponents/GameCardList";
import { getGameList, getGameListAuth } from "../api/game";
import { userStore } from "../share/store/userStore";
import { TMainHttpResponse } from "../types";

import pixelMeteor from "../assets/homeImage/pixelMeteor.svg";
import pixelPaperPlane from "../assets/homeImage/pixelPaperPlane.svg";
import loading from "../assets/common/loading.gif";

const Home = () => {
  const { userData } = userStore();

  const { data: gameListData } = useQuery<TMainHttpResponse>({
    queryKey: ["gameList", userData],
    queryFn: userData ? getGameListAuth : getGameList,
  });
  const getIconUrl = (category: string) => {
    return new URL(`../assets/gameIcon/${category}.png`, import.meta.url).href;
  };

  if (!gameListData)
    return (
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <img src={loading} className="w-[300px] h-[300px]" alt="로딩 중" />
      </div>
    );

  return (
    gameListData && (
      <main>
        <div className="bg-gray-800 w-full">
          <Hero />
        </div>
        <div className="relative flex flex-col mx-auto max-w-[1440px] min-w-[1440px] font-Pretendard">
          <GameCardList data={gameListData?.data.trending_games} noNavigation>
            <div className="flex items-center gap-3">
              <img src={pixelMeteor} />
              <p className="font-DungGeunMo text-[32px] font-[400] text-white">인기 급상승</p>
            </div>
          </GameCardList>
          <GameCardList data={gameListData?.data.recent} noNavigation>
            <div className="flex items-center gap-3">
              <img src={pixelPaperPlane} />
              <p className="font-DungGeunMo text-heading-32 font-[400] text-white">새롭게 등록된 게임</p>
            </div>
          </GameCardList>
          {gameListData.data.rand1.game_list.length > 0 && (
            <GameCardList
              data={gameListData?.data.rand1.game_list}
              to={`/category?category=${gameListData?.data.rand1.category_name}`}
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-[32px] h-[32px] "
                  style={{ backgroundImage: `url(${getIconUrl(gameListData?.data.rand1.category_name)})` }}
                />
                <p className="font-DungGeunMo text-heading-32 font-[400] text-white">
                  {gameListData?.data.rand1.category_name}
                </p>
              </div>
            </GameCardList>
          )}
          {gameListData?.data.rand2.game_list.length > 0 && (
            <GameCardList
              data={gameListData?.data.rand2.game_list}
              to={`/category?category=${gameListData?.data.rand2.category_name}`}
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-[32px] h-[32px] "
                  style={{ backgroundImage: `url(${getIconUrl(gameListData?.data.rand2.category_name)})` }}
                />
                <p className="font-DungGeunMo font-[400] text-heading-32 text-white">
                  {gameListData?.data.rand2.category_name}
                </p>
              </div>
            </GameCardList>
          )}
          {gameListData?.data.rand3.game_list.length > 0 && (
            <GameCardList
              data={gameListData?.data.rand3.game_list}
              to={`/category?category=${gameListData?.data.rand3.category_name}`}
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-[32px] h-[32px] "
                  style={{ backgroundImage: `url(${getIconUrl(gameListData?.data.rand3.category_name)})` }}
                />
                <p className="font-DungGeunMo font-[400] text-heading-32 text-white">
                  {gameListData?.data.rand3.category_name}
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
