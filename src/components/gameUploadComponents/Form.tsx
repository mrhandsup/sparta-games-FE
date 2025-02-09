import { useEffect } from "react";
import { SubmitHandler } from "react-hook-form";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

import { GAME_CATEGORY } from "../../constant/constant";
import SpartaChipSelect from "../../spartaDesignSystem/SpartaChipSelect";

import { TCategoryListResponse, TGamePlayData, TGameUploadInput, TGameUploadInputForm } from "../../types";

import SpartaReactionModal, { TSpartaReactionModalProps } from "../../spartaDesignSystem/SpartaReactionModal";
import SpartaModal from "../../spartaDesignSystem/SpartaModal";
import UploadCheck from "./UploadCheck";

import "./Form.css";

type Props = {
  form: TGameUploadInputForm;
  note: {
    1: boolean;
    2: boolean;
    3: boolean;
  };
  isUpload: {
    thumbnail: boolean;
    gameFile: boolean;
    stillCut: boolean;
  };
  setIsUpload: React.Dispatch<
    React.SetStateAction<{
      thumbnail: boolean;
      gameFile: boolean;
      stillCut: boolean;
    }>
  >;
  onChangeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmitHandler: SubmitHandler<TGameUploadInput>;
  onEditHandler: (data: TGameUploadInput, gamePk: number | undefined) => Promise<void>;
  modalConfig: {
    modalToggles: Record<string, boolean>;
    noActionModalData: Partial<TSpartaReactionModalProps>;
    NO_ACTION_MODAL_ID: string;
    GAME_UPLOAD_CHECK_ID: string;
    onClickModalToggleHandlers: Record<string, () => void>;
  };
  gameUploadResponse: number | undefined;
  previousGameData: TGamePlayData | undefined;
  isEditMode: boolean;
};

const Form = ({
  form,
  note,
  isUpload,
  setIsUpload,
  onChangeHandler,
  onSubmitHandler,
  onEditHandler,
  modalConfig,
  gameUploadResponse,
  previousGameData,
  isEditMode,
}: Props) => {
  console.log("isEditMode", isEditMode);

  const extractFileName = (contentType: "thumbnail" | "gameFile" | "stillCut", filePath: string | undefined) => {
    const fileName = filePath?.split("/").pop();
    return contentType === "thumbnail"
      ? fileName?.replace(/_([A-Za-z0-9]+)\.(\w+)$/, ".$2")
      : contentType === "gameFile"
      ? fileName?.replace(/^\d+_/, "")
      : contentType === "stillCut"
      ? fileName?.replace(/_([A-Za-z0-9]+)\.(\w+)$/, ".$2")
      : "";
  };

  const changeUrltoFile = async (
    contentType: "thumbnail" | "gameFile" | "stillCut",
    dataUrl: string,
    index?: number,
  ) => {
    const orginalContentName =
      contentType === "thumbnail"
        ? extractFileName("thumbnail", previousGameData?.thumbnail)
        : contentType === "gameFile"
        ? extractFileName("gameFile", previousGameData?.gamefile)
        : contentType === "stillCut"
        ? extractFileName("stillCut", dataUrl) // "stillCut"일 때도 파일명 추출
        : "";

    const ext = dataUrl.split(".").pop();

    const mimeType =
      ext === "png"
        ? "image/png"
        : ext === "jpg" || ext === "jpeg"
        ? "image/jpeg"
        : ext === "gif"
        ? "image/gif"
        : ext === "zip"
        ? "application/x-zip-compressed"
        : "application/octet-stream";

    try {
      const response = await fetch(dataUrl);
      const blob = await response.blob();
      const file = new File([blob], orginalContentName as string, { type: mimeType });

      if (contentType === "stillCut" && index !== undefined) {
        // stillCut의 경우 동적으로 field name 설정
        const fieldName = `stillCut.${index}` as keyof TGameUploadInput;
        form.setValue(fieldName, [file]);

        setIsUpload((prev) => ({
          ...prev,
          [`stillCut${["First", "Second", "Third", "Fourth", "Fifth"][index]}`]: true,
        }));
      } else {
        form.setValue(contentType, [file]);
      }
    } catch (err) {
      console.error("파일 변환 오류:", err);
    }

    setIsUpload((prev) => ({
      ...prev,
      [contentType]: true,
    }));
  };

  useEffect(() => {
    if (previousGameData && isEditMode) {
      console.log("asdas@@@dasd");
      changeUrltoFile("thumbnail", previousGameData.thumbnail);
      changeUrltoFile("gameFile", previousGameData.gamefile);

      previousGameData.screenshot.forEach((image, index) => {
        changeUrltoFile("stillCut", image.src, index); // 각 stillCut에 대해 인덱스를 전달
      });

      form.setValue("title", previousGameData.title);

      form.setValue(
        "category",
        previousGameData.category.map((cat: TCategoryListResponse[number]) => cat.name),
      );

      form.setValue("content", previousGameData.content);

      form.setValue("video", previousGameData.youtube_url);

      form.trigger(["gameFile", "thumbnail"]);
    } else {
      form.reset();

      setIsUpload((prev) => ({
        ...prev,
        thumbnail: false,
        gameFile: false,
        stillCutFirst: false,
        stillCutSecond: false,
        stillCutThird: false,
        stillCutFourth: false,
        stillCutFifth: false,
      }));
    }
  }, [previousGameData, isEditMode]);

  useEffect(() => {
    form.register("content", {
      required: "필수",
    });
  }, [form.register]);

  useEffect(() => {
    form.trigger();
  }, [note]);

  const handleEditorChange = (editorState: string) => {
    // react-quill 내용 작성 중, 내용 모두 지울 경우 생기는 <p></br></p> 태그 제거
    const plainText = editorState.replace(/<(.|\n)*?>/g, "").trim();

    // 내용이 없을 경우 빈 문자열로 설정해서 isValid가 false가 되도록 함
    const cleanedContent = plainText === "" ? "" : editorState;

    form.setValue("content", cleanedContent, { shouldValidate: true });
  };

  const editorContent = form.watch("content");

  const isEditFormValid =
    isUpload.thumbnail &&
    isUpload.gameFile &&
    form.watch("category")?.length > 0 &&
    form.watch("title") !== "" &&
    form.watch("content") !== "";

  const onClickEditHandler = () => {
    const formData = form.getValues() as TGameUploadInput;
    onEditHandler(formData, previousGameData?.id);
  };

  return (
    <>
      <form onSubmit={form.handleSubmit(onSubmitHandler)} className="mx-[130px]">
        <div className="flex gap-10 my-10 text-gray-300 text-body-18">
          <div className="flex flex-col gap-5 w-[760px]">
            <div className="flex flex-col gap-2">
              <div className="flex items-end gap-2 text-heading-20 text-white">
                썸네일 업로드<span className="text-body-14 text-primary-500">*필수</span>
              </div>

              <div className="flex gap-2">
                <div className="flex items-center py-4 px-4 w-full bg-gray-700 border border-solid border-white rounded-md resize-none">
                  {form.watch("thumbnail")?.length > 0 && isUpload.thumbnail
                    ? decodeURIComponent(form.watch("thumbnail")[0]?.name)
                    : "1000px*800px이하, 5mb 이하 이미지 파일"}
                </div>

                <label
                  htmlFor="gameThumbnail"
                  className={`flex justify-center items-center ${
                    isUpload.thumbnail ? "bg-primary-500" : "bg-gray-100"
                  }  text-black rounded-sm text-title-18 whitespace-nowrap cursor-pointer`}
                >
                  {isUpload.thumbnail ? <p className="px-5">수정하기</p> : <p className="px-7">업로드</p>}
                </label>

                <input
                  id="gameThumbnail"
                  type="file"
                  accept="image/*"
                  {...form.register("thumbnail", { onChange: onChangeHandler, required: "필수" })}
                  className="hidden"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex items-end gap-2 text-heading-20 text-white">
                파일업로드 <span className="text-body-14 text-primary-500">*필수</span>
              </div>

              <div className="flex gap-2">
                <div className="flex items-center py-4 px-4 w-full bg-gray-700 border border-solid border-white rounded-md resize-none">
                  {form.watch("gameFile")?.length > 0 && isUpload.gameFile
                    ? decodeURIComponent(form.watch("gameFile")[0]?.name)
                    : "200mb 이하 Zip파일로 업로드 해주세요."}
                </div>

                <label
                  htmlFor="gameFile"
                  className={`flex justify-center items-center ${
                    isUpload.gameFile ? "bg-primary-500" : "bg-gray-100"
                  } text-black rounded-sm text-title-18 whitespace-nowrap cursor-pointer`}
                >
                  {isUpload.gameFile ? <p className="px-5">수정하기</p> : <p className="px-7">업로드</p>}
                </label>

                <input
                  id="gameFile"
                  type="file"
                  accept=".zip, .7z"
                  {...form.register("gameFile", { onChange: onChangeHandler, required: "필수" })}
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
                {...form.register("title", { required: "필수" })}
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
                  control={form.control}
                  {...form.register("category", { required: "필수" })}
                  multiple={true}
                  maxCount={1}
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
                {...form.register("video")}
                className="py-4 px-4 border border-solid border-white bg-gray-700 rounded-md"
              />
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex items-end gap-2 text-heading-20 text-white">
                스틸컷 업로드<span className="text-body-14 text-alert-default">*선택</span>
              </div>

              {["First", "Second", "Third", "Fourth", "Fifth"].map((order, index) => (
                <div key={index} className="flex gap-2">
                  <div className="flex justify-end items-center py-4 px-4 w-full bg-gray-700 border border-solid border-white rounded-md resize-none">
                    {form.watch(`stillCut.${index}`)?.length > 0 && `isUpload.stillCut${order}`
                      ? decodeURIComponent(form.watch(`stillCut.${index}`)[0]?.name)
                      : "1000px*800px 5mb제한"}
                  </div>

                  <label
                    htmlFor={`stillCut${order}`}
                    className={`flex justify-center items-center ${
                      isUpload[`stillCut${order}` as keyof typeof isUpload] ? "bg-alert-default" : "bg-gray-100"
                    } text-black rounded-sm text-title-18 whitespace-nowrap cursor-pointer`}
                  >
                    {isUpload[`stillCut${order}` as keyof typeof isUpload] ? (
                      <p className="px-5">수정하기</p>
                    ) : (
                      <p className="px-7">업로드</p>
                    )}
                  </label>

                  <input
                    id={`stillCut${order}`}
                    type="file"
                    accept="image/*"
                    {...form.register(`stillCut.${index}`, { onChange: onChangeHandler })}
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
          />
        </div>

        {!isEditMode && note[1] && note[2] && note[3] && form.formState.isValid ? (
          <button
            onClick={modalConfig.onClickModalToggleHandlers[modalConfig.GAME_UPLOAD_CHECK_ID]}
            type="button"
            className={`mb-10 w-full h-14 text-title-18 text-primary-950 bg-primary-500 rounded-lg`}
          >
            승인요청
          </button>
        ) : isEditMode && isEditFormValid ? (
          <button
            onClick={() => onClickEditHandler()}
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

      {modalConfig.noActionModalData && (
        <SpartaReactionModal
          isOpen={modalConfig.modalToggles[modalConfig.NO_ACTION_MODAL_ID]}
          onClose={modalConfig.onClickModalToggleHandlers[modalConfig.NO_ACTION_MODAL_ID]}
          modalId={modalConfig.NO_ACTION_MODAL_ID}
          title={modalConfig.noActionModalData.title || ""}
          content={modalConfig.noActionModalData.content || ""}
          btn1={{
            text: modalConfig.noActionModalData?.btn1?.text || "",
            onClick: modalConfig.noActionModalData?.btn1?.onClick || (() => {}),
          }}
          type={modalConfig.noActionModalData.type}
        />
      )}

      <SpartaModal
        isOpen={modalConfig.modalToggles[modalConfig.GAME_UPLOAD_CHECK_ID]}
        onClose={modalConfig.onClickModalToggleHandlers[modalConfig.GAME_UPLOAD_CHECK_ID]}
        modalId={modalConfig.GAME_UPLOAD_CHECK_ID}
        closeOnClickOutside={false}
      >
        <UploadCheck
          form={form}
          gameUploadResponse={gameUploadResponse}
          onSubmitHandler={onSubmitHandler}
          onClose={modalConfig.onClickModalToggleHandlers[modalConfig.GAME_UPLOAD_CHECK_ID]}
          isEditMode={isEditMode}
        />
      </SpartaModal>
    </>
  );
};

export default Form;
