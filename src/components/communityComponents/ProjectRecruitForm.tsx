import { useForm } from "react-hook-form";
import DatePicker from "react-datepicker";
import { forwardRef, useRef, useState } from "react";

import { USER_TECH } from "../../constant/constant";
import SpartaChipSelect from "../../spartaDesignSystem/SpartaChipSelect";
import SpartaTextField from "../../spartaDesignSystem/SpartaTextField";

import recruitImage from "../../assets/gameDetail/ReviewEdit.svg";
import calendar from "../../assets/common/calender.svg";

import "react-datepicker/dist/react-datepicker.css";
import SpartaButton from "../../spartaDesignSystem/SpartaButton";
import SpartaCheckBox from "../../spartaDesignSystem/SpartaCheckBox";
import SpartaRadioGroup from "../../spartaDesignSystem/SpartaRadioGroup";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

export default function ProjectRecruitForm() {
  const {
    register,
    watch,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm();

  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [isChecked, setIsChecked] = useState(false);
  const hiddenFileInput = useRef<HTMLInputElement>(null);

  const handleToggle = () => {
    setIsChecked((prev) => !prev);
  };

  const CustomInput = forwardRef(({ value, onClick }, ref) => (
    <SpartaTextField
      label="마감기한"
      type="small"
      inputProps={{
        placeholder: "마감기한을 선택해주세요.",
        readOnly: true,
        value,
      }}
      rightIcon={calendar}
      onRightIconClick={onClick} // 달력 열기
    />
  ));

  const onClickUploadImage = () => {
    hiddenFileInput.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      console.log("선택된 파일:", files[0]);
      // 파일 처리 로직
    }
  };
  const optionsPurpose = [
    { label: "포트폴리오", value: "portfolio" },
    { label: "공모전", value: "contest" },
    { label: "스터디", value: "study" },
    { label: "상용화", value: "commercial" },
  ];
  const optionsPeriod = [
    { label: "3개월 이내", value: "3months" },
    { label: "6개월 이내", value: "6months" },
    { label: "1년 이내", value: "1year" },
    { label: "1년 이상", value: "moreThan1year" },
  ];

  const optionsMethod = [
    { label: "온라인", value: "online" },
    { label: "오프라인", value: "offline" },
    { label: "둘 다 가능", value: "both" },
  ];

  const [period, setPeriod] = useState("3months");
  const [method, setMethod] = useState("online");
  const [purpose, setPurpose] = useState("portfolio");

  const editorContent = watch("content");

  const handleEditorChange = (editorState: string) => {
    // react-quill 내용 작성 중, 내용 모두 지울 경우 생기는 <p></br></p> 태그 제거
    const plainText = editorState.replace(/<(.|\n)*?>/g, "").trim();

    // 내용이 없을 경우 빈 문자열로 설정해서 isValid가 false가 되도록 함s
    const cleanedContent = plainText === "" ? "" : editorState;

    setValue("content", cleanedContent, { shouldValidate: true });
  };

  return (
    <div className="mx-auto mt-16">
      <div className="flex items-center justify-center gap-4">
        <img src={recruitImage} />
        <p className="font-DungGeunMo text-[24px] text-white">프로젝트를 같이 만들 팀원을 구해요</p>
      </div>
      <div className="w-[1180px] mx-auto">
        <div className="w-full mt-10 mb-6 p-9 bg-gray-800 rounded-xl">
          <p className="font-DungGeunMo text-xl text-primary-400">프로젝트 정보 작성</p>

          <div className="flex gap-10 mt-5">
            <div className="flex flex-col gap-4 basis-1/2">
              <SpartaChipSelect label="구하는 포지션" options={USER_TECH} control={control} name="" />

              <DatePicker
                showPopperArrow={false}
                selected={selectedDate}
                onChange={(date) => setSelectedDate(date)}
                customInput={<CustomInput />}
                popperPlacement="bottom-end"
                portalId="datepicker-portal"
              />

              <SpartaTextField
                label="연락방법"
                type="small"
                inputProps={{
                  placeholder: "디스코드, 카카오톡 등 링크를 입력해주세요.",
                }}
              />

              <div>
                <SpartaTextField
                  label="프로젝트 이미지"
                  type="small"
                  inputProps={{
                    placeholder: "1000px*800px 5mb 이하 사진파일",
                    readOnly: true,
                  }}
                  btnContent={
                    <SpartaButton
                      content="업로드"
                      type="filled"
                      colorType="grey"
                      size="medium"
                      onClick={onClickUploadImage}
                    />
                  }
                />
                <input
                  type="file"
                  style={{ display: "none" }}
                  ref={hiddenFileInput}
                  onChange={handleFileChange}
                  accept="image/*"
                />
                <div className="flex items-center gap-2 mt-3">
                  <SpartaCheckBox checked={isChecked} onToggle={handleToggle} />
                  <p className=" text-md text-gray-50">스파르타 기본 이미지 사용</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-4 basis-1/2">
              <SpartaRadioGroup
                label="프로젝트 목적"
                size="small"
                colorType="grey"
                width="w-[120px] h-[50px]"
                name="projectPurpose"
                options={optionsPurpose}
                value={purpose}
                onChange={setPurpose}
              />
              <SpartaRadioGroup
                label="프로젝트 기간"
                size="small"
                colorType="grey"
                width="w-[120px] h-[50px]"
                name="projectPeriod"
                options={optionsPeriod}
                value={period}
                onChange={setPeriod}
              />
              <SpartaRadioGroup
                label="진행방식"
                size="small"
                colorType="grey"
                width="w-[120px] h-[50px]"
                name="progressMethod"
                options={optionsMethod}
                value={method}
                onChange={setMethod}
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

        <SpartaButton content="글 등록하기" type="filled" />
      </div>
    </div>
  );
}
