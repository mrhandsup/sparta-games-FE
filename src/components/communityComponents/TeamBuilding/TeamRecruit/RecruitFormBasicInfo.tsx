import { forwardRef, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";

import SpartaChipSelect from "../../../../spartaDesignSystem/SpartaChipSelect";
import SpartaTextField from "../../../../spartaDesignSystem/SpartaTextField";
import SpartaButton from "../../../../spartaDesignSystem/SpartaButton";
import SpartaCheckBox from "../../../../spartaDesignSystem/SpartaCheckBox";
import SpartaRadioGroup from "../../../../spartaDesignSystem/SpartaRadioGroup";

import { getFormattedDate } from "../../../../util/getFormattedDate";

import { TProjectRecruitForm, TTeamBuildPostDetail } from "../../../../types";

import DatePicker from "react-datepicker";
import { ko } from "date-fns/locale";
import { format, startOfDay, isBefore } from "date-fns";
import "react-datepicker/dist/react-datepicker.css";
import "./reactDatePickerCustomStyle.css";

import { useTeamBuildRadioOptions } from "../../../../hook/useTeamBuildRadioOptions ";
import { useRoleOptions } from "../../../../hook/useRoleOptions";

import calendar from "../../../../assets/common/calender.svg";

type Props = {
  postDetail: TTeamBuildPostDetail;
};
export default function RecruitFormBasicInfo({ postDetail }: Props) {
  const { control, watch, setValue, register, formState, trigger } = useFormContext<TProjectRecruitForm>();

  const imageWatch = watch("thumbnail");

  const [selectBasicImage, setSelectBasicImage] = useState(postDetail?.thumbnail_basic);
  const [isChecked, setIsChecked] = useState(postDetail?.thumbnail_basic);

  const { radioGroupsData } = useTeamBuildRadioOptions();
  const { roleOptions } = useRoleOptions();

  const onClickUploadImage = () => {
    document.getElementById("project-image")?.click();
  };

  const onClickSelectBasicImage = () => {
    setIsChecked((prev) => !prev);
    setSelectBasicImage((prev) => !prev);

    setValue("thumbnail_basic", "default");
    setValue("thumbnail", "");
    trigger("thumbnail"); // 필수!
  };

  const thumbnailWatch = watch("thumbnail");
  const thumbnailPlaceHolder = selectBasicImage // 기본 이미지 체크 시
    ? "기본 이미지 업로드를 선택하셨습니다."
    : thumbnailWatch && typeof thumbnailWatch !== "string" && thumbnailWatch.length > 0 // 새로 업로드한 파일 있을 경우
    ? (thumbnailWatch[0] as File).name
    : postDetail?.thumbnail_basic // 기존 기본 이미지 사용
    ? "기본 이미지 업로드를 선택하셨습니다."
    : postDetail?.thumbnail // 기존 일반 이미지 사용
    ? postDetail.thumbnail.split("/").pop()
    : "1000px*800px 5mb 이하 사진파일";

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

  return (
    <div className="w-full mt-10 mb-6 p-9 bg-gray-800 rounded-xl">
      <p className="font-DungGeunMo text-xl text-primary-400">프로젝트 정보 작성</p>

      <div className="flex gap-10 mt-5">
        <div className="flex flex-col gap-5 basis-1/2">
          <SpartaChipSelect
            label="구하는 포지션"
            options={roleOptions}
            control={control}
            rules={{ required: "포지션을 선택해주세요" }}
            name="want_roles"
            placeHolderText="구하는 포지션을 선택해주세요."
            multiple
          />

          <Controller
            name="deadline"
            control={control}
            rules={{ required: "날짜를 선택해주세요" }}
            render={({ field: { onChange, value, ref } }) => (
              <DatePicker
                selected={value}
                onChange={(date) => {
                  const formattedDate = date ? format(date, "yyyy-MM-dd") : "";
                  onChange(formattedDate);
                }}
                customInput={<CustomInput ref={ref} value={value} />}
                minDate={new Date()}
                dayClassName={(date) => {
                  const today = startOfDay(new Date());
                  if (isBefore(date, today)) {
                    return "text-gray-400 cursor-not-allowed";
                  }
                  return "";
                }}
                locale={ko}
                showPopperArrow={false}
                popperPlacement="bottom-end"
                portalId="datepicker-portal"
              />
            )}
          />

          <SpartaTextField
            label="연락방법"
            type="small"
            register={register("contact", {
              required: "연락방법을 입력해주세요.",
              pattern: {
                value: /^(https?:\/\/)?([\w-])+\.([a-zA-Z]{2,63})([/\w.-]*)*\/?$/,
                message: "올바른 링크를 입력해주세요.",
              },
            })}
            inputProps={{
              placeholder: "디스코드, 카카오톡 등 링크를 입력해주세요.",
            }}
            subLabel={{
              default: "",
              error: formState.errors.contact?.message as string,
              pass: "",
            }}
            error={!!formState.errors.contact}
          />

          <div className="flex flex-col gap-2">
            <SpartaTextField
              label="프로젝트 이미지"
              type="small"
              inputProps={{
                placeholder: thumbnailPlaceHolder,
                readOnly: true,
              }}
              btnContent={
                <SpartaButton
                  content="업로드"
                  disabled={selectBasicImage}
                  type="filled"
                  colorType={
                    (typeof imageWatch === "string" && imageWatch.trim().length > 0) ||
                    (imageWatch && typeof imageWatch !== "string" && imageWatch.length > 0)
                      ? "primary"
                      : "grey"
                  }
                  size="small"
                  btnType="button"
                  onClick={onClickUploadImage}
                  customStyle="w-full rounded-sm"
                />
              }
            />

            <input
              id="project-image"
              type="file"
              accept="image/*"
              {...register("thumbnail", {
                validate: (value) => {
                  if (selectBasicImage) return true;

                  if (value && value.length > 0) return true;

                  return "프로젝트 이미지를 업로드해주세요.";
                },
              })}
              className="hidden"
            />

            <div className="flex items-center gap-2">
              <SpartaCheckBox checked={isChecked} onClick={onClickSelectBasicImage} customStyle={"w-4 h-4"} />
              <p className=" text-sm text-gray-50">스파르타 기본 이미지 사용</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-5 basis-1/2">
          <SpartaRadioGroup
            groupsToShow={["purpose", "duration", "meeting_type"]}
            control={control}
            watch={watch}
            setValue={setValue}
            radioGroupsData={radioGroupsData}
          />
        </div>
      </div>
    </div>
  );
}
