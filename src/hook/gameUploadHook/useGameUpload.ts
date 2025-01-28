import { ChangeEvent, useState } from "react";

import { useForm, SubmitHandler } from "react-hook-form";

import type { TGameUploadInput } from "../../types";
import changeUrl from "../../util/changeUrl";
import useModalToggles from "../useModalToggles";
import { TSpartaReactionModalProps } from "../../spartaDesignSystem/SpartaReactionModal";

const useGameUpload = () => {
  const MAX_IMAGE_SIZE = 5 * 1024 * 1024;
  const MAX_FILE_SIZE = 10 * 1024 * 1024;
  const VALID_FILE_TYPES = ["zip", "7z"];

  const NO_ACTION_MODAL_ID = "noActionModal";

  const { register, watch, control, setValue, formState, handleSubmit } = useForm<TGameUploadInput>();

  const { modalToggles, onClickModalToggleHandlers } = useModalToggles([NO_ACTION_MODAL_ID]);

  const [note, setNote] = useState({ 1: false, 2: false, 3: false });
  const [previewThumbnail, setPreviewThumbnail] = useState<string[]>([]);
  const [previewStillCut, setPreviewStillCut] = useState<string[]>([]);
  const [isUpload, setIsUpload] = useState({
    thumbnail: false,
    gameFile: false,
    stillCut: false,
  });

  const noActionData: { [key: string]: Partial<TSpartaReactionModalProps> } = {
    fileSizeWarning: {
      title: "확인해주세요!",
      content: "용량이 커서 파일을 업로드 할 수 없습니다.<br/>업로드할 파일이 200mb 이하인지 확인해주세요.",
      btn1: {
        text: "확인",
        onClick: () => {
          onClickModalToggleHandlers[NO_ACTION_MODAL_ID]();
        },
      },
      type: "alert",
    },

    fileTypeWarning: {
      title: "확인해주세요!",
      content: "Zip 또는 7z 파일로 업로드 해주세요.",
      btn1: {
        text: "확인",
        onClick: () => {
          onClickModalToggleHandlers[NO_ACTION_MODAL_ID]();
        },
      },
      type: "alert",
    },

    imageUploadWarning: {
      title: "확인해주세요!",
      content: "1000px * 800px, 5mb 이하의 이미지 파일을 업로드해 주세요.",
      btn1: {
        text: "확인",
        onClick: () => {
          onClickModalToggleHandlers[NO_ACTION_MODAL_ID]();
        },
      },
      type: "alert",
    },
  };

  const [noActionModalData, setNoActionModalData] = useState<Partial<TSpartaReactionModalProps>>(
    noActionData.fileUploadWarning,
  );

  const checkFileType = (file: File): boolean => {
    const extension = file.name.split(".").pop()?.toLowerCase();
    return extension ? VALID_FILE_TYPES.includes(extension) : false;
  };

  const checkFileSize = (file: File, maxSize: number): boolean => file.size <= maxSize;

  // 이미지 크기 검사 (1000px * 800px 이하)
  const checkImageSize = (file: File): Promise<boolean> => {
    return new Promise((resolve) => {
      const img = new Image();
      img.src = URL.createObjectURL(file);
      img.onload = () => {
        resolve(img.width <= 1000 && img.height <= 800);
      };
    });
  };

  const onChangeImageHandler = async (e: ChangeEvent<HTMLInputElement>) => {
    const inputId = e.target.id;
    const files = [...e.target.files!]; // 여러 파일을 처리할 수 있도록 배열로 만듦
    const urlArr: string[] = [];

    for (const file of files) {
      let isValid = true; // 파일 유효성 검사를 위한 플래그

      if (inputId === "gameThumbnail" || inputId === "stillCut") {
        // 이미지 용량 유효성 검사
        if (!checkFileSize(file, MAX_IMAGE_SIZE)) {
          setNoActionModalData(noActionData.imageUploadWarning);
          onClickModalToggleHandlers[NO_ACTION_MODAL_ID]();

          setIsUpload((prev) => ({
            ...prev,
            [inputId === "gameThumbnail" ? "thumbnail" : "stillCut"]: false,
          }));

          isValid = false;
        }

        // 이미지 용량 유효성 검사 통과한 경우
        if (isValid) {
          // 이미지 크기 유효성 검사
          const isValidSize = await checkImageSize(file);
          if (!isValidSize) {
            setNoActionModalData(noActionData.imageUploadWarning);
            onClickModalToggleHandlers[NO_ACTION_MODAL_ID]();

            setIsUpload((prev) => ({
              ...prev,
              [inputId === "gameThumbnail" ? "thumbnail" : "stillCut"]: false,
            }));

            isValid = false;
          }
        }
      }

      // 게임 파일(용량, 타입)에 대한 유효성 검사
      if (inputId === "gameFile") {
        if (!checkFileType(file)) {
          setNoActionModalData(noActionData.fileTypeWarning);
          onClickModalToggleHandlers[NO_ACTION_MODAL_ID]();

          setIsUpload((prev) => ({ ...prev, gameFile: false }));
          isValid = false;
        }

        if (!checkFileSize(file, MAX_FILE_SIZE)) {
          setNoActionModalData(noActionData.fileSizeWarning);
          onClickModalToggleHandlers[NO_ACTION_MODAL_ID]();

          setIsUpload((prev) => ({ ...prev, gameFile: false }));
          isValid = false;
        }
      }

      // 유효성 검사 통과한 파일만 URL 추가
      if (isValid) {
        const url = changeUrl(file);
        urlArr.push(url);
      }
    }

    // 파일 검사를 통과한 후 상태 업데이트
    if (urlArr.length > 0) {
      console.log("urlArr", urlArr);
      updateUploadState(inputId, urlArr);
    }
  };

  const updateUploadState = (inputId: string, urlArr: string[]) => {
    if (inputId === "gameThumbnail") {
      setPreviewThumbnail(urlArr);
      setIsUpload((prev) => ({ ...prev, thumbnail: true }));
    }

    if (inputId === "gameFile") {
      setIsUpload((prev) => ({ ...prev, gameFile: true }));
    }

    if (inputId === "stillCut") {
      setPreviewStillCut((prev) => [...prev, ...urlArr]);
      setIsUpload((prev) => ({ ...prev, stillCut: true }));
    }
  };

  const onClickImageDeleteHandler = (type: "thumbnail" | "stillCut", arg: number) => {
    if (type === "thumbnail") {
      setPreviewThumbnail([]);
      setValue("thumbnail", []);
    }

    if (type === "stillCut") {
      const previewArr = [...previewStillCut];
      const fileArr = [...watch("stillCut")];

      previewArr.splice(arg, 1);
      fileArr.splice(arg, 1);

      setPreviewStillCut([...previewArr]);
      setValue("stillCut", [...fileArr]);
    }
  };

  const onClickNoteToggleHandler = (arg: 1 | 2 | 3) => {
    if (arg === 1) {
      setNote({ ...note, 1: !note[1] });
      return;
    }

    if (arg === 2) {
      setNote({ ...note, 2: !note[2] });
      return;
    }

    if (arg === 3) {
      setNote({ ...note, 3: !note[3] });
      return;
    }
  };

  const onSubmitHandler: SubmitHandler<TGameUploadInput> = (data) => {
    //게입 업로드 api연결할 부분
    console.log(data);
  };

  const form = {
    register,
    watch,
    control,
    setValue,
    formState,
    handleSubmit,
  };

  const eventHandler = {
    onChangeImageHandler,
    onClickImageDeleteHandler,
    onClickNoteToggleHandler,
    onSubmitHandler,
  };

  const modalConfig = {
    NO_ACTION_MODAL_ID,
    onClickModalToggleHandlers,
    modalToggles,
    noActionModalData,
  };
  return { isUpload, note, form, previewThumbnail, previewStillCut, eventHandler, modalConfig };
};

export default useGameUpload;
