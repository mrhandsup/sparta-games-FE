import CloseCircle from "../../assets/CloseCircle";
import { GAME_CATEGORY } from "../../constant/constant";
import SpartaChipSelect from "../../spartaDesignSystem/SpartaChipSelect";

import { TGameUploadInput, TGameUploadInputForm } from "../../types";
import { SubmitHandler } from "react-hook-form";

import "./Form.css";
import { useEffect } from "react";

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
  previewStillCut: string[];
  onChangeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClickHandler: (type: "thumbnail" | "stillCut", arg: number) => void;
  onSubmitHandler: SubmitHandler<TGameUploadInput>;
};

const Form = ({ form, note, isUpload, previewStillCut, onChangeHandler, onClickHandler, onSubmitHandler }: Props) => {
  return (
    <form onSubmit={form.handleSubmit(onSubmitHandler)} className="mx-[130px]">
      <div className="flex gap-10 my-10 text-gray-300 text-body-18">
        <div className="w-[760px]">
          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <div className="flex items-end gap-2 text-heading-20 text-white">
                썸네일 업로드<span className="text-body-14 text-alert-default">*선택</span>
              </div>
              <div className="flex gap-4">
                <div className="flex items-center py-4 px-4 w-full bg-gray-700 border border-solid border-white rounded-md resize-none">
                  {form.watch("thumbnail")?.length > 0
                    ? form.watch("thumbnail")[0]?.name
                    : "1000px*800px이하, 5mb 이하 사진파일"}
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
                  {...form.register("thumbnail", { onChange: onChangeHandler })}
                  className="hidden"
                />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex items-end gap-2 text-heading-20 text-white">
                파일업로드 <span className="text-body-14 text-primary-500">*필수</span>
              </div>
              <div className="flex gap-4">
                <div className="flex items-center py-4 px-4 w-full bg-gray-700 border border-solid border-white rounded-md resize-none">
                  {form.watch("gameFile")?.length > 0
                    ? form.watch("gameFile")[0]?.name
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

              <div className="GameUploadSelectCustom">
                <SpartaChipSelect
                  label={""}
                  options={GAME_CATEGORY}
                  control={form.control}
                  {...form.register("category", { required: "필수" })}
                  multiple={true}
                  maxCount={3}
                />
              </div>
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
          {/* 추후 변경되는 시안에 따라 디자인 수정 예정 */}
          <div className="flex flex-col gap-2">
            <div className="flex items-end gap-2 text-heading-20 text-white">
              스틸컷 업로드<span className="text-body-14 text-alert-default">*선택</span>
            </div>
            <p className="text-body-14">1000px*800px이하, 5mb이하 사진파일</p>
            <div className="flex flex-col items-center gap-3 pt-3 max-h-[220px] border border-solid border-white rounded-md overflow-scroll scrollbar-hide">
              <label
                htmlFor="stillCut"
                className={`py-4 whitespace-nowrap text-title-18 ${
                  isUpload.stillCut ? "bg-primary-500" : "bg-gray-100"
                } text-black rounded-sm cursor-pointer`}
              >
                <p className="px-7">업로드</p>
              </label>
              {previewStillCut && (
                <div className="grid grid-cols-2 gap-4 w-full">
                  {previewStillCut.map((item, idx) => (
                    <div key={idx} className="relative">
                      <img
                        src={item}
                        alt="썸썸네일 미리보기"
                        className="w-full object-cover border border-solid border-black"
                      />
                      <div
                        onClick={() => onClickHandler("stillCut", idx)}
                        className="absolute top-0 right-0 cursor-pointer"
                      >
                        <CloseCircle size={30} color={"#FFCB5C"} />
                      </div>
                    </div>
                  ))}
                </div>
              )}
              <input
                id="stillCut"
                type="file"
                accept="image/*"
                multiple
                {...form.register("stillCut", { onChange: onChangeHandler })}
                className="hidden"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-[10px] mb-8">
        <div className="flex items-end gap-2 text-heading-20 text-white">
          게임설명 <p className="text-body-14 text-primary-500">*필수</p>
        </div>
        <textarea
          placeholder="게임 설명을 입력해주세요"
          {...form.register("content", { required: "필수" })}
          className="p-4 w-full h-[436px] bg-gray-700 border border-solid border-white rounded-md resize-none text-gray-100"
        />
      </div>
      {!(note[1] && note[2] && note[3]) || !form.formState.isValid ? (
        <button
          type="submit"
          disabled={true}
          className={`mb-10 w-full h-14 text-title-18 text-gray-900 bg-gray-400 rounded-lg`}
        >
          필수 값을 입력한 후 승인요청을 할 수 있습니다.
        </button>
      ) : (
        <button type="submit" className={`mb-10 w-full h-14 text-title-18 text-primary-950 bg-primary-500 rounded-lg`}>
          승인요청
        </button>
      )}
    </form>
  );
};

export default Form;
