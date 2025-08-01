import { FormState, UseFormRegister, UseFormWatch } from "react-hook-form";
import { TGamePlayData, TGameUploadInput } from "../../types";
import { ChangeEvent } from "react";
import { extractFileName } from "../../util/extractFileName";

type Props = {
  watch: UseFormWatch<TGameUploadInput>;
  register: UseFormRegister<TGameUploadInput>;
  formState: FormState<TGameUploadInput>;
  onChangeFileHandler: (e: ChangeEvent<HTMLInputElement>) => Promise<void>;
  previousGameData: TGamePlayData | undefined;
};

const GameMediaFields = ({ watch, register, formState, onChangeFileHandler, previousGameData }: Props) => {
  return (
    <div className="flex flex-col gap-[26px] w-[33%]">
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-1 text-base font-semibold text-white">
          플레이 영상<span className="text-body-14 text-alert-default">*선택</span>
        </div>

        <input
          type="text"
          placeholder="유튜브에서 전체/일부공개 설정 후 링크 삽입"
          {...register("video", {
            validate: (value) => {
              if (!value) return true;

              if (!/^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+$/.test(value)) {
                return "올바른 유튜브 링크를 입력해 주세요";
              }
            },
          })}
          className="py-4 px-4 h-[47px] border border-solid border-white bg-gray-700 rounded-md text-base placeholder:text-gray-100"
        />
        {formState.errors.video && <p className="text-red-500 text-base font-bold">{formState.errors.video.message}</p>}
      </div>

      <div className="flex flex-col gap-1.5">
        <div className="flex items-center gap-1 text-base font-semibold text-white">
          스틸컷 업로드<span className="text-body-14 text-alert-default">*선택</span>
        </div>

        {Array.from({ length: 5 }, (_, index) => (
          <div key={index} className="flex gap-2">
            <div className="py-3 px-4 w-full h-[47px] bg-gray-700 border border-solid border-white rounded-md resize-none whitespace-nowrap overflow-hidden text-ellipsis text-base">
              {watch(`stillCut.${index}`)?.length > 0
                ? decodeURIComponent(watch(`stillCut.${index}`)[0]?.name)
                : previousGameData?.screenshot[index]
                ? extractFileName("stillCut", previousGameData?.screenshot[index]?.src)
                : "1000px*800px이하 파일 권장"}
            </div>

            <label
              htmlFor={`stillCut${index}`}
              className={`flex justify-center items-center ${
                previousGameData?.screenshot[index] || watch(`stillCut.${index}`)?.length > 0
                  ? "bg-alert-default"
                  : "bg-gray-100"
              } text-black rounded-sm text-title-16 font-bold whitespace-nowrap cursor-pointer`}
            >
              {previousGameData?.screenshot[index] || watch(`stillCut.${index}`)?.length > 0 ? (
                <p className="px-5">수정하기</p>
              ) : (
                <p className="px-7">업로드</p>
              )}
            </label>

            <input
              id={`stillCut${index}`}
              type="file"
              accept="image/*"
              {...register(`stillCut.${index}`, { onChange: onChangeFileHandler })}
              className="hidden"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default GameMediaFields;
