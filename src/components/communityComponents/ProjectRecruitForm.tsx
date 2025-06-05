import { forwardRef, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";

import SpartaChipSelect from "../../spartaDesignSystem/SpartaChipSelect";
import SpartaTextField from "../../spartaDesignSystem/SpartaTextField";
import SpartaButton from "../../spartaDesignSystem/SpartaButton";
import SpartaCheckBox from "../../spartaDesignSystem/SpartaCheckBox";
import SpartaRadioGroup from "../../spartaDesignSystem/SpartaRadioGroup";

import { getFormattedDate } from "../../util/getFormattedDate";
import { USER_TECH } from "../../constant/constant";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

import type { TProjectRecruitForm } from "../../types";

import recruitImage from "../../assets/gameDetail/ReviewEdit.svg";
import calendar from "../../assets/common/calender.svg";
import defaultProfile from "../../assets/common/defaultProfile.svg";

export default function ProjectRecruitForm() {
  const { register, watch, handleSubmit, control, setValue, formState, trigger } = useForm<TProjectRecruitForm>({
    mode: "onChange",
  });
  const imageWatch = watch("image");

  const [isChecked, setIsChecked] = useState(false);
  const [selectBasicImage, setSelectBasicImage] = useState(false);

  const onClickSelectBasicImage = () => {
    setIsChecked((prev) => !prev);
    setSelectBasicImage((prev) => !prev);
    setValue("image", "defaultImage");
    trigger();
  };

  const CustomInput = forwardRef<HTMLInputElement, { value?: Date | string | null; onClick?: () => void }>(
    ({ value, onClick }, ref) => (
      <SpartaTextField
        label="마감기한"
        type="small"
        inputProps={{
          placeholder: "마감기한을 선택해주세요.",
          readOnly: true,
          value: value ? getFormattedDate(value) : "",
        }}
        rightIcon={calendar}
        onRightIconClick={onClick} // 달력 열기
      />
    ),
  );

  const onClickUploadImage = () => {
    document.getElementById("project-image")?.click();
  };

  const editorContent = watch("content");

  useEffect(() => {
    register("content", {
      required: "프로젝트 내용을 입력해주세요.",
    });
  }, [register]);

  const handleEditorChange = (content: string) => {
    // react-quill 내용 작성 중, 내용 모두 지울 경우 생기는 <p></br></p> 태그 제거
    const plainText = content.replace(/<(.|\n)*?>/g, "").trim();

    // 내용이 없을 경우 빈 문자열로 설정해서 isValid가 false가 되도록 함
    const cleanedContent = plainText === "" ? "" : content;

    setValue("content", cleanedContent, { shouldValidate: true });
  };

  const onSubmit = (data: any) => {
    console.log("제출된 데이터:", data);
  };

  useEffect(() => {
    console.log("폼 유효성 상태:", formState.isValid);
  }, [formState.isValid]);

  console.log(Array.isArray(imageWatch), imageWatch?.length, typeof watch("image"));
  return (
    <div className="mx-auto mt-16">
      <div className="flex items-center justify-center gap-4">
        <img src={recruitImage} />
        <p className="font-DungGeunMo text-[24px] text-white">프로젝트를 같이 만들 팀원을 구해요</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="w-[1180px] mx-auto">
          <div className="w-full mt-10 mb-6 p-9 bg-gray-800 rounded-xl">
            <p className="font-DungGeunMo text-xl text-primary-400">프로젝트 정보 작성</p>

            <div className="flex gap-10 mt-5">
              <div className="flex flex-col gap-4 basis-1/2">
                <SpartaChipSelect
                  label="구하는 포지션"
                  options={USER_TECH}
                  control={control}
                  rules={{ required: "포지션을 선택해주세요" }}
                  name="position"
                />

                <Controller
                  name="date"
                  control={control}
                  rules={{ required: "날짜를 선택해주세요" }}
                  render={({ field: { onChange, value, ref } }) => (
                    <DatePicker
                      selected={value}
                      onChange={(date) => onChange(date)}
                      customInput={<CustomInput ref={ref} value={value} />}
                      showPopperArrow={false}
                      popperPlacement="bottom-end"
                      portalId="datepicker-portal"
                    />
                  )}
                />

                <SpartaTextField
                  label="연락방법"
                  type="small"
                  register={register("contact", { required: "연락방법을 입력해주세요." })}
                  inputProps={{
                    placeholder: "디스코드, 카카오톡 등 링크를 입력해주세요.",
                  }}
                />

                <SpartaTextField
                  label="프로젝트 이미지"
                  type="small"
                  inputProps={{
                    placeholder:
                      typeof watch("image") !== "string" && imageWatch?.length > 0
                        ? (imageWatch[0] as File).name
                        : "1000px*800px 5mb 이하 사진파일",
                    readOnly: true,
                  }}
                  btnContent={
                    <SpartaButton
                      content="업로드"
                      disabled={selectBasicImage}
                      type="filled"
                      colorType={typeof watch("image") !== "string" && imageWatch?.length > 0 ? "primary" : "grey"}
                      size="medium"
                      btnType="button"
                      onClick={onClickUploadImage}
                    />
                  }
                />

                <input
                  id="project-image"
                  type="file"
                  accept="image/*"
                  {...register("image", { required: !selectBasicImage ? "프로젝트 이미지를 업로드해주세요." : false })}
                  className="hidden"
                />

                <div className="flex items-center gap-2 mt-3">
                  <SpartaCheckBox checked={isChecked} onClick={onClickSelectBasicImage} />
                  <p className=" text-md text-gray-50">스파르타 기본 이미지 사용</p>
                </div>
              </div>

              <div className="flex flex-col gap-4 basis-1/2">
                <SpartaRadioGroup
                  groupsToShow={["projectPurpose", "projectPeriod", "projectMethod"]}
                  control={control}
                  watch={watch}
                  setValue={setValue}
                />
              </div>
            </div>
          </div>

          <div className="w-full mt-10 mb-6 p-9 bg-gray-800 rounded-xl">
            <p className="font-DungGeunMo text-xl text-primary-400">상세내용 작성</p>

            <div className="mt-5">
              <SpartaTextField
                label="글 제목"
                type="small"
                register={register("title", { required: "프로젝트 제목을 입력해주세요." })}
                inputProps={{
                  placeholder: "핵심 내용을 간략하게 적어보세요.",
                }}
              />
            </div>

            <div className="flex flex-col gap-[10px] my-5 formContent">
              <div className="flex items-end gap-2 font-semibold text-gray-100">프로젝트 소개</div>

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
                    ["image"],
                  ],
                }}
                placeholder="프로젝트에 대해 자세히 적어주세요.&#10;예시를 참고해 작성한다면 좋은 팀원을 구할 수 있을거에요.&#10;&#10;예시)&#10;• 프로젝트의 게임 분야 (FPS, RPG 등)&#10;• 프로젝트를 시작하게 된 배경&#10;• 프로젝트의 목표&#10;• 프로젝트에 할애할 수 있는 시간&#10;• 그동안 나의 경험과 강점 (다른 프로젝트를 해봤어요, 열정이 넘쳐요 등)&#10;• 우리 팀의 분위기와 강점 (이미 합류한 팀원이 있다면 적어주세요.)&#10;• 프로젝트 관련 주의사항"
                className="text-white"
              />
            </div>
          </div>

          <SpartaButton disabled={!formState.isValid} content="글 등록하기" type="filled" />
        </div>
      </form>
    </div>
  );
}
