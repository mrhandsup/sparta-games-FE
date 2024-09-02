import { useEffect } from "react";

import { useNavigate } from "react-router-dom";

import Hero from "../components/HomeComponents/Hero";
import LoginModal from "../components/modal/login/LoginModal";
import GameCardList from "../components/HomeComponents/GameCardList";

import useLoginModalStore from "../share/store/modalStore";

import { getUserInfo } from "../api/login";

import pixelMeteor from "../assets/homeImage/pixelMeteor.svg";
import pixelPaperPlane from "../assets/homeImage/pixelPaperPlane.svg";
import pixelGame from "../assets/homeImage/pixelGame.svg";

const Home = () => {
  const { openLoginModal } = useLoginModalStore();
  const params = new URLSearchParams(window.location.search);
  const code = params.get("code");
  const navigate = useNavigate();

  useEffect(() => {
    const fetch = async (code: string) => {
      try {
        const res = await getUserInfo(code);
        console.log(res);
      } catch (error) {
        console.log(error);
      }
    };
    if (code) {
      console.log(code);
      fetch(code);
    }
  }, [code, navigate]);

  return (
    <main>
      {openLoginModal && <LoginModal />}
      <Hero />
      <GameCardList>
        <div className="flex items-center gap-3">
          <img src={pixelMeteor} />
          <p className="font-DungGeunMo text-heading-32 text-white">인기 급상승</p>
        </div>
      </GameCardList>
      <GameCardList>
        <div className="flex items-center gap-3">
          <img src={pixelPaperPlane} />
          <p className="font-DungGeunMo text-heading-32 text-white">새롭게 등록된 게임</p>
        </div>
      </GameCardList>
      <GameCardList>
        <div className="flex items-center gap-3">
          <img src={pixelGame} />
          <p className="font-DungGeunMo text-heading-32 text-white">[랜덤 카테고리]</p>
        </div>
      </GameCardList>
      <GameCardList>
        <div className="flex items-center gap-3">
          <img src={pixelGame} />
          <p className="font-DungGeunMo text-heading-32 text-white">[랜덤 카테고리]</p>
        </div>
      </GameCardList>
    </main>
  );
};

export default Home;
