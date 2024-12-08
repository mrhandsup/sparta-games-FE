import Hero from "../components/HomeComponents/Hero";
import LoginModal from "../components/modal/login/LoginModal";
import GameCardList from "../components/HomeComponents/GameCardList";

import useHome from "../hook/useHome";

import pixelMeteor from "../assets/homeImage/pixelMeteor.svg";
import pixelPaperPlane from "../assets/homeImage/pixelPaperPlane.svg";
import pixelGame from "../assets/homeImage/pixelGame.svg";
import { useQuery } from "@tanstack/react-query";
import { getGameList } from "../api/game";
import { TGameData } from "../types";

type TMainHttpResponse = {
  favorite: TGameData[];
  my_game_pack: TGameData[];
};

const Home = () => {
  const { openLoginModal } = useHome();

  const { data } = useQuery<any>({
    queryKey: ["gameList"],
    queryFn: getGameList,
  });

  console.log(data);

  return (
    <main>
      {openLoginModal && <LoginModal />}
      <Hero />
      <GameCardList data={data?.trending_games} noNavigation>
        <div className="flex items-center gap-3">
          <img src={pixelMeteor} />
          <p className="font-DungGeunMo text-heading-32 text-white">인기 급상승</p>
        </div>
      </GameCardList>
      <GameCardList data={data?.recent} noNavigation>
        <div className="flex items-center gap-3">
          <img src={pixelPaperPlane} />
          <p className="font-DungGeunMo text-heading-32 text-white">새롭게 등록된 게임</p>
        </div>
      </GameCardList>
      <GameCardList data={data?.rand1.game_list}>
        <div className="flex items-center gap-3">
          <img src={pixelGame} />
          <p className="font-DungGeunMo text-heading-32 text-white">[{data?.rand1.category_name}]</p>
        </div>
      </GameCardList>
      <GameCardList data={data?.rand2.game_list}>
        <div className="flex items-center gap-3">
          <img src={pixelGame} />
          <p className="font-DungGeunMo text-heading-32 text-white">[{data?.rand2.category_name}]</p>
        </div>
      </GameCardList>
      <GameCardList data={data?.rand3.game_list}>
        <div className="flex items-center gap-3">
          <img src={pixelGame} />
          <p className="font-DungGeunMo text-heading-32 text-white">[{data?.rand3.category_name}]</p>
        </div>
      </GameCardList>
    </main>
  );
};

export default Home;
