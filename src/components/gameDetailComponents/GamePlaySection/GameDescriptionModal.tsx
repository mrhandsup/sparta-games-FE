import { Modal, Box } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "./GameDescriptionModalSwiper.css";

type Props = {
  title?: string;
  content?: string;
  screenshot?: {
    id: number;
    src: string;
  }[];
  modalOpen: boolean;
  handleModalClose: () => void;
};

const GameDescriptionModal = ({ title, content, screenshot, modalOpen, handleModalClose }: Props) => {
  return (
    <Modal open={modalOpen} onClose={handleModalClose}>
      <Box className="absolute top-16 left-1/2 transform -translate-x-1/2 rounded-3xl outline-none border border-solid border-primary-500 bg-gray-800 p-8 max-w-[1200px] max-h-full overflow-auto">
        <div className="flex flex-col gap-6 w-full">
          <p className="text-2xl font-DungGeunMo text-white">{`[${title}]`}</p>
          <Swiper
            pagination={{
              clickable: true, // pagination을 클릭할 수 있도록 설정
            }}
            loop={true}
            centeredSlides={true}
            slidesPerView={1.5}
            modules={[Pagination]}
            className="descriptionSwiper"
          >
            {screenshot?.map((image, index) => (
              <SwiperSlide key={index}>
                <img src={import.meta.env.VITE_PROXY_HOST + image.src} alt={`carousel-img-${index}`} />
              </SwiperSlide>
            ))}
          </Swiper>

          <div className="">
            <p className="text-sm font-Pretendard text-white">{content}</p>
          </div>
        </div>
      </Box>
    </Modal>
  );
};

export default GameDescriptionModal;
