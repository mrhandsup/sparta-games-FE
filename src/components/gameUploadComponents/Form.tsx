import { ChangeEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { GAME_CATEGORY } from "../../constant/constant";
import SpartaChipSelect from "../../spartaDesignSystem/SpartaChipSelect";
import SpartaReactionModal, { TSpartaReactionModalProps } from "../../spartaDesignSystem/SpartaReactionModal";
import SpartaModal from "../../spartaDesignSystem/SpartaModal";
import useModalToggles from "../../hook/useModalToggles";
import { useGameEditSetValue } from "../../hook/useGameEditSetValue";
import { postGameList, putGameList } from "../../api/game";
import { userStore } from "../../share/store/userStore";
import UploadCheck from "./UploadCheck";
import changeUrl from "../../util/changeUrl";
import { checkFileExtension, checkFileSize, checkFileType } from "../../util/fileValidation";
import { TGamePlayData, TGameUploadInput } from "../../types";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./Form.css";
import JSZip from "jszip";

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
  const MAX_FILE_SIZE = 200 * 1024 * 1024;
  const GAME_UPLOAD_CHECK_ID = "gameUploadCheckId";
  const EDIT_SUCCESS_ID = "editSuccessId";
  const NO_ACTION_MODAL_ID = "noActionModal";

  const { register, watch, control, setValue, formState, handleSubmit, trigger, getValues, reset, resetField } =
    useForm<TGameUploadInput>({
      mode: "onChange",
    });

  useGameEditSetValue({ previousGameData, isEditMode, setValue, trigger, reset });

  console.log(previousGameData);
  const navigate = useNavigate();
  const { userData } = userStore();

  const { modalToggles, onClickModalToggleHandlers } = useModalToggles([
    GAME_UPLOAD_CHECK_ID,
    EDIT_SUCCESS_ID,
    NO_ACTION_MODAL_ID,
  ]);

  const [isUploading, setIsUploading] = useState(false);
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
      content: "5mb 이하의 이미지 파일을 업로드해 주세요.",
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

  useEffect(() => {
    register("content", {
      required: "필수",
    });
  }, [register]);

  useEffect(() => {
    trigger();
  }, [note]);

  const handleEditorChange = (editorState: string) => {
    // react-quill 내용 작성 중, 내용 모두 지울 경우 생기는 <p></br></p> 태그 제거
    const plainText = editorState.replace(/<(.|\n)*?>/g, "").trim();

    // 내용이 없을 경우 빈 문자열로 설정해서 isValid가 false가 되도록 함
    const cleanedContent = plainText === "" ? "" : editorState;

    setValue("content", cleanedContent, { shouldValidate: true });
  };

  const editorContent = watch("content");

  const isEditFormValid =
    watch("thumbnail")?.length > 0 &&
    watch("gameFile")?.length > 0 &&
    watch("category")?.length > 0 &&
    watch("title") !== "" &&
    watch("content") !== "";

  const [gameUploadResponse, setGameUploadResponse] = useState<number | undefined>(0);

  const createFormData = (data: TGameUploadInput) => {
    const formData = new FormData();

    formData.append("title", data.title);
    formData.append("category", data.category);
    formData.append("content", data.content);
    formData.append("youtube_url", data.video);

    if (data.gameFile instanceof FileList) {
      formData.append("gamefile", data.gameFile[0]);
    } else if (typeof data.gameFile === "string" && previousGameData?.gamefile) {
      formData.append("gamefile", previousGameData?.gamefile);
    }

    if (data.thumbnail instanceof FileList) {
      formData.append("thumbnail", data.thumbnail[0]);
    } else if (typeof data.gameFile === "string" && previousGameData?.thumbnail) {
      formData.append("gamefile", previousGameData?.thumbnail);
    }

    (data.stillCut as File[][]).forEach((screenshot, index) => {
      if (screenshot instanceof FileList && screenshot.length > 0) {
        formData.append("screenshots", screenshot[0]);
      } else if (typeof screenshot === "string" && previousGameData?.screenshot[index]) {
        formData.append("screenshots", previousGameData?.screenshot[index].src);
      }
    });

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

    if (files[0].type === "application/zip" || files[0].type === "application/x-zip-compressed") {
      setIsUploading(true);
      const zip = await JSZip.loadAsync(files[0]);
      const fileNames = Object.keys(zip.files);
      const gzFilesInBuild = fileNames.filter((name) => name.endsWith(".gz"));

      if (gzFilesInBuild.length === 0) {
        window.alert("WebGL로 빌드된 게임파일을 업로드해주세요!");
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

  const extractFileName = (filePath: string | undefined, fileType: "imageFile" | "gameFile") => {
    if (!filePath) return "";

    const fileNameWithExtension = filePath.split("/").pop();

    if (!fileNameWithExtension) return "";

    const [name, extension] = fileNameWithExtension.split(".");

    let finalName = "";
    if (fileType === "imageFile") {
      finalName = name.includes("_") ? name.split("_")[0] : name;
    } else if (fileType === "gameFile") {
      finalName = name.split("_")[1] || name;
    }

    return `${finalName}.${extension}`;
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmitHandler)} className="mx-[130px]">
        <div className="flex gap-10 my-10 text-gray-300 text-body-18">
          <div className="flex flex-col gap-5 w-[760px]">
            <div className="flex flex-col gap-2">
              <div className="flex items-end gap-2 text-heading-20 text-white">
                썸네일 업로드<span className="text-body-14 text-primary-500">*필수</span>
              </div>

              <div className="flex gap-2">
                <div className="py-4 px-4 w-full bg-gray-700 border border-solid border-white rounded-md resize-none whitespace-nowrap overflow-hidden text-ellipsis">
                  {typeof watch("thumbnail") === "object" && watch("thumbnail")?.length > 0
                    ? decodeURIComponent((watch("thumbnail")[0] as File)?.name)
                    : typeof watch("thumbnail") === "string"
                    ? decodeURIComponent(extractFileName(previousGameData?.thumbnail, "imageFile") as string)
                    : "1000px*800px이하의 이미지 파일을 권장합니다."}
                </div>

                <label
                  htmlFor="gameThumbnail"
                  className={`flex justify-center items-center ${
                    watch("thumbnail")?.length > 0 ? "bg-primary-500" : "bg-gray-100"
                  }  text-black rounded-sm text-title-18 whitespace-nowrap cursor-pointer`}
                >
                  {watch("thumbnail")?.length > 0 ? <p className="px-5">수정하기</p> : <p className="px-7">업로드</p>}
                </label>

                <input
                  id="gameThumbnail"
                  type="file"
                  accept="image/*"
                  {...register("thumbnail", { onChange: onChangeFileHandler, required: "필수" })}
                  className="hidden"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex items-end gap-2 text-heading-20 text-white">
                파일업로드 <span className="text-body-14 text-primary-500">*필수</span>
              </div>

              <div className="flex gap-2">
                <div className="py-4 px-4 w-full bg-gray-700 border border-solid border-white rounded-md resize-none whitespace-nowrap overflow-hidden text-ellipsis">
                  {isUploading
                    ? "파일을 검사중입니다."
                    : typeof watch("gameFile") === "object" && watch("gameFile")?.length > 0
                    ? decodeURIComponent((watch("gameFile")[0] as File)?.name)
                    : typeof watch("gameFile") === "string"
                    ? decodeURIComponent(extractFileName(previousGameData?.gamefile, "gameFile") as string)
                    : "200mb 이하 Zip파일로 업로드 해주세요."}
                </div>

                <label
                  htmlFor="gameFile"
                  className={`flex justify-center items-center ${
                    !isUploading && watch("gameFile")?.length > 0 ? "bg-primary-500" : "bg-gray-100"
                  } text-black rounded-sm text-title-18 whitespace-nowrap cursor-pointer`}
                >
                  {!isUploading && watch("gameFile")?.length > 0 ? (
                    <p className="px-5">수정하기</p>
                  ) : (
                    <p className="px-7">업로드</p>
                  )}
                </label>

                <input
                  id="gameFile"
                  type="file"
                  accept=".zip, .7z"
                  {...register("gameFile", { onChange: onChangeFileHandler, required: "필수" })}
                  className="hidden"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex items-end gap-2 text-heading-20 text-white">
                제목 <span className="text-body-14 text-primary-500">*필수</span>
              </div>

              <input
                type="text"
                placeholder="게임 제목을 입력해주세요."
                {...register("title", { required: "필수" })}
                className="py-4 px-4 w-full bg-gray-700 border border-solid border-white rounded-md"
              />
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex items-end gap-2 text-heading-20 text-white">
                장르선택 <span className="text-body-14 text-primary-500">*필수</span>
              </div>

              <div className="gameUploadSelectCustom">
                <SpartaChipSelect
                  label={""}
                  options={GAME_CATEGORY}
                  control={control}
                  {...register("category", { required: "필수" })}
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-[26px] w-[380px]">
            <div className="flex flex-col gap-2">
              <div className="flex items-end gap-2 text-heading-20 text-white">
                플레이 영상<span className="text-body-14 text-alert-default">*선택</span>
              </div>

              <input
                type="text"
                placeholder="유튜브에서 전체/일부공개 설정 후 링크 삽입"
                {...register("video", {
                  validate: (value) => {
                    if (!value) return true;

                    if (!/^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+$/.test(value)) {
                      return "유효한 유튜브 링크를 입력해 주세요";
                    }
                  },
                })}
                className="py-4 px-4 border border-solid border-white bg-gray-700 rounded-md"
              />
              {formState.errors.video && (
                <p className="text-red-500 text-base font-bold">{formState.errors.video.message}</p>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex items-end gap-2 text-heading-20 text-white">
                스틸컷 업로드<span className="text-body-14 text-alert-default">*선택</span>
              </div>

              {["First", "Second", "Third", "Fourth", "Fifth"].map((order, index) => (
                <div key={index} className="flex gap-2">
                  <div className="py-4 px-4 w-full bg-gray-700 border border-solid border-white rounded-md resize-none whitespace-nowrap overflow-hidden text-ellipsis">
                    {watch(`stillCut.${index}`)?.length > 0
                      ? decodeURIComponent(watch(`stillCut.${index}`)[0]?.name)
                      : "1000px*800px이하 파일 권장"}
                  </div>

                  <label
                    htmlFor={`stillCut${order}`}
                    className={`flex justify-center items-center ${
                      watch(`stillCut.${index}`)?.length > 0 ? "bg-alert-default" : "bg-gray-100"
                    } text-black rounded-sm text-title-18 whitespace-nowrap cursor-pointer`}
                  >
                    {watch(`stillCut.${index}`)?.length > 0 ? (
                      <p className="px-5">수정하기</p>
                    ) : (
                      <p className="px-7">업로드</p>
                    )}
                  </label>

                  <input
                    id={`stillCut${order}`}
                    type="file"
                    accept="image/*"
                    {...register(`stillCut.${index}`, { onChange: onChangeFileHandler })}
                    className="hidden"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-[10px] mb-8 formContent">
          <div className="flex items-end gap-2 text-heading-20 text-white">
            게임설명 <p className="text-body-14 text-primary-500">*필수</p>
          </div>

          <ReactQuill
            theme="snow"
            value={editorContent}
            onChange={handleEditorChange}
            modules={{
              toolbar: [
                [{ header: [1, 2] }],
                [{ size: ["small", false, "large", "huge"] }],
                ["bold", "italic", "underline"],
                [{ list: "ordered" }, { list: "bullet" }],
                [{ color: [] }, { background: [] }],
              ],
            }}
            placeholder="이렇게 입력해보세요!&#10;• 간단한 게임 스토리&#10;• 개발자의 한마디&#10;• 팀원들의 정보&#10;• 업데이트 계획"
            className="text-white"
          />
        </div>

        {!isEditMode && note[1] && note[2] && note[3] && formState.isValid ? (
          <button
            onClick={onClickModalToggleHandlers[GAME_UPLOAD_CHECK_ID]}
            type="button"
            className={`mb-10 w-full h-14 text-title-18 text-primary-950 bg-primary-500 rounded-lg`}
          >
            승인요청
          </button>
        ) : isEditMode && isEditFormValid ? (
          <button
            onClick={() => onEditHandler(previousGameData?.id)}
            type="button"
            className={`mb-10 w-full h-14 text-title-18 text-primary-950 bg-primary-500 rounded-lg`}
          >
            수정요청
          </button>
        ) : (
          <button
            type="submit"
            disabled={true}
            className={`mb-10 w-full h-14 text-title-18 text-gray-900 bg-gray-400 rounded-lg`}
          >
            필수 값을 입력한 후 승인요청을 할 수 있습니다.
          </button>
        )}
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
