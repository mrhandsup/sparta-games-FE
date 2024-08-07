import Hero from "../components/HomeComponents/Hero";
import GameCard from "../components/HomeComponents/GameCard";

const Home = () => {
  return (
    <main>
      <Hero />
      <div className="flex flex-col justify-evenly items-center w-full h-[536px]">
        <p className="flex mx-auto w-[1180px] h-12 text-5xl font-bold">지금 가장 인기있는 게임</p>
        <div className="flex justify-between w-[1180px] h-[408px]">
          <GameCard />
          <GameCard />
          <GameCard />
          <GameCard />
        </div>
      </div>
    </main>
  );
};

export default Home;
