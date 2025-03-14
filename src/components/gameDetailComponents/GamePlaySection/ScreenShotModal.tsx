import { Modal, Box } from "@mui/material";
import { useEffect, useState } from "react";
import { Swiper, SwiperRef, SwiperSlide } from "swiper/react";
import useModalToggle from "../../../hook/useModalToggle";
import { Pagination } from "swiper/modules";

import "swiper/css";
import "./GamePlaySwiper.css";

type Props = {
  screenShotList?: {
    id: number;
    src: string;
  }[];
  swiperRef: React.RefObject<SwiperRef>;
};
const ScreenShotModal = ({ screenShotList, swiperRef }: Props) => {
  const { modalToggle, onClickModalToggleHandler } = useModalToggle();
  const [imageIndex, setImageIndex] = useState(0);

  useEffect(() => {
    if (swiperRef.current) {
      const swiperInstance = swiperRef.current.swiper;

      const onClickSlide = (e: MouseEvent) => {
        const slideElement = (e.target as HTMLElement).closest(".swiper-slide");

        if (slideElement) {
          const slideIndex = slideElement.getAttribute("data-swiper-slide-index");

          if (slideIndex !== null && screenShotList) {
            setImageIndex(Number(slideIndex));
            onClickModalToggleHandler();
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
    <Modal open={modalToggle} onClose={onClickModalToggleHandler} disableScrollLock={true}>
      <Box className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-3xl outline-none border border-solid border-primary-500 bg-gray-800 p-8 max-w-[1200px] max-h-full overflow-auto">
        <Swiper
          pagination={{
            clickable: true,
          }}
          loop={true}
          centeredSlides={true}
          slidesPerView={2}
          modules={[Pagination]}
          initialSlide={imageIndex}
          className="stillCutSwiper"
        >
          {screenShotList?.map((image, index) => (
            <SwiperSlide key={index}>
              <img
                src={
                  import.meta.env.VITE_DEPLOYMENT_MODE === "dev"
                    ? import.meta.env.VITE_PROXY_HOST + image.src
                    : image.src
                }
                alt={`carousel-img-${index}`}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>
    </Modal>
  );
};

export default ScreenShotModal;
