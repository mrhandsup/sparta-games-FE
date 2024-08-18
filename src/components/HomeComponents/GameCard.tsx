import { GameData } from "./GameCardList";

const GameCard = ({ item }: { item?: GameData }) => {
  return (
    <section key={item?.pk}>
      <img
        src={item?.thumbnail}
        alt="게임 썸네일"
        className="relative flex justify-center items-center w-[279px] h-[245px] bg-gray-50"
      />
      <div className="p-3 w-[279px] h-[163px] bg-black text-white">
        <div className="flex justify-between items-center">
          <p className="text-xl font-bold">{item?.title ? item?.title : "test"}</p>
          <p>⭐⭐⭐⭐⭐</p>
        </div>
        <div className="text-sm font-normal">제작자</div>
        <div className="text-sm font-medium">
          세줄설명까지 가능 Hipster ipsum tattooed brunch I'm baby. Meggings keffiyeh hipster fixie loko.
        </div>
        <div className="flex gap-1">
          <p className="flex justify-center items-center px-1 w-[69px] h-6 border border-solid border-primary-500 rounded-md">
            chip🎮
          </p>
          <p className="flex justify-center items-center px-1 w-[69px] h-6 border border-solid border-primary-500 rounded-md">
            chip🎮
          </p>
        </div>
      </div>
    </section>
  );
};

export default GameCard;
