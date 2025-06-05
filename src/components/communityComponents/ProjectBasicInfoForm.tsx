import { forwardRef, useState } from "react";
import { Control, Controller, UseFormRegister, UseFormSetValue, UseFormTrigger, UseFormWatch } from "react-hook-form";

import SpartaChipSelect from "../../spartaDesignSystem/SpartaChipSelect";
import SpartaTextField from "../../spartaDesignSystem/SpartaTextField";
import SpartaButton from "../../spartaDesignSystem/SpartaButton";
import SpartaCheckBox from "../../spartaDesignSystem/SpartaCheckBox";
import SpartaRadioGroup from "../../spartaDesignSystem/SpartaRadioGroup";

import { getFormattedDate } from "../../util/getFormattedDate";
import { USER_TECH } from "../../constant/constant";
import { TProjectRecruitForm } from "../../types";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import calendar from "../../assets/common/calender.svg";

type Props = {
  control: Control<TProjectRecruitForm>;
  watch: UseFormWatch<TProjectRecruitForm>;
  setValue: UseFormSetValue<TProjectRecruitForm>;
  register: UseFormRegister<TProjectRecruitForm>;
  trigger: UseFormTrigger<TProjectRecruitForm>;
};
export default function ProjectBasicInfoForm({ control, watch, setValue, register, trigger }: Props) {
  const [selectBasicImage, setSelectBasicImage] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  const imageWatch = watch("image");

  const onClickUploadImage = () => {
    document.getElementById("project-image")?.click();
  };

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
  return (
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
  );
}
