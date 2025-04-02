import { ChangeEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import SpartaReactionModal, { TSpartaReactionModalProps } from "../../spartaDesignSystem/SpartaReactionModal";
import SpartaModal from "../../spartaDesignSystem/SpartaModal";
import useModalToggles from "../../hook/useModalToggles";
import { postGameList, putGameList } from "../../api/game";
import { userStore } from "../../share/store/userStore";
import UploadCheck from "./UploadCheck";
import changeUrl from "../../util/changeUrl";
import { checkFileExtension, checkFileSize, checkFileType } from "../../util/fileValidation";
import { TGamePlayData, TGameUploadInput } from "../../types";
import "react-quill/dist/quill.snow.css";
import "./Form.css";
import JSZip from "jszip";
import GameUploadFields from "./GameUploadFields";
import GameMediaFields from "./GameMediaFields";
import GameDescriptionField from "./GameDescriptionField";
import GameSubmitButton from "./GameSubmitButton";
import { uploadErrorMessages } from "./uploadErrorMessages";

type Props = {
  note: {
    1: boolean;
    2: boolean;
    3: boolean;
  };
  previousGameData: TGamePlayData | undefined;
  isEditMode: boolean;
};

const Form = ({ note, previousGameData, isEditMode }: Props) => {
  const MAX_IMAGE_SIZE = 5 * 1024 * 1024;
  const MAX_FILE_SIZE = 500 * 1024 * 1024;
  const GAME_UPLOAD_CHECK_ID = "gameUploadCheckId";
  const EDIT_SUCCESS_ID = "editSuccessId";
  const NO_ACTION_MODAL_ID = "noActionModal";

  const { register, watch, control, setValue, formState, handleSubmit, trigger, getValues, resetField } =
    useForm<TGameUploadInput>({
      mode: "onChange",
    });

  const navigate = useNavigate();
  const { userData } = userStore();

  const [isUploading, setIsUploading] = useState(false);

  const { modalToggles, onClickModalToggleHandlers } = useModalToggles([
    GAME_UPLOAD_CHECK_ID,
    EDIT_SUCCESS_ID,
    NO_ACTION_MODAL_ID,
  ]);

  const noActionData = uploadErrorMessages(() => {
    onClickModalToggleHandlers[NO_ACTION_MODAL_ID]();
  });

  const [noActionModalData, setNoActionModalData] = useState<Partial<TSpartaReactionModalProps>>(
    noActionData.fileUploadWarning,
  );

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
      setValue("category", previousGameData.category[0].name);
      setValue("content", previousGameData.content);
    }
  }, [previousGameData, setValue]);

  const [gameUploadResponse, setGameUploadResponse] = useState<number | undefined>(0);

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

    // if (data.stillCut) {
    //   (data.stillCut as File[][]).forEach((screenshot, index) => {
    //     if (screenshot instanceof FileList && screenshot.length > 0) {
    //       formData.append("screenshots", screenshot[0]);
    //     } else if (typeof screenshot === "object" && previousGameData?.screenshot[index]) {
    //       formData.append("screenshots", previousGameData?.screenshot[index].src);
    //     }
    //   });
    // }

    if (data.stillCut) {
      (data.stillCut as File[][]).forEach((screenshot, index) => {
        formData.append("new_screenshots", screenshot[0]);
      });
    }
    if (previousGameData?.screenshot) {
      previousGameData.screenshot.forEach((screenshot) => {
        console.log("screenshot.id", screenshot.id);
        formData.append("old_screenshots", screenshot.id); // 개별 추가
      });
    }

    return formData;
  };

  const onSubmitHandler: SubmitHandler<TGameUploadInput> = async (data) => {
    const formData = createFormData(data);
    const res = await postGameList(formData);
    setGameUploadResponse(res?.status);
  };

  const onEditHandler = async (gamePk: number | undefined) => {
    const formData = createFormData(getValues());

    const res = await putGameList(formData, gamePk);

    if (res?.status === 400) {
      setNoActionModalData({
        title: "확인해주세요!",
        content: `${res.data.error}`,
        btn1: {
          text: "확인",
          onClick: () => {
            onClickModalToggleHandlers[NO_ACTION_MODAL_ID]();
          },
        },
        type: "error",
      });
      onClickModalToggleHandlers[NO_ACTION_MODAL_ID]();
    } else if (res?.status === 200) {
      setNoActionModalData(noActionData.editConfirm);
      onClickModalToggleHandlers[EDIT_SUCCESS_ID]();
    }
  };

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

    // JSZip을 활용하여 업로드한 파일이 WebGL 파일인지 유효성 검사
    if (
      files[0].type === "application/zip" ||
      files[0].type === "application/x-zip-compressed" ||
      files[0].type === "application/x-7z-compressed"
    ) {
      setIsUploading(true);
      const zip = await JSZip.loadAsync(files[0]);
      const fileNames = Object.keys(zip.files);
      const gzFilesInBuild = fileNames.filter((name) => name.endsWith(".gz"));

      if (gzFilesInBuild.length === 0) {
        setNoActionModalData(noActionData.gameFileUploadWarning);
        onClickModalToggleHandlers[NO_ACTION_MODAL_ID]();
        fileInput.value = "";
        resetField(inputId as "gameFile");
        setIsUploading(false);
      }
    }

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
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmitHandler)} className="mx-[130px]">
        <div className="flex gap-10 my-10 text-gray-300 text-body-18">
          <GameUploadFields
            watch={watch}
            register={register}
            control={control}
            isUploading={isUploading}
            onChangeFileHandler={onChangeFileHandler}
            previousGameData={previousGameData}
          />

          <GameMediaFields
            watch={watch}
            register={register}
            formState={formState}
            onChangeFileHandler={onChangeFileHandler}
            previousGameData={previousGameData}
          />
        </div>

        <GameDescriptionField watch={watch} setValue={setValue} />

        <GameSubmitButton
          watch={watch}
          formState={formState}
          note={note}
          isEditMode={isEditMode}
          openUploadCheckModal={onClickModalToggleHandlers[GAME_UPLOAD_CHECK_ID]}
          onEditRequest={() => onEditHandler(previousGameData?.id)}
        />
      </form>

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
          gameUploadResponse={gameUploadResponse}
          onSubmitHandler={onSubmitHandler}
          onClose={onClickModalToggleHandlers[GAME_UPLOAD_CHECK_ID]}
          isEditMode={isEditMode}
        />
      </SpartaModal>

      <SpartaModal
        isOpen={modalToggles[EDIT_SUCCESS_ID]}
        onClose={onClickModalToggleHandlers[EDIT_SUCCESS_ID]}
        modalId={EDIT_SUCCESS_ID}
        closeOnClickOutside={false}
        type={"alert"}
      >
        <div className="min-w-80 flex flex-col items-center gap-4">
          <div className="text-[18px] font-medium text-alert-default font-DungGeunMo">수정 완료</div>
          <div className="text-[16px] font-light leading-7 my-2 text-white text-center"> 수정이 완료되었습니다.</div>
          <button
            className="w-full rounded-md transition-colors duration-200 box-border h-10 text-title-16 font-normal bg-alert-default hover:bg-alert-hover"
            onClick={() => {
              onClickModalToggleHandlers[EDIT_SUCCESS_ID]();
              navigate(`/my-page/${userData?.user_pk}`);
            }}
          >
            확인
          </button>
        </div>
      </SpartaModal>
    </>
  );
};

export default Form;
