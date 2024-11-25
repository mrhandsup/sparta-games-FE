import expand from "../../assets/gameDetail/interface-essential-signin-expand.svg";
import share from "../../assets/gameDetail/interface-essential-share-1.svg";
import bookmark from "../../assets/gameDetail/content-files-close-book-bookmark.svg";
import { Swiper, SwiperSlide } from "swiper/react";
import "./GamePlaySwiper.css";
import { useRef } from "react";

export type GamePlayData = {
  id: number;
  maker_name: string;
  title: string;
  thumnail: null;
  youtube_url: string;
  content: string;
  gamepath: string;
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
  const gameUrl = `${import.meta.env.VITE_PROXY_HOST}${data?.gamepath}/index.html`;
  const fullScreenRef = useRef<HTMLDivElement>(null);

  const handleFullscreen = () => {
    fullScreenRef.current?.requestFullscreen();
  };

  return (
    <section className="flex gap-5 mt-6">
      <div className="w-[880px]">
        <div className="flex flex-col gap-2 font-DungGeunMo text-[32px] text-white">
          <p>[{data?.title}]</p>
          <div className="flex justify-between">
            <p className="text-gray-100 text-[28px]">[{data?.maker_name}]</p>
            <div className="flex gap-6">
              <img src={expand} onClick={handleFullscreen} alt="" className="cursor-pointer" />
              <img src={share} alt="" className="cursor-pointer" />
              <img src={bookmark} alt="" className="cursor-pointer" />
            </div>
          </div>
        </div>
        <div className="mt-5 w-full h-[495px] bg-gray-400 rounded-t-lg" ref={fullScreenRef}>
          <iframe src={gameUrl} width="100%" height="100%" />
        </div>
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
          <div className="relative p-20 rounded-lg border border-solid border-white overflow-hidden">
            <iframe src={data?.youtube_url} className="absolute top-0 left-0 w-full h-full" />
          </div>
        </div>
        <div className="flex flex-col gap-3 p-4 w-full bg-gray-800 rounded-2xl overflow-hidden">
          <p className="font-DungGeunMo text-[24px] text-white">스틸컷</p>
          <div className="h-[336px] overflow-hidden">
            <Swiper
              direction={"vertical"}
              loop={true}
              centeredSlides={true}
              slidesPerView={3}
              pagination={{
                clickable: true,
              }}
              className="mySwiper"
            >
              {data?.screenshot &&
                data.screenshot.map((image, index) => (
                  <SwiperSlide key={index}>
                    <div className="flex justify-center">
                      <img
                        className="w-[198px] h-[112px] border border-solid border-white rounded-lg"
                        src={import.meta.env.VITE_PROXY_HOST + image.src}
                        alt={`carousel-img-${index}`}
                      />
                    </div>
                  </SwiperSlide>
                ))}
            </Swiper>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GamePlay;
