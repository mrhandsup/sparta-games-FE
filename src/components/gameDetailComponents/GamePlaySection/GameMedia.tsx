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
  const getYouTubeVideoId = (url: string) => {
    try {
      if (!url.startsWith("http")) {
        url = "https://" + url;
      }

      const urlObj = new URL(url);

      if (urlObj.hostname.includes("youtube.com")) {
        if (urlObj.pathname === "/watch") {
          return urlObj.searchParams.get("v");
        } else if (urlObj.pathname.startsWith("/embed/")) {
          return urlObj.pathname.split("/")[2];
        }
      } else if (urlObj.hostname.includes("youtu.be")) {
        return urlObj.pathname.substring(1);
      }
    } catch (e) {
      window.alert("Invalid YouTube URL");
      return null;
    }
  };
  const videoId = youtubeUrl && getYouTubeVideoId(youtubeUrl);
  const embedUrl = videoId ? `https://www.youtube.com/embed/${videoId}` : undefined;

  const swiperRef = useRef(null);

  return (
    <div className="flex flex-col gap-5 w-[280px]">
      <div className="flex flex-col gap-3 p-4 w-full bg-gray-800 rounded-2xl">
        <p className="font-DungGeunMo text-[24px] text-white">플레이 영상</p>
        {youtubeUrl ? (
          <div className="relative p-20 rounded-lg overflow-hidden">
            <iframe src={embedUrl} className="absolute top-0 left-0 w-full h-full" allowFullScreen />
          </div>
        ) : (
          <div className="flex items-center justify-center text-xl text-white text-center font-DungGeunMo h-[155px]">
            업로드 된 <br />
            영상이 없습니다.
          </div>
        )}
      </div>

      <div className="flex flex-col gap-3 p-4 w-full bg-gray-800 rounded-2xl overflow-hidden">
        <p className="font-DungGeunMo text-[24px] text-white">스틸컷</p>
        {screenShot && screenShot.length > 0 ? (
          <div className="h-[340px] overflow-hidden cursor-pointer">
            <Swiper
              className="gamescreenShotSwiper"
              ref={swiperRef}
              direction={"vertical"}
              loop={true}
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
                    <img
                      src={
                        import.meta.env.VITE_DEPLOYMENT_MODE === "dev"
                          ? import.meta.env.VITE_PROXY_HOST + image.src
                          : image.src
                      }
                      alt={`carousel-img-${index}`}
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        ) : (
          <div className="flex items-center justify-center h-[340px] text-xl text-white text-center font-DungGeunMo">
            업로드 된 <br />
            스틸컷이 없습니다.
          </div>
        )}
      </div>

      <ScreenShotModal screenShotList={screenShot} swiperRef={swiperRef} />
    </div>
  );
};

export default GameMedia;
