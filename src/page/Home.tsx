import Hero from "../components/HomeComponents/Hero";
import LoginModal from "../components/modal/login/LoginModal";
import GameCardList from "../components/HomeComponents/GameCardList";

import useLoginModalStore from "../share/store/modalStore";
import { useEffect } from "react";
import { getUserInfo } from "../api/login";
import { useNavigate } from "react-router-dom";

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
      <GameCardList text="지금 가장 인기있는 게임" />
      <GameCardList text="최신등록된 게임" />
      <GameCardList text="랜덤 카테고리 추천" />
      <GameCardList text="랜덤 카테고리 추천" />
    </main>
  );
};

export default Home;
