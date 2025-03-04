import { useEffect } from "react";
import { extractFileName, getMimeType } from "../util/gameFileParser";
import { UseFormReset, UseFormSetValue, UseFormTrigger } from "react-hook-form";
import { TGamePlayData, TGameUploadInput } from "../types";

type Props = {
  previousGameData: TGamePlayData | undefined;
  isEditMode: boolean;
  setValue: UseFormSetValue<TGameUploadInput>;
  trigger: UseFormTrigger<TGameUploadInput>;
  reset: UseFormReset<TGameUploadInput>;
};

export const useGameEditSetValue = ({ previousGameData, isEditMode, setValue, reset }: Props) => {
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
        ? extractFileName("stillCut", dataUrl)
        : "";

    const ext = dataUrl.split(".").pop();
    const mimeType = getMimeType(ext);

    try {
      const response = await fetch(dataUrl);
      const blob = await response.blob();
      const file = new File([blob], decodeURIComponent(orginalContentName as string), { type: mimeType });

      if (contentType === "stillCut" && index !== undefined) {
        const fieldName = `stillCut.${index}` as keyof TGameUploadInput;
        setValue(fieldName, [file]);
      } else {
        setValue(contentType, [file]);
      }
    } catch (err) {
      console.error("파일 변환 오류:", err);
    }
  };

  useEffect(() => {
    if (previousGameData && isEditMode) {
      changeUrltoFile("thumbnail", previousGameData.thumbnail);
      changeUrltoFile("gameFile", previousGameData.gamefile);

      previousGameData.screenshot.forEach((image, index) => {
        changeUrltoFile("stillCut", image.src, index);
      });

      setValue("title", previousGameData.title);
      setValue("category", previousGameData.category[0].name);
      setValue("content", previousGameData.content);
      setValue("video", previousGameData.youtube_url);
    } else {
      reset();
    }
  }, [previousGameData, isEditMode]);
};

export default useGameEditSetValue;
