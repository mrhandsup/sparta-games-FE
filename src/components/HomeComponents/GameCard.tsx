import { FaBookmark } from "react-icons/fa";
import StarRating from "../common/StarRating";
import { TGameData } from "../../types";
import GameChip from "../common/chipComponents/GameChip";
import DOMPurify from "dompurify";
import removeHTMLTags from "../../util/removeHTMLTags";

type Props = {
  item?: TGameData;
  simple?: boolean;
  row?: boolean;
};

const GameCard = ({ item, simple, row }: Props) => {
  const image =
    import.meta.env.VITE_DEPLOYMENT_MODE === "dev"
      ? import.meta.env.VITE_PROXY_HOST + item?.thumbnail
      : item?.thumbnail;

  return (
    <section
      key={item?.pk}
      className={`relative flex ${
        row ? "flex-row" : "flex-col"
      } border-gray-100 border-[0.7px] rounded-lg border-solid`}
    >
      <img
        src={image}
        alt="게임 썸네일"
        className={`relative flex justify-center items-center bg-gray-50 ${
          row ? "rounded-l-lg w-[190px] h-[152px]" : "rounded-t-lg w-[280px] h-[224px]"
        }`}
      />
      {/* 카테고리 */}
      <div
        className="absolute top-0 left-0 bg-white rounded-tl-md rounded-br-lg font-DungGeunMo text-black py-1.5 px-4 w-fit font-light
      border-gray-100 border-b-[0.7px] border-r-[0.95px] border-solid
      "
      >
        {item?.category_name[0]}
      </div>
      {/* 북마크 */}
      <div className="absolute top-[-1px] right-4  rounded-tl-md rounded-br-lg font-DungGeunMo text-white w-fit font-light">
        {item?.is_liked && <FaBookmark className="text-green-400 text-3xl" />}
      </div>
      <div
        className={`p-3 bg-gray-800 text-white pt-4 rounded-b-lg ${
          row ? "h-[150px] w-[300px]" : "h-[173px] w-[280px]"
        }`}
      >
        <div className="text-heading-20 font-bold text-ellipsis overflow-hidden truncate">
          {item?.title ? item?.title : "test"}
        </div>
        <div className="text-sm font-normal flex items-center justify-between my-1.5">
          <p className="text-body-14 font-medium text-gray-200 truncate max-w-[55%]">{item?.maker_name}</p>
          <div className="flex items-center gap-1.5">
            <p className="text-primary-300 font-DungGeunMo  pt-0.5 text-[14px] font-[400]">{item?.star.toFixed(1)}</p>
            {item && <StarRating score={item.star} />}
          </div>
        </div>
        {!simple && (
          <div className={`flex flex-col justify-between  ${row ? "min-h-[53%]" : "min-h-[63%]"}  `}>
            <div
              className={` text-body-14  overflow-hidden display-webkit-box ${row ? "line-clamp-2" : "line-clamp-3"} 
              webkit-box-orient-vertical tracking-wider
              p-0
              `}
            >
              {item?.content ? removeHTMLTags(item?.content) : "게임 설명이 없습니다."}
            </div>
            <div className="flex gap-1">
              {/* <Easy /> */}
              {item?.chip_names?.map((chip) => (
                <GameChip key={chip} chipName={chip} />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default GameCard;
