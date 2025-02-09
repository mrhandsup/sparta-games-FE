import DOMPurify from "dompurify";

import { Modal, Box } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "./GameDescriptionModalSwiper.css";
import "react-quill/dist/quill.snow.css";
import Preview from "../../../assets/gameDetail/Priview.jpg";

type Props = {
  title?: string;
  content?: string;
  screenshot?: {
    id: number;
    src: string;
  }[];
  modalToggle: boolean;
  onClickModalToggleHandler: () => void;
};

const GameDescriptionModal = ({ title, content, screenshot, modalToggle, onClickModalToggleHandler }: Props) => {
  const config = {
    ALLOWED_TAGS: ["h1", "h2", "p", "strong", "span", "em", "u", "ol", "ul", "li", "br"],
    ALLOWED_ATTR: ["class", "style"],
  };
  const sanitizedContent = content && DOMPurify.sanitize(content, config);

  return (
    <Modal open={modalToggle} onClose={onClickModalToggleHandler} disableScrollLock={true}>
      <Box className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-3xl outline-none border border-solid border-primary-500 bg-gray-800 p-8 max-w-[1200px] max-h-full overflow-auto">
        <div className="flex flex-col gap-6 w-full">
          <p className="text-2xl font-DungGeunMo text-white">{`[${title}]`}</p>
          {screenshot && screenshot?.length > 0 ? (
            <Swiper
              pagination={{
                clickable: true,
              }}
              loop={true}
              centeredSlides={true}
              slidesPerView={1.5}
              modules={[Pagination]}
              className="descriptionSwiper"
            >
              {screenshot?.map((image, index) => (
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
          ) : (
            <img src={Preview} alt="기본이미지" />
          )}

          <p
            className="text-sm font-Pretendard ql-editor"
            dangerouslySetInnerHTML={{ __html: sanitizedContent as string }}
          />
        </div>
      </Box>
    </Modal>
  );
};

export default GameDescriptionModal;
