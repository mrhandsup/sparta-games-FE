import { useSearchParams } from "react-router-dom";

import Title from "../components/categoryComponents/Title";
import GameCardList from "../components/HomeComponents/GameCardList";

const Category = () => {
  const [searchParams] = useSearchParams();

  return (
    <main className="w-full">
      <Title category={searchParams.get("category")!} />
      <div className="">
        <GameCardList />
        <GameCardList />
        <GameCardList />
        <GameCardList />
      </div>
    </main>
  );
};

export default Category;
