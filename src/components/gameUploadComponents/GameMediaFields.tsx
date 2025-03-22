import { FormState, UseFormRegister, UseFormWatch } from "react-hook-form";
import { TGameUploadInput } from "../../types";
import { ChangeEvent } from "react";

type Props = {
  watch: UseFormWatch<TGameUploadInput>;
  register: UseFormRegister<TGameUploadInput>;
  formState: FormState<TGameUploadInput>;
  onChangeFileHandler: (e: ChangeEvent<HTMLInputElement>) => Promise<void>;
};

const GameMediaFields = ({ watch, register, formState, onChangeFileHandler }: Props) => {
  return (
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
        {formState.errors.video && <p className="text-red-500 text-base font-bold">{formState.errors.video.message}</p>}
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
  );
};

export default GameMediaFields;
