import { ChangeEvent, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FormProvider, useForm } from "react-hook-form";

import { postGameList, putGameList } from "../../api/game";

import SpartaReactionModal, { TSpartaReactionModalProps } from "../../spartaDesignSystem/SpartaReactionModal";
import SpartaModal from "../../spartaDesignSystem/SpartaModal";
import useModalToggles from "../../hook/useModalToggles";

import { userStore } from "../../share/store/userStore";
import changeUrl from "../../util/changeUrl";
import { checkFileExtension, checkFileSize, checkFileType } from "../../util/fileValidation";

import { TGamePlayData, TGameUploadInput } from "../../types";

import UploadCheck from "./UploadCheck";
import GameUploadFields from "./GameUploadFields";
import GameMediaFields from "./GameMediaFields";
import GameDescriptionField from "./GameDescriptionField";

import { uploadErrorMessages } from "./uploadErrorMessages";

import JSZip from "jszip";

import "./Form.css";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import SpartaButton from "../../spartaDesignSystem/SpartaButton";

type Props = {
  note: {
    1: boolean;
    2: boolean;
    3: boolean;
  };
  previousGameData: TGamePlayData | undefined;
  isEditMode: boolean;
};

const GameUploadForm = ({ note, previousGameData, isEditMode }: Props) => {
  const MAX_IMAGE_SIZE = 5 * 1024 * 1024;
  const MAX_FILE_SIZE = 500 * 1024 * 1024;
  const GAME_UPLOAD_CHECK_ID = "gameUploadCheckId";
  const GAME_UPLOAD_SUCCESS_ID = "gameUploadSuccessModal";
  const EDIT_SUCCESS_ID = "editSuccessId";
  const NO_ACTION_MODAL_ID = "noActionModal";

  const methods = useForm<TGameUploadInput>({
    mode: "onChange",
    defaultValues: {
      thumbnail: previousGameData?.thumbnail || "",
      gameFile: previousGameData?.gamefile || "",
    },
  });

  const { register, setValue, formState, handleSubmit, trigger, resetField, reset } = methods;

  const navigate = useNavigate();
  const { userData } = userStore();

  const [isUploading, setIsUploading] = useState(false);

  const { modalToggles, onClickModalToggleHandlers } = useModalToggles([
    GAME_UPLOAD_CHECK_ID,
    GAME_UPLOAD_SUCCESS_ID,
    EDIT_SUCCESS_ID,
    NO_ACTION_MODAL_ID,
  ]);

  const noActionData = uploadErrorMessages(() => {
    onClickModalToggleHandlers[NO_ACTION_MODAL_ID]();
  });

  const [noActionModalData, setNoActionModalData] = useState<Partial<TSpartaReactionModalProps>>(
    noActionData.fileUploadWarning,
  );

  const [screenShotIds, setScreenShotIds] = useState<number[]>([]);
  const { pathname } = useLocation();

  useEffect(() => {
    if (pathname === "/game-upload") {
      reset({
        thumbnail: "",
        gameFile: "",
        title: "",
      });
    }
  }, [pathname]);

  useEffect(() => {
    register("content", {
      required: "필수",
    });
  }, [register]);

  useEffect(() => {
    trigger();
  }, [note]);

  useEffect(() => {
    if (previousGameData) {
      setValue("category", previousGameData.category[0].name, { shouldValidate: true });
      setValue("title", previousGameData.title, { shouldValidate: true });
      setValue("content", previousGameData.content, { shouldValidate: true });
      setValue("video", previousGameData?.youtube_url);
    }

    trigger();
  }, [previousGameData, setValue]);

  useEffect(() => {
    if (previousGameData?.screenshot) {
      const ids = previousGameData.screenshot.map((item) => item.id);
      setScreenShotIds(ids);
    }
  }, [previousGameData]);

  const validateImageFile = async (file: File): Promise<boolean> => {
    if (!checkFileSize(file, MAX_IMAGE_SIZE)) {
      setNoActionModalData(noActionData.imageUploadWarning);
      onClickModalToggleHandlers[NO_ACTION_MODAL_ID]();

      return false;
    }

    if (!checkFileExtension(file.name)) {
      setNoActionModalData(noActionData.imageTypeWarning);
      onClickModalToggleHandlers[NO_ACTION_MODAL_ID]();

      return false;
    }

    return true;
  };

  const validateGameFile = (file: File): boolean => {
    if (!checkFileType(file)) {
      setNoActionModalData(noActionData.fileTypeWarning);
      onClickModalToggleHandlers[NO_ACTION_MODAL_ID]();

      return false;
    }

    if (!checkFileSize(file, MAX_FILE_SIZE)) {
      setNoActionModalData(noActionData.fileSizeWarning);
      onClickModalToggleHandlers[NO_ACTION_MODAL_ID]();

      return false;
    }

    return true;
  };

  const handleFileValidation = async (file: File, inputId: string): Promise<boolean> => {
    if (inputId === "gameThumbnail" || inputId.startsWith("stillCut")) {
      return await validateImageFile(file);
    }

    if (inputId === "gameFile") {
      return validateGameFile(file);
    }

    return false;
  };

  const onChangeFileHandler = async (e: ChangeEvent<HTMLInputElement>) => {
    const inputId = e.target.id;
    const files = [...e.target.files!];
    const urlArr: string[] = [];
    const fileInput = document.getElementById(inputId) as HTMLInputElement;

    if (
      inputId === "gameFile" &&
      (files[0].type === "application/zip" ||
        files[0].type === "application/x-zip-compressed" ||
        files[0].type === "application/x-7z-compressed")
    ) {
      setIsUploading(true);
      const zip = await JSZip.loadAsync(files[0]);
      const fileNames = Object.keys(zip.files);
      const indexPath = Object.keys(zip.files).find((path) => path.endsWith("index.html"));
      // 업로드한 파일이 WebGL 파일인지(gz 확장자를 가진 파일이 있는지) 확인
      const gzFilesInBuild = fileNames.filter((name) => name.endsWith(".gz"));

      // WebGl로 빌드된 파일이 루트 폴더에 위치하는지 확인
      const depth = indexPath && indexPath.split("/").filter(Boolean).length - 1;

      if (gzFilesInBuild.length === 0) {
        setNoActionModalData(noActionData.gameFileUploadWarning);
        onClickModalToggleHandlers[NO_ACTION_MODAL_ID]();
        fileInput.value = "";
        resetField(inputId as "gameFile");
        setIsUploading(false);
      }

      if (depth && depth > 0) {
        setNoActionModalData(noActionData.gameFileDepthWarning);
        onClickModalToggleHandlers[NO_ACTION_MODAL_ID]();
        fileInput.value = "";
        resetField(inputId as "gameFile");
        setIsUploading(false);
      }
    }

    // 파일 유효성(확장자, 크기) 검사
    for (const file of files) {
      const isValid = await handleFileValidation(file, inputId);

      if (isValid) {
        urlArr.push(changeUrl(file));
        setIsUploading(false);
      } else {
        fileInput.value = "";
        resetField(inputId as "gameFile" | "thumbnail" | "stillCut");
      }
    }

    //스틸컷 이미지 수정 - 기존에 업로드한 이미지를 새로운 이미지로 업로드하면 기존 이미지의 id 제거
    const index = Number(inputId.replace("stillCut", ""));
    const oldScreenshotId = previousGameData?.screenshot[index]?.id;

    if (oldScreenshotId) {
      const updatedIds = screenShotIds.filter((id) => id !== oldScreenshotId);

      setScreenShotIds(updatedIds);
    }
  };

  const createFormData = (data: TGameUploadInput) => {
    const formData = new FormData();

    formData.append("title", data.title);
    formData.append("category", data.category);
    formData.append("content", data.content);
    formData.append("youtube_url", data.video);

    if (data.gameFile instanceof FileList) {
      formData.append("gamefile", data.gameFile[0]);
    } else if (typeof data.gameFile === "object" && previousGameData?.gamefile) {
      formData.append("gamefile", previousGameData?.gamefile);
    }

    if (data.thumbnail instanceof FileList) {
      formData.append("thumbnail", data.thumbnail[0]);
    } else if (typeof data.gameFile === "object" && previousGameData?.thumbnail) {
      formData.append("thumbnail", previousGameData?.thumbnail);
    }

    if (data.stillCut) {
      data.stillCut.forEach((screenshot) => {
        if (screenshot.length > 0) formData.append("new_screenshots", screenshot[0]);
      });
    }
    if (previousGameData?.screenshot) {
      screenShotIds.forEach((id) => {
        formData.append("old_screenshots", String(id));
      });
    }
    return formData;
  };

  const onSubmit = async (data: TGameUploadInput) => {
    const formData = createFormData(data);

    if (!isEditMode) {
      createGameMutation.mutate(formData);
    } else {
      updateGameMutation.mutate({ formData, gamePk: previousGameData?.id });
    }
  };

  const createGameMutation = useMutation({
    mutationFn: postGameList,
    onSuccess: () => {
      setNoActionModalData({
        title: "등록이 완료되었습니다.",
        content:
          "검수 진행결과는 마이페이지 - 개발목록에서 확인 가능합니다.<br />검수 승인이 완료되는 즉시 유저들에게 게임이 공개되며, 2일 이내로 소요될 예정입니다.<br />잠시만 기다려주세요🙂",
        btn1: {
          text: "확인했습니다.",
          onClick: () => {
            onClickModalToggleHandlers[NO_ACTION_MODAL_ID]();
            navigate(`/my-page/${userData?.data.user_id}?tab=develop`);
          },
        },
        type: "primary",
      });

      onClickModalToggleHandlers[GAME_UPLOAD_CHECK_ID]();
      onClickModalToggleHandlers[NO_ACTION_MODAL_ID]();
    },
    onError: (error: AxiosError) => {
      if (error.response && error.response.status === 400) {
        window.alert(`${(error.response?.data as { message?: string })?.message}`);
      } else {
        window.alert("알 수 없는 오류가 발생했습니다. 잠시후에 다시 시도해주세요.");
      }
    },
  });

  const updateGameMutation = useMutation({
    mutationFn: ({ formData, gamePk }: { formData: FormData; gamePk: number | undefined }) =>
      putGameList(formData, gamePk),
    onSuccess: () => {
      setNoActionModalData({
        title: "글 수정 완료",
        content: "글 수정이 완료됐습니다!",
        btn1: {
          text: "확인했습니다.",
          onClick: () => {
            onClickModalToggleHandlers[NO_ACTION_MODAL_ID]();
            navigate(`/my-page/${userData?.data.user_id}?tab=develop`);
          },
        },
        type: "alert",
      });

      onClickModalToggleHandlers[NO_ACTION_MODAL_ID]();
    },
    onError: (error: AxiosError) => {
      if (error.response && error.response.status === 400) {
        window.alert(`${(error.response?.data as { message?: string })?.message}`);
      } else {
        window.alert("알 수 없는 오류가 발생했습니다. 잠시후에 다시 시도해주세요.");
      }
    },
  });

  return (
    <>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex gap-10 my-10 text-gray-300 text-body-18">
            <GameUploadFields
              isUploading={isUploading}
              onChangeFileHandler={onChangeFileHandler}
              previousGameData={previousGameData}
            />

            <GameMediaFields onChangeFileHandler={onChangeFileHandler} previousGameData={previousGameData} />
          </div>

          <GameDescriptionField />
          <SpartaButton
            onClick={!isEditMode ? onClickModalToggleHandlers[GAME_UPLOAD_CHECK_ID] : undefined}
            content={
              !isEditMode && note[1] && note[2] && note[3] && formState.isValid
                ? "승인요청"
                : isEditMode && formState.isValid
                ? "수정요청"
                : "필수 값을 입력한 후 승인요청을 할 수 있습니다."
            }
            disabled={!formState.isValid}
            type="filled"
            btnType={!isEditMode ? "button" : "submit"}
            size="medium"
            customStyle="mb-10 w-full h-14"
          />
        </form>
      </FormProvider>
      {noActionModalData && (
        <SpartaReactionModal
          isOpen={modalToggles[NO_ACTION_MODAL_ID]}
          onClose={onClickModalToggleHandlers[NO_ACTION_MODAL_ID]}
          modalId={NO_ACTION_MODAL_ID}
          title={noActionModalData.title || ""}
          content={noActionModalData.content || ""}
          btn1={{
            text: noActionModalData?.btn1?.text || "",
            onClick: noActionModalData?.btn1?.onClick || (() => {}),
          }}
          type={noActionModalData.type}
        />
      )}

      <SpartaModal
        isOpen={modalToggles[GAME_UPLOAD_CHECK_ID]}
        onClose={onClickModalToggleHandlers[GAME_UPLOAD_CHECK_ID]}
        modalId={GAME_UPLOAD_CHECK_ID}
        closeOnClickOutside={false}
      >
        <UploadCheck
          handleSubmit={handleSubmit}
          onSubmitHandler={(data) => {
            const formData = createFormData(data);
            createGameMutation.mutate(formData);
          }}
          onClose={onClickModalToggleHandlers[GAME_UPLOAD_CHECK_ID]}
          isPending={createGameMutation.isPending}
        />
      </SpartaModal>
    </>
  );
};

export default GameUploadForm;
