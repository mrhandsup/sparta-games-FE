import CATEGORY from "../../util/constance/category";

import type { GameUploadInput, GameUploadInputForm } from "../../types";
import type { SubmitHandler } from "react-hook-form";

type Props = {
  form: GameUploadInputForm;
  note: {
    1: boolean;
    2: boolean;
    3: boolean;
  };
  onSubmitHandler: SubmitHandler<GameUploadInput>;
};

const Form = ({ form, note, onSubmitHandler }: Props) => {
  console.log(!(note[1] && note[2] && note[3]) || !form.formState.isValid);
  return (
    <form onSubmit={form.handleSubmit(onSubmitHandler)} className="mx-[130px]">
      <div className="flex gap-10 my-10 text-gray-300 text-body-22">
        <div className="flex flex-col gap-[26px] w-[760px]">
          <div className="flex flex-col gap-[10px]">
            <div className="flex items-end gap-2 text-heading-24 text-white">
              제목 <span className="text-body-14 text-primary-500">*필수</span>
            </div>
            <input
              type="text"
              placeholder="Sparta Games"
              {...form.register("title", { required: "필수" })}
              className="py-3 px-4 w-full bg-gray-700 border border-solid border-white rounded-md"
            />
          </div>
          <div className="flex flex-col gap-[10px]">
            <div className="flex items-end gap-2 text-heading-24 text-white">
              장르선택 <span className="text-body-14 text-primary-500">*필수</span>
            </div>
            <select
              {...form.register("category", { required: "필수" })}
              className="py-3 px-4 w-full bg-gray-700 border border-solid border-white rounded-md appearance-none"
            >
              <option value="">장르를 선택해주세요</option>
              {CATEGORY.map((item, idx) => (
                <option key={idx} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col gap-[10px]">
            <div className="flex items-end gap-2 text-heading-24 text-white">
              게임설명 <p className="text-body-14 text-primary-500">*필수</p>
            </div>
            <textarea
              placeholder="게임 설명을 입력해주세요"
              {...form.register("content", { required: "필수" })}
              className="py-3 px-4 w-full h-[436px] bg-gray-700 border border-solid border-white rounded-md resize-none"
            />
          </div>
          <div className="flex flex-col gap-[10px]">
            <div className="flex items-end gap-2 text-heading-24 text-white">
              게임파일 업로드 <span className="text-body-14 text-primary-500">*필수</span>
            </div>
            <div className="flex gap-4">
              <div className="flex items-center py-3 px-4 w-full bg-gray-700 border border-solid border-white rounded-md resize-none">
                게임명
              </div>
              <label
                htmlFor="gameFile"
                className="flex items-center py-3 px-6 w-24 border border-solid border-primary-500 rounded-lg text-title-18 whitespace-nowrap cursor-pointer"
              >
                업로드
              </label>
            </div>
            <input
              id="gameFile"
              type="file"
              accept=".zip, .7z"
              {...form.register("gameFile", { required: "필수" })}
              className="hidden"
            />
          </div>
        </div>

        <div className="flex flex-col gap-[26px] w-[380px]">
          <div className="flex flex-col gap-[10px]">
            <div className="flex items-end gap-2 text-heading-24 text-white">
              섬네일 업로드<span className="text-body-14">*선택</span>
            </div>
            <p className="text-body-14">
              게임 메인에 노출되는 썸네일 이미지 입니다.
              <br /> 1920*1080px (16:9) 비율의 이미지에 최적화 되어있습니다.
            </p>
            <div className="flex justify-center items-center h-[214px] border border-solid border-white rounded-md ">
              <label
                htmlFor="game-thumbnail"
                className="py-3 px-6 w-24 whitespace-nowrap text-title-18 text-primary-500 border border-solid border-primary-500 rounded-lg cursor-pointer"
              >
                업로드
              </label>
              <input
                id="game-thumbnail"
                type="file"
                accept="image/*"
                {...form.register("thumbnail")}
                className="hidden"
              />
            </div>
          </div>
          <div className="flex flex-col gap-[10px]">
            <div className="flex items-end gap-2 text-heading-24 text-white">
              스틸컷 업로드<span className="text-body-14">*선택</span>
            </div>
            <p className="text-body-14">
              게임 플레이 화면에 노출되는 이미지 입니다.
              <br /> 1920*1080px (16:9) 비율의 이미지에 최적화 되어있습니다.
            </p>
            <div className="flex justify-center items-center h-[214px] border border-solid border-white rounded-md ">
              <label
                htmlFor="still-cut"
                className="py-3 px-6 w-24 whitespace-nowrap text-title-18 text-primary-500 border border-solid border-primary-500 rounded-lg cursor-pointer"
              >
                업로드
              </label>
              <input id="still-cut" type="file" accept="image/*" {...form.register("stillCut")} className="hidden" />
            </div>
          </div>
          <div className="flex flex-col gap-[10px]">
            <div className="flex items-end gap-2 text-heading-24 text-white">
              게임영상 업로드<span className="text-body-14">*선택</span>
            </div>
            <p className="text-body-14">
              게임 소개영사 및 플레이 영상을 업로드 할 수 있습니다.
              <br /> 유튜브에서 전첵공개 또는 링크공개(일부 공개)설정 후,
              <br />
              링크를 복사, 붙여널기 해주세요
            </p>
            <input
              type="text"
              placeholder="https://youtube.com"
              {...form.register("video")}
              className="py-3 px-4 border border-solid border-white bg-gray-700 rounded-md"
            />
          </div>
        </div>
      </div>
      {!(note[1] && note[2] && note[3]) || !form.formState.isValid ? (
        <button
          type="submit"
          disabled={!(note[1] && note[2] && note[3]) || !form.formState.isValid}
          className={`mb-10 w-full h-14 text-title-18 text-primary-950 bg-gray-400 rounded-lg`}
        >
          게임승인 요청하기
        </button>
      ) : (
        <button type="submit" className={`mb-10 w-full h-14 text-title-18 text-primary-950 bg-primary-500 rounded-lg`}>
          게임승인 요청하기
        </button>
      )}
    </form>
  );
};

export default Form;
