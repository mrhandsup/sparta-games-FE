import expand from "../../assets/gameDetail/interface-essential-signin-expand.svg";
import share from "../../assets/gameDetail/interface-essential-share-1.svg";
import bookmark from "../../assets/gameDetail/content-files-close-book-bookmark.svg";

export type GamePlayData = {
  maker_name: string;
  title: string;
  thumnail: ImageData | null;
  youtube_url: string;
  content: string;
  base_control: string;
  screenshot: {
    id: number;
    src: string;
  }[];
};

type Props = {
  data: GamePlayData | undefined;
  more: boolean;
  onClickMoreToggleHandler: () => void;
};

const GamePlay = ({ data, more, onClickMoreToggleHandler }: Props) => {
  return (
    <section className="flex gap-5 mt-6">
      <div className="w-[880px]">
        <div className="flex flex-col gap-2 font-DungGeunMo text-[32px] text-white">
          <p>[{data?.title}]</p>
          <div className="flex justify-between">
            <p className="text-gray-100 text-[28px]">[{data?.maker_name}]</p>
            <div className="flex gap-6">
              <img src={expand} alt="" />
              <img src={share} alt="" />
              <img src={bookmark} alt="" />
            </div>
          </div>
        </div>
        <div className="mt-5 w-full h-[495px] bg-gray-400 rounded-t-lg">{/* 게임들어갈 부분 */}</div>
        <div className="flex flex-col gap-3 p-4 bg-gray-800">
          <p className="font-DungGeunMo text-[24px] text-white">게임설명</p>
          {more ? (
            <p className="flex flex-col gap-2 font-Pretendard text-[14px] text-white leading-[130%]">
              <p>{data?.content}</p>
              <p onClick={onClickMoreToggleHandler} className="ml-auto font-bold text-primary-100 cursor-pointer">
                간략히
              </p>
            </p>
          ) : (
            <p className="flex flex-col gap-2 font-Pretendard text-[14px] text-white leading-[130%] overflow-hidden">
              {
                <>
                  <p className="line-clamp-5">{data?.content}</p>
                  {data?.content && data?.content.length > 450 && (
                    <p onClick={onClickMoreToggleHandler} className="ml-auto font-bold text-primary-100 cursor-pointer">
                      더보기
                    </p>
                  )}
                </>
              }
            </p>
          )}
        </div>
      </div>
      <div className="flex flex-col gap-5 w-[280px]">
        <div className="flex flex-col gap-3 p-4 w-full bg-gray-800 rounded-2xl">
          <p className="font-DungGeunMo text-[24px] text-white">기본 조작법</p>
          <div className="whitespace-pre text-[14px] text-white leading-[130%]">{data?.base_control}</div>
        </div>
        <div className="flex flex-col gap-3 p-4 w-full bg-gray-800 rounded-2xl">
          <p className="font-DungGeunMo text-[24px] text-white">게임플레이 영상</p>
          <div className="relative p-20  rounded-lg  border border-solid border-white overflow-hidden">
            <iframe src={data?.youtube_url} className="absolute top-0 left-0 w-full h-full" />
          </div>
        </div>
        <div className="flex flex-col gap-3 p-4 w-full bg-gray-800 rounded-2xl">
          <p className="font-DungGeunMo text-[24px] text-white">스틸컷</p>
          <div className="relative w-[248px] h-[304px]">
            <div className="relative h-[304px]">
              {/* 라이브러리 사용 확정되면 수정 예정 */}
              {data?.screenshot && data?.screenshot.length > 0 && (
                <>
                  <div className="absolute w-[198px] h-[304px] top-0 left-[25px]">
                    <div className="absolute top-0 left-0 w-[198px] h-28 opacity-80 rounded-lg bg-gray-400 border border-solid border-white">
                      <img src={import.meta.env.VITE_PROXY_HOST + data?.screenshot[1].src} />
                    </div>
                    <div className="absolute top-48 left-0 w-[198px] h-28 opacity-80 rounded-lg bg-gray-400 border border-solid border-white">
                      <img src={import.meta.env.VITE_PROXY_HOST + data?.screenshot[2].src} />
                    </div>
                  </div>
                  <div className="absolute top-[82px] left-0 w-[248px] h-[140px] rounded-lg bg-gray-400 border border-solid border-white">
                    <img src={import.meta.env.VITE_PROXY_HOST + data?.screenshot[0].src} />
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GamePlay;
