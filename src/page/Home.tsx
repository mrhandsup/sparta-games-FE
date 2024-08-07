import Hero from "../components/HomeComponents/Hero";
import GameCard from "../components/HomeComponents/GameCard";

const Home = () => {
  return (
    <main>
      <Hero />
      <div>
        <p className="flex mx-auto w-[1180px] h-12 text-5xl font-bold">지금 가장 인기있는 게임</p>
        <div>
          <GameCard />
        </div>
      </div>
    </main>
  );
};

export default Home;
