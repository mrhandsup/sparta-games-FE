import { Control, UseFormRegister, UseFormWatch } from "react-hook-form";
import { GAME_CATEGORY } from "../../constant/constant";
import SpartaChipSelect from "../../spartaDesignSystem/SpartaChipSelect";
import { TGamePlayData, TGameUploadInput } from "../../types";
import { ChangeEvent } from "react";

type Props = {
  watch: UseFormWatch<TGameUploadInput>;
  register: UseFormRegister<TGameUploadInput>;
  control: Control<TGameUploadInput>;
  isUploading: boolean;
  previousGameData: TGamePlayData | undefined;
  onChangeFileHandler: (e: ChangeEvent<HTMLInputElement>) => Promise<void>;
};

const GameUploadFields = ({ watch, register, control, isUploading, previousGameData, onChangeFileHandler }: Props) => {
  const extractFileName = (filePath: string | undefined, fileType: "imageFile" | "gameFile") => {
    if (!filePath) return false;

    const fileNameWithExtension = filePath.split("/").pop();

    if (!fileNameWithExtension) return false;

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
              : "500mb 이하 Zip파일로 업로드 해주세요."}
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
  );
};

export default GameUploadFields;
