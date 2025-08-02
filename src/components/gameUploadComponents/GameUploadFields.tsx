import { Control, useFormContext, UseFormRegister, UseFormWatch } from "react-hook-form";
import { GAME_CATEGORY } from "../../constant/constant";
import SpartaChipSelect from "../../spartaDesignSystem/SpartaChipSelect";
import { TGamePlayData, TGameUploadInput } from "../../types";
import { ChangeEvent } from "react";
import { extractFileName } from "../../util/extractFileName";

type Props = {
  isUploading: boolean;
  onChangeFileHandler: (e: ChangeEvent<HTMLInputElement>) => Promise<void>;
  previousGameData: TGamePlayData | undefined;
};

const GameUploadFields = ({ isUploading, onChangeFileHandler, previousGameData }: Props) => {
  const { control, watch, register } = useFormContext<TGameUploadInput>();
  return (
    <div className="flex flex-col gap-4 w-[65%] max-w-[756px]">
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2 text-base font-semibold text-white">
          썸네일 업로드<span className="text-body-14 text-primary-500">*필수</span>
        </div>

        <div className="flex gap-2">
          <div className="py-3 px-4 w-full h-[47px] bg-gray-700 border border-solid border-white rounded-md resize-none whitespace-nowrap overflow-hidden text-ellipsis text-base">
            {watch("thumbnail")?.length > 0
              ? watch("thumbnail")[0]?.name
              : previousGameData?.thumbnail
              ? extractFileName("thumbnail", previousGameData?.thumbnail)
              : "1000px*800px이하의 이미지 파일을 권장합니다."}
          </div>

          <label
            htmlFor="gameThumbnail"
            className={`flex justify-center items-center ${
              watch("thumbnail")?.length > 0 || previousGameData?.thumbnail ? "bg-primary-500" : "bg-gray-100"
            }  text-black rounded-sm text-title-16 font-bold whitespace-nowrap cursor-pointer`}
          >
            {watch("thumbnail")?.length > 0 || previousGameData?.thumbnail ? (
              <p className="px-5">수정하기</p>
            ) : (
              <p className="px-7">업로드</p>
            )}
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
        <div className="flex items-center gap-2 text-base font-semibold text-white">
          파일업로드 <span className="text-body-14 text-primary-500">*필수</span>
        </div>

        <div className="flex gap-2">
          <div className="py-3 px-4 w-full h-[47px] bg-gray-700 border border-solid border-white rounded-md resize-none whitespace-nowrap overflow-hidden text-ellipsis text-base">
            {!watch("gameFile")
              ? "파일을 불러오는 중입니다. 잠시만 기다려주세요."
              : isUploading
              ? "파일을 검사중입니다."
              : watch("gameFile")?.length > 0
              ? (watch("gameFile")[0] as File)?.name
              : previousGameData?.gamefile
              ? decodeURIComponent(extractFileName("gameFile", previousGameData?.gamefile)!)
              : "500mb 이하 Zip파일로 업로드 해주세요."}
          </div>

          <label
            htmlFor="gameFile"
            className={`flex justify-center items-center ${
              (!isUploading && watch("gameFile")?.length > 0) || previousGameData?.gamefile
                ? "bg-primary-500"
                : "bg-gray-100"
            } text-black rounded-sm text-title-16 font-bold whitespace-nowrap cursor-pointer`}
          >
            {(!isUploading && watch("gameFile")?.length > 0) || previousGameData?.gamefile ? (
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
        <div className="flex items-center gap-2 text-base font-semibold text-white">
          제목 <span className="text-body-14 text-primary-500">*필수</span>
        </div>

        <input
          type="text"
          placeholder="게임 제목을 입력해주세요."
          {...register("title", { required: "필수" })}
          className="py-4 px-4 w-full h-[47px] bg-gray-700 border border-solid border-white rounded-md text-base placeholder:text-gray-100"
        />
      </div>

      <div className="flex flex-col">
        <div className="flex items-center gap-2 text-base font-semibold text-white">
          장르선택 <span className="text-body-14 text-primary-500">*필수</span>
        </div>

        <div className="gameUploadSelectCustom">
          <SpartaChipSelect
            label={""}
            options={GAME_CATEGORY}
            control={control}
            {...register("category", { required: "필수" })}
            placeHolderText={"장르를 선택해주세요."}
          />
        </div>
      </div>
    </div>
  );
};

export default GameUploadFields;
