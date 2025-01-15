import { Modal, Box } from "@mui/material";
import { useEffect, useState } from "react";
import { SwiperRef } from "swiper/react";
import useGameDetail from "../../../hook/gameDetailHook/useGameDetail";

type Props = {
  screenShotList?: {
    id: number;
    src: string;
  }[];
  swiperRef: React.RefObject<SwiperRef>;
};
const ScreenShotModal = ({ screenShotList, swiperRef }: Props) => {
  const { more, onClickMoreToggleHandler } = useGameDetail();

  const [gameImage, setGameImage] = useState<string | null>(null);

  const openScreenShot = (image: string) => {
    setGameImage(image);
    onClickMoreToggleHandler();
  };

  useEffect(() => {
    if (swiperRef.current) {
      const swiperInstance = swiperRef.current.swiper;

      const onClickSlide = (e: MouseEvent) => {
        const slideElement = (e.target as HTMLElement).closest(".swiper-slide");

        if (slideElement) {
          const slideIndex = slideElement.getAttribute("data-swiper-slide-index");

          if (slideIndex !== null && screenShotList) {
            const imageSrc = screenShotList[Number(slideIndex)].src;

            openScreenShot(import.meta.env.VITE_PROXY_HOST + imageSrc);
          }
        }
      };

      swiperInstance.slides?.forEach((slide: HTMLElement) => {
        slide.addEventListener("click", onClickSlide);
      });

      return () => {
        swiperInstance.slides?.forEach((slide: HTMLElement) => {
          slide.removeEventListener("click", onClickSlide);
        });
      };
    }
  }, [screenShotList]);

  return (
    <Modal open={more} onClose={onClickMoreToggleHandler} disableScrollLock={true}>
      <Box className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[60rem] rounded-3xl outline-none border border-solid border-primary-500 bg-gray-800 p-8">
        {gameImage && <img src={gameImage} className="w-[60rem] h-[40rem] object-cover rounded-3xl" alt="modalImage" />}
      </Box>
    </Modal>
  );
};

export default ScreenShotModal;
