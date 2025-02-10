import DOMPurify from "dompurify";

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

  const config = {
    ALLOWED_TAGS: ["h1", "h2", "p", "strong", "span", "em", "u", "ol", "ul", "li", "br"],
    ALLOWED_ATTR: ["class", "style"],
  };

  const sanitizedContent = content && DOMPurify.sanitize(content, config);

  return (
    <div className="flex flex-col gap-3 mt-5 mb-10 p-5 bg-gray-800 rounded-xl">
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

      <div className="flex flex-col gap-2 h-40 line-clamp-6 whitespace-nowrap text-ellipsis">
        <p className="ql-editor text-white" dangerouslySetInnerHTML={{ __html: sanitizedContent as string }} />
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
