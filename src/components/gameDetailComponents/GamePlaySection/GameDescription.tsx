import GameDescriptionModal from "./GameDescriptionModal";
import useModalToggle from "../../../hook/useModalToggle";

type Props = {
  title?: string;
  content?: string;
  screenshot?: {
    id: number;
    src: string;
  }[];
};

const GameDescription = ({ title, content, screenshot }: Props) => {
  const { modalToggle, onClickModalToggleHandler } = useModalToggle();

  return (
    <div className="flex flex-col gap-3 mt-5 p-5 bg-gray-800 rounded-xl">
      <div className="flex items-center justify-between">
        <p className="font-DungGeunMo text-[24px] text-white">게임설명</p>
        <p
          onClick={() => {
            onClickModalToggleHandler();
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
        modalToggle={modalToggle}
        onClickModalToggleHandler={onClickModalToggleHandler}
      />
    </div>
  );
};

export default GameDescription;
