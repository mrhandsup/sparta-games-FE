import Title from "../components/categoryComponents/Title";

import GameCardList from "../components/HomeComponents/GameCardList";

const Category = () => {
  return (
    <main className="w-full">
      <Title />
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
