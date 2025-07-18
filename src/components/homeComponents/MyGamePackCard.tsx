import { TGameData } from "../../types";
import StarRating from "../common/StarRating";
import GameChip from "../common/chipComponents/GameChip";
import SpartaButton from "../../spartaDesignSystem/SpartaButton";
import { userStore } from "../../share/store/userStore";
import { useNavigate } from "react-router-dom";
import removeHTMLTags from "../../util/removeHTMLTags";

type Props = { item?: TGameData };

const MyGameCard = ({ item }: Props) => {
  const { userData } = userStore();

  const navigate = useNavigate();

  const image =
    import.meta.env.VITE_DEPLOYMENT_MODE === "dev"
      ? import.meta.env.VITE_PROXY_HOST + item?.thumbnail
      : item?.thumbnail;

  return (
    <section key={item?.id} className={`relative flex items-center w-full h-[475px] bg-gray-800`}>
      <div
        className="w-[50%] h-[475px] bg-cover bg-center bg-no-repeat relative"
        style={{
          backgroundImage: `url(${image})`,
          maskImage: "linear-gradient(to right, black 75%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to right, black 75%, transparent 100%)",
        }}
      />
      <div className="w-[50%] ps-10 pr-[130px]">
        <p className="text-title-18 font-DungGeunMo text-primary-400">
          {item?.is_liked
            ? `[${userData?.data.nickname}] 님이 즐겨찾기한 게임`
            : `[${userData?.data.nickname}] 님이 좋아할만한 게임`}
        </p>
        <div className="flex gap-3 font-DungGeunMo items-baseline mt-[8px]">
          <p className="text-heading-24">{item?.title ? item?.title : "test"}</p>
        </div>
        <div className="flex items-center gap-1.5 justify-between pt-1 pb-2">
          <p className="text-[22.4px] font-DungGeunMo ">{item?.maker_data.nickname || "Maker"}</p>
          <div className="flex items-center gap-1.5">
            <p className="text-primary-400 font-DungGeunMo text-[22.4px]">{item?.star.toFixed(1)}</p>
            {item && <StarRating score={item.star} size="large" />}
          </div>
        </div>
        <div className="flex gap-3">
          {item?.chips?.map((chip) => (
            <GameChip key={chip.id} chipName={chip.name} size="large" />
          ))}
        </div>
        <div className="min-h-40 ">
          <div className="text-white pt-2 line-clamp-6 text-[16px] leading-[24px]">
            {item?.content ? removeHTMLTags(item?.content) : ""}
          </div>
        </div>
        <SpartaButton
          content="플레이하기"
          onClick={() => navigate(`/game-detail?id=${item?.id}`)}
          size="medium"
          colorType="primary"
        />
      </div>
    </section>
  );
};

export default MyGameCard;
