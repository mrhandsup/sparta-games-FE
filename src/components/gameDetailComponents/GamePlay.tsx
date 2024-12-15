import { useEffect, useRef, useState } from "react";

import { Swiper, SwiperRef, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "./GamePlaySwiper.css";

import expand from "../../assets/gameDetail/interface-essential-signin-expand.svg";
import share from "../../assets/gameDetail/interface-essential-share-1.svg";
import bookmark from "../../assets/gameDetail/content-files-close-book-bookmark.svg";
import { TGamePlayData } from "../../types";

import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";

type Props = {
  data: TGamePlayData | undefined;
  more: boolean;
  onClickMoreToggleHandler: () => void;
};

const GamePlay = ({ data, more, onClickMoreToggleHandler }: Props) => {
  const gameUrl = `${import.meta.env.VITE_PROXY_HOST}${data?.gamepath}/index.html`;

  const videoId = data?.youtube_url?.split("v=")[1].split("&")[0];
  const embedUrl = `https://www.youtube.com/embed/${videoId}`;

  const fullScreenRef = useRef<HTMLDivElement>(null);

  const handleFullscreen = () => {
    fullScreenRef.current?.requestFullscreen();
  };

  const [open, setOpen] = useState(false);
  const [modalImage, setModalImage] = useState<string | null>(null);

  const handleOpen = (image: string) => {
    setModalImage(image);
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const swiperRef = useRef(null);

  useEffect(() => {
    if (swiperRef.current) {
      const swiperInstance = (swiperRef.current as SwiperRef).swiper;

      const handleSlideClick = (e: MouseEvent) => {
        const slideElement = (e.target as HTMLElement).closest(".swiper-slide");

        if (slideElement) {
          const slideIndex = slideElement.getAttribute("data-swiper-slide-index");

          if (slideIndex !== null && data) {
            const imageSrc = data.screenshot[Number(slideIndex)].src;

            handleOpen(import.meta.env.VITE_PROXY_HOST + imageSrc);
          }
        }
      };

      swiperInstance.slides.forEach((slide: HTMLElement) => {
        slide.addEventListener("click", handleSlideClick);
      });

      return () => {
        swiperInstance.slides.forEach((slide: HTMLElement) => {
          slide.removeEventListener("click", handleSlideClick);
        });
      };
    }
  }, [data]);
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
          <div className="relative p-20 rounded-lg overflow-hidden">
            <iframe src={embedUrl} className="absolute top-0 left-0 w-full h-full" allowFullScreen />
          </div>
        </div>
        <div className="flex flex-col gap-3 p-4 w-full bg-gray-800 rounded-2xl overflow-hidden">
          <p className="font-DungGeunMo text-[24px] text-white">스틸컷</p>
          <div className="h-[336px] overflow-hidden">
            {data?.screenshot && (
              <Swiper
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
                {data.screenshot.map((image, index) => (
                  <SwiperSlide key={index}>
                    <div className="flex justify-center">
                      <img
                        className="w-[198px] h-[112px] rounded-lg"
                        src={import.meta.env.VITE_PROXY_HOST + image.src}
                        alt={`carousel-img-${index}`}
                      />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            )}
          </div>
        </div>
      </div>

      <Modal open={open} onClose={handleClose}>
        <Box className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-3xl outline-none border-[1px] border-solid border-[#05F500] bg-gray-800 p-8">
          {modalImage && (
            <img src={modalImage} className="w-[60rem] h-[30rem] object-cover rounded-3xl" alt="modalImage" />
          )}
        </Box>
      </Modal>
    </section>
  );
};

export default GamePlay;
