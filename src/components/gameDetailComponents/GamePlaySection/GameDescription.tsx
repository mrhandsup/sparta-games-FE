import GameDescriptionModal from "./GameDescriptionModal";
import useGameDetail from "../../../hook/gameDetailHook/useGameDetail";

type Props = {
  title?: string;
  content?: string;
  screenshot?: {
    id: number;
    src: string;
  }[];
};

const GameDescription = ({ title, content, screenshot }: Props) => {
  const { more, onClickMoreToggleHandler } = useGameDetail();

  return (
    <div className="flex flex-col gap-3 mt-5 p-5 bg-gray-800 rounded-xl">
      <div className="flex items-center justify-between">
        <p className="font-DungGeunMo text-[24px] text-white">게임설명</p>
        <p
          onClick={() => {
            onClickMoreToggleHandler();
          }}
          className="font-DungGeunMo text-[24px] text-white text-xl cursor-pointer"
        >
          더보기
        </p>
      </div>

      <div className="flex flex-col gap-2 font-Pretendard text-[14px] text-white leading-[130%]">
        <p>{content}</p>
      </div>

      <GameDescriptionModal
        title={title}
        content={content}
        screenshot={screenshot}
        more={more}
        onClickMoreToggleHandler={onClickMoreToggleHandler}
      />
    </div>
  );
};

export default GameDescription;
