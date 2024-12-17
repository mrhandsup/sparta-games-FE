type Props = {
  more: boolean;
  moreToggle: () => void;
  content?: string;
};

const GameDescription = ({ more, moreToggle, content }: Props) => {
  return (
    <div className="flex flex-col gap-3 mt-5 p-4 bg-gray-800">
      <p className="font-DungGeunMo text-[24px] text-white">게임설명</p>
      {more ? (
        <div className="flex flex-col gap-2 font-Pretendard text-[14px] text-white leading-[130%]">
          <p>{content}</p>
          <p onClick={moreToggle} className="ml-auto font-bold text-primary-100 cursor-pointer">
            간략히
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-2 font-Pretendard text-[14px] text-white leading-[130%] overflow-hidden">
          {
            <>
              <p className="line-clamp-5">{content}</p>
              {content && content.length > 450 && (
                <p onClick={moreToggle} className="ml-auto font-bold text-primary-100 cursor-pointer">
                  더보기
                </p>
              )}
            </>
          }
        </div>
      )}
    </div>
  );
};

export default GameDescription;
