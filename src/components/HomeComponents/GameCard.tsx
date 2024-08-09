import { GameData } from "./GameCardList";

const GameCard = ({ item }: { item?: GameData }) => {
  return (
    <section key={item?.pk}>
      <div className="relative flex justify-center items-center w-[279px] h-[245px] bg-gray-200">
        이미지<p className="absolute top-0 left-0">Categories</p>
      </div>
      {/* <img
        src={item.thumbnail}
        alt="게임 썸네일"
        className="relative flex justify-center items-center w-[279px] h-[245px]"
      /> */}
      <div className="p-3 w-[279px] h-[163px]">
        <div className="flex justify-between items-center">
          <p className="text-xl font-bold">{item?.title ? item?.title : "test"}</p>
          <p>⭐⭐⭐⭐⭐</p>
        </div>
        <div className="text-sm font-normal">제작자</div>
        <div className="text-sm font-medium">
          세줄설명까지 가능 Hipster ipsum tattooed brunch I'm baby. Meggings keffiyeh hipster fixie loko.
        </div>
        <div className="flex gap-1">
          <p>chip🎮</p>chip🎮<p></p>
        </div>
      </div>
    </section>
  );
};

export default GameCard;
