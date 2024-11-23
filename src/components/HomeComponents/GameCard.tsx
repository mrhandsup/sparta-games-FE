import Easy from "../common/chipComponents/Easy";
import StarRating from "../common/StarRating";
import { GameData } from "./GameCardList";

type Props = {
  item?: GameData;
  simple?: boolean;
  row?: boolean;
};

const GameCard = ({ item, simple, row }: Props) => {
  return (
    <section key={item?.pk} className={`relative flex ${row ? "flex-row" : "flex-col"}`}>
      <img
        src={item?.thumbnail}
        alt="게임 썸네일"
        className={`relative flex justify-center items-center bg-gray-50 ${
          row ? "round-l-lg w-[190px] h-[152px]" : "rounded-t-lg w-[280px] h-[224px]"
        }`}
      />
      <div className="absolute top-0 left-0 bg-black rounded-tl-md rounded-br-lg font-DungGeunMo text-white py-1.5 px-4 w-fit font-light">
        Rhythm
      </div>
      <div className={`p-3 w-[280px] ${!simple && "h-[173px]"} bg-gray-800 text-white pt-4 rounded-b-lg`}>
        <div className="text-heading-20 font-bold text-ellipsis overflow-hidden truncate">
          {item?.title ? item?.title : "test"}
        </div>
        <div className="text-sm font-normal flex items-center justify-between my-2">
          <p className="text-body-14 text-gray-200 truncate max-w-[55%]">{item?.maker_name}</p>
          <div className="flex items-center gap-1.5">
            <p className="text-primary-400 font-DungGeunMo text-title-14">{item?.star.toFixed(1)}</p>
            {item && <StarRating score={item.star} />}
          </div>
        </div>
        {!simple && (
          <div className="flex flex-col justify-between min-h-[60%] ">
            <div
              className={`text-body-14 mt-2 overflow-hidden display-webkit-box ${
                row ? "line-clamp-2" : "line-clamp-3"
              } webkit-box-orient-vertical tracking-wider`}
            >
              세줄설명까지
            </div>
            <div className="flex gap-1">
              <Easy />
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default GameCard;
