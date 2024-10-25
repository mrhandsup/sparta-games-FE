import Hero from "../components/HomeComponents/Hero";
import LoginModal from "../components/modal/login/LoginModal";
import GameCardList, { GameData } from "../components/HomeComponents/GameCardList";

import useHome from "../hook/useHome";

import pixelMeteor from "../assets/homeImage/pixelMeteor.svg";
import pixelPaperPlane from "../assets/homeImage/pixelPaperPlane.svg";
import pixelGame from "../assets/homeImage/pixelGame.svg";
import { useQuery } from "@tanstack/react-query";
import { getGameList } from "../api/game";

const Home = () => {
  const { openLoginModal } = useHome();

  const { data } = useQuery<GameData[]>({
    queryKey: ["gameList"],
    queryFn: getGameList,
  });

  return (
    <main>
      {openLoginModal && <LoginModal />}
      <Hero />
      <GameCardList data={data} noNavigation>
        <div className="flex items-center gap-3">
          <img src={pixelMeteor} />
          <p className="font-DungGeunMo text-heading-32 text-white">인기 급상승</p>
        </div>
      </GameCardList>
      <GameCardList data={data} noNavigation>
        <div className="flex items-center gap-3">
          <img src={pixelPaperPlane} />
          <p className="font-DungGeunMo text-heading-32 text-white">새롭게 등록된 게임</p>
        </div>
      </GameCardList>
      <GameCardList data={data}>
        <div className="flex items-center gap-3">
          <img src={pixelGame} />
          <p className="font-DungGeunMo text-heading-32 text-white">[랜덤 카테고리]</p>
        </div>
      </GameCardList>
      <GameCardList data={data}>
        <div className="flex items-center gap-3">
          <img src={pixelGame} />
          <p className="font-DungGeunMo text-heading-32 text-white">[랜덤 카테고리]</p>
        </div>
      </GameCardList>
    </main>
  );
};

export default Home;
