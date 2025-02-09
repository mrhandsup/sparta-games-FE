import { ChangeEvent, useState } from "react";

import { useForm, SubmitHandler } from "react-hook-form";

import type { TGameUploadInput } from "../../types";
import changeUrl from "../../util/changeUrl";
import useModalToggles from "../useModalToggles";
import { TSpartaReactionModalProps } from "../../spartaDesignSystem/SpartaReactionModal";
import { postGameList, putGameList } from "../../api/game";
import { useNavigate } from "react-router-dom";
import { userStore } from "../../share/store/userStore";

const useGameUpload = () => {
  const MAX_IMAGE_SIZE = 5 * 1024 * 1024;
  const MAX_FILE_SIZE = 200 * 1024 * 1024;

  const VALID_FILE_TYPES = ["zip", "7z"];
  const ALLOWED_EXTENSIONS = ["jpg", "jpeg", "png", "gif"];

  const GAME_UPLOAD_CHECK_ID = "gameUploadCheckId";
  const NO_ACTION_MODAL_ID = "noActionModal";

  const { register, watch, control, setValue, formState, handleSubmit, trigger, getValues, reset } =
    useForm<TGameUploadInput>();

  const { userData } = userStore();

  const navigate = useNavigate();

  const { modalToggles, onClickModalToggleHandlers } = useModalToggles([GAME_UPLOAD_CHECK_ID, NO_ACTION_MODAL_ID]);

  const [gameUploadResponse, setGameUploadResponse] = useState<number | undefined>(0);
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

    imageTypeWarning: {
      title: "확인해주세요!",
      content: "이미지 파일만 업로드 해주세요.",
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

    editConfirm: {
      title: "수정 완료",
      content: "수정이 완료되었습니다.",
      btn1: {
        text: "확인",
        onClick: () => {
          onClickModalToggleHandlers[NO_ACTION_MODAL_ID]();
          navigate(`/my-page/${userData?.user_pk}`);
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

  const checkFileExtension = (fileName: string) => {
    const extension = fileName.split(".").pop()?.toLowerCase();
    return extension && ALLOWED_EXTENSIONS.includes(extension);
  };

  const checkImageDimensions = (file: File): Promise<boolean> => {
    return new Promise((resolve) => {
      const img = new Image();
      img.src = URL.createObjectURL(file);
      img.onload = () => {
        resolve(img.width <= 1000 && img.height <= 800);
      };
    });
  };

  /**
   * 이미지 업로드 핸들러
   */
  const onChangeImageHandler = async (e: ChangeEvent<HTMLInputElement>) => {
    const inputId = e.target.id;
    const files = [...e.target.files!];
    const urlArr: string[] = [];
    const fileInput = document.getElementById(inputId) as HTMLInputElement;

    for (const file of files) {
      let isValid = true; // 파일 유효성 검사를 위한 플래그

      if (inputId === "gameThumbnail" || inputId.startsWith("stillCut")) {
        if (!checkFileSize(file, MAX_IMAGE_SIZE)) {
          setNoActionModalData(noActionData.imageUploadWarning);
          onClickModalToggleHandlers[NO_ACTION_MODAL_ID]();

          setIsUpload((prev) => ({
            ...prev,
            [inputId === "gameThumbnail" ? "thumbnail" : inputId]: false,
          }));

          isValid = false;
        }

        if (!checkFileExtension(file.name)) {
          setNoActionModalData(noActionData.imageTypeWarning);
          onClickModalToggleHandlers[NO_ACTION_MODAL_ID]();

          setIsUpload((prev) => ({
            ...prev,
            [inputId === "gameThumbnail" ? "thumbnail" : inputId]: false,
          }));

          isValid = false;
        }

        const isValidSize = await checkImageDimensions(file);
        if (!isValidSize) {
          setNoActionModalData(noActionData.imageUploadWarning);
          onClickModalToggleHandlers[NO_ACTION_MODAL_ID]();

          setIsUpload((prev) => ({
            ...prev,
            [inputId === "gameThumbnail" ? "thumbnail" : inputId]: false,
          }));

          fileInput.value = "";

          isValid = false;
        }
      }

      // 게임 파일(용량, 타입)에 대한 유효성 검사
      if (inputId === "gameFile") {
        if (!checkFileType(file)) {
          setNoActionModalData(noActionData.fileTypeWarning);
          onClickModalToggleHandlers[NO_ACTION_MODAL_ID]();

          setIsUpload((prev) => ({ ...prev, gameFile: false }));

          fileInput.value = "";
          isValid = false;
        }

        if (!checkFileSize(file, MAX_FILE_SIZE)) {
          setNoActionModalData(noActionData.fileSizeWarning);
          onClickModalToggleHandlers[NO_ACTION_MODAL_ID]();

          setIsUpload((prev) => ({ ...prev, gameFile: false }));
          fileInput.value = "";
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
      updateUploadState(inputId, urlArr);
    }
  };

  /**
   * 업로드한 파일 상태 저장 및 업로드 유무 상태 변경
   */
  const updateUploadState = (inputId: string, urlArr: string[]) => {
    if (inputId === "gameThumbnail") {
      setPreviewThumbnail(urlArr);
      setIsUpload((prev) => ({ ...prev, thumbnail: true }));
    }

    if (inputId === "gameFile") {
      setIsUpload((prev) => ({ ...prev, gameFile: true }));
    }

    if (inputId.startsWith("stillCut")) {
      const cutIndex = inputId.replace("stillCut", "");
      setPreviewStillCut((prev) => [...prev, ...urlArr]);

      setIsUpload((prev) => ({
        ...prev,
        [`stillCut${cutIndex}`]: true,
      }));
    }
  };

  /**
   * 업로드한 이미지 미리보기 삭제
   */
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

  /**
   *약관 체크
   */
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

  /**
   *게임 등록 요청 api
   */
  const onSubmitHandler: SubmitHandler<TGameUploadInput> = async (data) => {
    const formData = new FormData();

    formData.append("title", data.title);
    formData.append("category", data.category.join(","));
    formData.append("content", data.content);
    formData.append("gamefile", data.gameFile[0]);
    formData.append("thumbnail", data.thumbnail[0]);
    formData.append("youtube_url", data.video);
    formData.append("release_note", "테스트");
    formData.append("base_control", "테스트");

    data.stillCut.forEach((fileList) => {
      if (fileList.length > 0) {
        formData.append("screenshots", fileList[0]);
      }
    });

    const res = await postGameList(formData);

    setGameUploadResponse(res?.status);
  };

  /**
   *게임 수정 요청 api
   */
  const onEditHandler = async (data: TGameUploadInput, gamePk: number | undefined) => {
    setNoActionModalData(noActionData.editConfirm);
    onClickModalToggleHandlers[NO_ACTION_MODAL_ID]();

    const formData = new FormData();

    formData.append("title", data.title);
    formData.append("category", data.category.join(","));
    formData.append("content", data.content);
    formData.append("gamefile", data.gameFile[0]);
    formData.append("thumbnail", data.thumbnail[0]);
    formData.append("youtube_url", data.video);
    formData.append("release_note", "테스트");
    formData.append("base_control", "테스트");

    await putGameList(formData, gamePk);
  };

  const form = {
    register,
    watch,
    control,
    setValue,
    formState,
    handleSubmit,
    trigger,
    getValues,
    reset,
  };

  const eventHandler = {
    onChangeImageHandler,
    onClickImageDeleteHandler,
    onClickNoteToggleHandler,
    onSubmitHandler,
    onEditHandler,
  };

  const modalConfig = {
    GAME_UPLOAD_CHECK_ID,
    NO_ACTION_MODAL_ID,
    onClickModalToggleHandlers,
    modalToggles,
    noActionModalData,
  };

  return {
    isUpload,
    setIsUpload,
    note,
    form,
    previewThumbnail,
    previewStillCut,
    eventHandler,
    modalConfig,
    gameUploadResponse,
  };
};

export default useGameUpload;
