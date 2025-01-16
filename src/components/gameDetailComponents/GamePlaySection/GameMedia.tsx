import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { useRef } from "react";
import ScreenShotModal from "./ScreenShotModal";

import "swiper/css";
import "./GamePlaySwiper.css";

type Props = {
  youtubeUrl?: string;
  screenShot?: {
    id: number;
    src: string;
  }[];
};

const GameMedia = ({ youtubeUrl, screenShot }: Props) => {
  const videoId = youtubeUrl ? youtubeUrl?.split("v=")[1].split("&")[0] : null;
  const embedUrl = `https://www.youtube.com/embed/${videoId}`;

  const swiperRef = useRef(null);

  return (
    <div className="flex flex-col gap-5 w-[280px]">
      <div className="flex flex-col gap-3 p-4 w-full bg-gray-800 rounded-2xl">
        <p className="font-DungGeunMo text-[24px] text-white">플레이 영상</p>
        <div className="relative p-20 rounded-lg overflow-hidden">
          <iframe src={embedUrl} className="absolute top-0 left-0 w-full h-full" allowFullScreen />
        </div>
      </div>

      <div className="flex flex-col gap-3 p-4 w-full bg-gray-800 rounded-2xl overflow-hidden">
        <p className="font-DungGeunMo text-[24px] text-white">스틸컷</p>
        <div className="h-[340px] overflow-hidden cursor-pointer">
          {screenShot && (
            <Swiper
              className="gamescreenShotSwiper"
              ref={swiperRef}
              direction={"vertical"}
              loop={true}
              centeredSlides={true}
              slidesPerView={3}
              pagination={{
                clickable: true,
              }}
              autoplay={{ delay: 2000, disableOnInteraction: false }}
              modules={[Autoplay]}
            >
              {screenShot.map((image, index) => (
                <SwiperSlide key={index}>
                  <div className="flex justify-center">
                    <img src={import.meta.env.VITE_PROXY_HOST + image.src} alt={`carousel-img-${index}`} />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          )}
        </div>
      </div>

      <ScreenShotModal screenShotList={screenShot} swiperRef={swiperRef} />
    </div>
  );
};

export default GameMedia;
