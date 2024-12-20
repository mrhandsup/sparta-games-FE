import { Modal, Box } from "@mui/material";

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
      <Box className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-3xl outline-none border border-solid border-primary-500 bg-gray-800 p-8">
        <div className="flex flex-col gap-6">
          <p className="text-2xl font-DungGeunMo  text-white">[{title}]</p>
          <div className="flex">
            {screenshot?.map((image, index) => (
              <img
                className="w-[198px] h-[112px] rounded-lg"
                src={import.meta.env.VITE_PROXY_HOST + image.src}
                alt={`carousel-img-${index}`}
              />
            ))}
          </div>
          <div className="">
            <p className="text-sm font-Pretendard text-white">{content}</p>
          </div>
        </div>
      </Box>
    </Modal>
  );
};

export default GameDescriptionModal;
