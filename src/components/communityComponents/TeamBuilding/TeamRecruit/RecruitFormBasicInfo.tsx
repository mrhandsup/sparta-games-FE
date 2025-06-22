import { forwardRef, useState } from "react";
import { Control, Controller, FormState, UseFormRegister, UseFormSetValue, UseFormWatch } from "react-hook-form";

import SpartaChipSelect from "../../../../spartaDesignSystem/SpartaChipSelect";
import SpartaTextField from "../../../../spartaDesignSystem/SpartaTextField";
import SpartaButton from "../../../../spartaDesignSystem/SpartaButton";
import SpartaCheckBox from "../../../../spartaDesignSystem/SpartaCheckBox";
import SpartaRadioGroup from "../../../../spartaDesignSystem/SpartaRadioGroup";

import { getFormattedDate } from "../../../../util/getFormattedDate";
import { ROLE_CHOICES } from "../../../../constant/constant";
import { TProjectRecruitForm } from "../../../../types";

import DatePicker from "react-datepicker";
import { ko } from "date-fns/locale";
import { format, startOfDay, isBefore } from "date-fns";
import "react-datepicker/dist/react-datepicker.css";
import "./reactDatePickerCustomStyle.css";

import calendar from "../../../../assets/common/calender.svg";

type Props = {
  control: Control<TProjectRecruitForm>;
  watch: UseFormWatch<TProjectRecruitForm>;
  setValue: UseFormSetValue<TProjectRecruitForm>;
  register: UseFormRegister<TProjectRecruitForm>;
  formState: FormState<TProjectRecruitForm>;
  thumbnail: string | undefined;
};
export default function RecruitFormBasicInfo({ control, watch, setValue, register, formState, thumbnail }: Props) {
  const imageWatch = watch("thumbnail");
  const isBasicThumbnail = thumbnail?.includes("default");

  const [selectBasicImage, setSelectBasicImage] = useState(isBasicThumbnail);
  const [isChecked, setIsChecked] = useState(isBasicThumbnail);

  const onClickUploadImage = () => {
    document.getElementById("project-image")?.click();
  };

  const onClickSelectBasicImage = () => {
    setIsChecked((prev) => !prev);
    setSelectBasicImage((prev) => !prev);
  };

  const thumbnailPlaceHolder = isBasicThumbnail
    ? "기본 이미지로 업로드 하셨습니다."
    : thumbnail
    ? thumbnail.split("/").pop()
    : typeof watch("thumbnail") !== "string" && imageWatch?.length > 0
    ? (imageWatch[0] as File).name
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
        <div className="flex flex-col gap-4 basis-1/2">
          <SpartaChipSelect
            label="구하는 포지션"
            options={ROLE_CHOICES}
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
                message: "유효한 링크를 입력해주세요.",
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
                colorType={typeof watch("thumbnail") !== "string" && imageWatch?.length > 0 ? "primary" : "grey"}
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
            {...register("thumbnail", { required: !selectBasicImage ? "프로젝트 이미지를 업로드해주세요." : false })}
            className="hidden"
          />

          <div className="flex items-center gap-2 mt-3">
            <SpartaCheckBox checked={isChecked} onClick={onClickSelectBasicImage} />
            <p className=" text-md text-gray-50">스파르타 기본 이미지 사용</p>
          </div>
        </div>

        <div className="flex flex-col gap-4 basis-1/2">
          <SpartaRadioGroup
            groupsToShow={["purpose", "duration", "meeting_type"]}
            control={control}
            watch={watch}
            setValue={setValue}
          />
        </div>
      </div>
    </div>
  );
}
