import { TSpartaReactionModalProps } from "../../spartaDesignSystem/SpartaReactionModal";

export const uploadErrorMessages = (onClick: () => void): { [key: string]: Partial<TSpartaReactionModalProps> } => ({
  fileSizeWarning: {
    title: "확인해주세요!",
    content: "용량이 커서 파일을 업로드 할 수 없습니다.<br/>업로드할 파일이 500mb 이하인지 확인해주세요.",
    btn1: {
      text: "확인",
      onClick: onClick,
    },
    type: "alert",
  },

  fileTypeWarning: {
    title: "확인해주세요!",
    content: "Zip 또는 7z 파일로 업로드 해주세요.",
    btn1: {
      text: "확인",
      onClick: onClick,
    },
    type: "alert",
  },

  imageTypeWarning: {
    title: "확인해주세요!",
    content: "이미지 파일만 업로드 해주세요.",
    btn1: {
      text: "확인",
      onClick: onClick,
    },
    type: "alert",
  },

  imageUploadWarning: {
    title: "확인해주세요!",
    content: "5mb 이하의 이미지 파일을 업로드해 주세요.",
    btn1: {
      text: "확인",
      onClick: onClick,
    },
    type: "alert",
  },

  gameFileUploadWarning: {
    title: "확인해주세요!",
    content: "WebGL로 빌드된 게임파일을 업로드해주세요!",
    btn1: {
      text: "확인",
      onClick: onClick,
    },
    type: "alert",
  },
});
