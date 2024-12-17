import { Modal, Box } from "@mui/material";
import { useEffect, useState } from "react";
import { SwiperRef } from "swiper/react";

type Props = {
  screenShotList?: {
    id: number;
    src: string;
  }[];
  swiperRef: React.RefObject<SwiperRef>;
};
const ScreenShotModal = ({ screenShotList, swiperRef }: Props) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalImage, setModalImage] = useState<string | null>(null);

  const handleModalOpen = (image: string) => {
    setModalImage(image);
    setModalOpen(true);
  };

  const handleModalClose = () => setModalOpen(false);

  useEffect(() => {
    if (swiperRef.current) {
      const swiperInstance = swiperRef.current.swiper;

      const handleSlideClick = (e: MouseEvent) => {
        const slideElement = (e.target as HTMLElement).closest(".swiper-slide");

        if (slideElement) {
          const slideIndex = slideElement.getAttribute("data-swiper-slide-index");

          if (slideIndex !== null && screenShotList) {
            const imageSrc = screenShotList[Number(slideIndex)].src;

            handleModalOpen(import.meta.env.VITE_PROXY_HOST + imageSrc);
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
  }, [screenShotList]);

  return (
    <Modal open={modalOpen} onClose={handleModalClose}>
      <Box className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-3xl outline-none border-[1px] border-solid border-[#05F500] bg-gray-800 p-8">
        {modalImage && (
          <img src={modalImage} className="w-[60rem] h-[40rem] object-cover rounded-3xl" alt="modalImage" />
        )}
      </Box>
    </Modal>
  );
};

export default ScreenShotModal;
