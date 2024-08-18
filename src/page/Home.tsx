import Hero from "../components/HomeComponents/Hero";
import LoginModal from "../components/modal/login/LoginModal";
import GameCardList from "../components/HomeComponents/GameCardList";

import useLoginModalStore from "../share/store/modalStore";

const Home = () => {
  const { openLoginModal } = useLoginModalStore();

  return (
    <main>
      {openLoginModal ? <LoginModal /> : null}
      <Hero />
      <GameCardList text="지금 가장 인기있는 게임" />
      <GameCardList text="최신등록된 게임" />
      <GameCardList text="랜덤 카테고리 추천" />
      <GameCardList text="랜덤 카테고리 추천" />
    </main>
  );
};

export default Home;
