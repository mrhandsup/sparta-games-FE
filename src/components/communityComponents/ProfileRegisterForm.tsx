import { useState } from "react";
import { useForm } from "react-hook-form";

import CommunityProjectTitle from "../common/CommunityProjectTitle";
import ProfileRegisterFormProject from "./ProfileRegisterFormProject";
import PorfileRegisterFormBasic from "./ProfileRegisterFormBasic";
import SpartaButton from "../../spartaDesignSystem/SpartaButton";

import { TProfileRegisterForm } from "../../types";

import recruitImage from "../../assets/gameDetail/ReviewEdit.svg";

export default function ProfileRegisterForm() {
  const {
    register,
    watch,
    handleSubmit,
    control,
    setValue,
    formState: { isValid },
    trigger,
  } = useForm<TProfileRegisterForm>({
    mode: "onChange",
  });

  const [currentStep, setCurrentStep] = useState(0);

  const goToNextStep = () => setCurrentStep((prev) => prev + 1);
  const goToPrevStep = () => setCurrentStep((prev) => prev - 1);

  return (
    <div className="mx-auto mt-16">
      <div className="flex justify-center items-center mb-10">
        <div
          className={`flex items-center justify-center w-8 h-8 border border-solid ${
            currentStep === 0 ? "border-green-500 text-green-500" : "border-gray-400 text-gray-400"
          } rounded-full cursor-pointer`}
        >
          <span className="font-DungGeunMo text-xl">1</span>
        </div>

        <div className="h-0.5 w-6 bg-gray-500"></div>

        <div
          className={`flex items-center justify-center w-8 h-8 border border-solid ${
            currentStep === 1 ? "border-green-500 text-green-500" : "border-gray-400 text-gray-400"
          } rounded-full cursor-pointer`}
        >
          <span className="font-DungGeunMo text-xl">2</span>
        </div>
      </div>

      <CommunityProjectTitle img={recruitImage} title={"프로필을 등록하고 프로젝트를 시작해보세요"} />

      <form>
        <div className="w-[1180px] mx-auto">
          {currentStep === 0 && (
            <PorfileRegisterFormBasic register={register} control={control} watch={watch} setValue={setValue} />
          )}
          {currentStep === 1 && <ProfileRegisterFormProject />}
          <SpartaButton
            disabled={!isValid}
            onClick={goToNextStep}
            content="다음"
            type="filled"
            colorType="primary"
            btnType="button"
          />
        </div>
      </form>
    </div>
  );
}
