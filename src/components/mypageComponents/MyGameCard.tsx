import { TGameData } from "../../types";
import StarRating from "../common/StarRating";
import GameChip from "../common/chipComponents/GameChip";
import SpartaButton from "../../spartaDesignSystem/SpartaButton";
import { useNavigate } from "react-router-dom";
import removeHTMLTags from "../../util/removeHTMLTags";

type Props = { item?: TGameData & { register_state: number } };

const MyGameCard = ({ item }: Props) => {
  const navigate = useNavigate();

  const getRegisterStateConfig = (): {
    content: string;
    colorType: "alert" | "primary" | "error";
    detailContent: string;
  } => {
    switch (item?.register_state) {
      case 0:
        return {
          content: "검수중",
          colorType: "alert",
          detailContent: "미리보기",
        };
      case 1:
        return {
          content: "검수완료",
          colorType: "primary",
          detailContent: "게임하러가기",
        };
      case 2:
        return {
          content: "반려",
          colorType: "error",
          detailContent: "수정 및 반려사유 확인",
        };
      default:
        return {
          content: "검수중",
          colorType: "alert",
          detailContent: "미리보기",
        };
    }
  };

  return (
    <section key={item?.id} className={`relative flex w-full`}>
      <img
        src={
          import.meta.env.VITE_DEPLOYMENT_MODE === "dev"
            ? import.meta.env.VITE_PROXY_HOST + item?.thumbnail
            : item?.thumbnail
        }
        alt="게임 썸네일"
        className="relative flex justify-center items-center bg-gray-50 rounded-l-lg w-[45%] h-[278px]"
      />
      {/* 카테고리 */}
      <div className="absolute top-0 left-0 bg-gray-700 rounded-tl-md rounded-br-lg font-DungGeunMo text-white py-1.5 px-4 w-fit font-light">
        {item?.category_data[0].name}
      </div>
      <div className="ml-4 w-[55%] flex flex-col justify-between">
        <div className={` bg-gray-800 text-white  rounded-b-lg`}>
          <div className="text-title-22  font-DungGeunMo text-ellipsis overflow-hidden truncate font-[400]">
            {item?.title ? item?.title : "test"}
          </div>
          <div className="w-full text-sm font-normal flex items-center justify-between my-1">
            <p className="text-title-14 text-gray-200 truncate max-w-[55%] font-DungGeunMo font-[400]">
              {item?.maker_data.nickname || "Maker"}
            </p>
            <div className="flex items-center gap-1.5">
              <p className="text-primary-400 font-DungGeunMo text-[18px] pt-0.5 font-[400]">{item?.star.toFixed(1)}</p>
              {item && <StarRating score={item.star} size="large" />}
            </div>
          </div>
          <div className="flex gap-1">
            {item?.chips?.map((chip) => (
              <GameChip key={chip.id} chipName={chip.name} size="large" />
            ))}
          </div>
          <div className="flex flex-col justify-between">
            <div
              className={`text-body-18 my-2 display-webkit-box webkit-box-orient-vertical tracking-wider line-clamp-6`}
            >
              {item?.content ? removeHTMLTags(item?.content) : "게임 설명이 없습니다."}
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between w-full">
          <div className="w-[20%]">
            <SpartaButton
              content={getRegisterStateConfig()?.content}
              size="small"
              colorType={getRegisterStateConfig().colorType}
              type="filled"
            />
          </div>
          <div className="w-[78%]">
            <SpartaButton
              content={getRegisterStateConfig()?.detailContent}
              onClick={() => {
                navigate(`/game-detail?id=${item?.id}`);
              }}
              size="small"
              colorType={getRegisterStateConfig().colorType}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default MyGameCard;
