import { useForm } from "react-hook-form";
import recruitImage from "../../assets/gameDetail/ReviewEdit.svg";
import { USER_TECH } from "../../constant/constant";
import SpartaChipSelect from "../../spartaDesignSystem/SpartaChipSelect";
import SpartaTextField from "../../spartaDesignSystem/SpartaTextField";

import calendar from "../../assets/common/calender.svg";

export default function ProjectRecruitForm() {
  const {
    register,
    watch,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  return (
    <div className="mx-auto mt-16">
      <div className="flex items-center justify-center gap-4">
        <img src={recruitImage} />
        <p className="font-DungGeunMo text-[24px] text-white">프로젝트를 같이 만들 팀원을 구해요</p>
      </div>
      <div className="w-[1180px] mx-auto">
        <div className="w-full mt-10 mb-6 p-9 bg-gray-800 rounded-xl">
          <p className="font-DungGeunMo text-xl text-primary-400">프로젝트 정보 작성</p>

          <div className="flex mt-5">
            <div className="flex flex-col gap-4 w-full">
              <SpartaChipSelect label="구하는 포지션" options={USER_TECH} control={control} name="" />

              <div className=" items-center gap-2">
                <SpartaTextField
                  label="마감기한"
                  type="medium"
                  register={register("calendar", { required: true })}
                  inputProps={{
                    placeholder: "마감기한을 선택해주세요.",
                  }}
                  rightIcon={calendar}
                  onRightIconClick={() => console.log("달력 열기")}
                />
              </div>
              <div className="flex gap-[74px]">
                <p className="text-white text-sm">마감기한</p>
                <span className="text-white">2025-05-30</span>
              </div>

              <div className="flex gap-[74px]">
                <p className="text-white text-sm">연락방법</p>
                <span className="w-[200px] truncate text-white underline">http://kakaotalk.12345678.12345678</span>
              </div>
            </div>
          </div>

          <p className="mt-10 font-DungGeunMo text-xl text-primary-400">상세내용</p>
          <hr className="border-t border-gray-400 my-3" />
          <p className="text-sm text-gray-100 leading-5">
            안녕하세요 이런 프로젝트를 하려고 합니다. <br />
            프로젝트의 게임 분야 (FPS, RPG 등)
            <br />
            프로젝트를 시작하게 된 배경
            <br />
            프로젝트의 목표
            <br />
            프로젝트에 할애할 수 있는 시간
            <br />
            그동안 나의 경험과 강점 (다른 프로젝트를 해봤어요, 열정이 넘쳐요 등) <br />
            우리 팀의 분위기와 강점 (이미 합류한 팀원이 있다면 적어주세요.) <br />
            프로젝트 관련 주의사항 00개월 동안 같이 참여할 00팀원을 구합니다. 연락주세요.
            <br />
            00개월 동안 같이 참여할 00팀원을 구합니다.
            <br />
            연락주세요.
          </p>
        </div>
      </div>
    </div>
  );
}
