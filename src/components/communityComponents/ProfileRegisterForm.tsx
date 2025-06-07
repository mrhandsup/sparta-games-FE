import { useMemo, useState } from "react";
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
  const [linkItems, setLinkItems] = useState([{ link: "", type: "portfolio", isBorderActive: false }]);

  const goToNextStep = () => {
    setCurrentStep((prev) => prev + 1);
    trigger();
  };
  const goToPrevStep = () => {
    setCurrentStep((prev) => prev - 1);
    trigger();
  };

  const isStepOneValid = useMemo(() => {
    const profileImage = watch("profileImage");
    const position = watch("position");
    const tech = watch("tech");
    return !!profileImage && !!position && !!tech; // 조건에 맞게 true/false 리턴
  }, [watch()]);

  const onSubmit = (data: any) => {
    const payload = linkItems
      .filter(({ link }) => link.trim() !== "") // 빈 값으로 제출할 경우 빈 값 그대로 전송 되는것 방지하고 빈 배열로 전송되도록 함
      .map(({ link, type }) => ({ link, type }));

    const fullFormData = {
      ...data,
      links: payload,
    };

    console.log("제출된 데이터:", fullFormData);
  };
  return (
    <div className="mx-auto mt-16">
      <div className="flex justify-center items-center mb-10">
        <div
          onClick={currentStep === 0 ? undefined : goToPrevStep}
          className={`flex items-center justify-center w-8 h-8 border border-solid ${
            currentStep === 0 ? "border-green-500 text-green-500" : "border-gray-400 text-gray-400"
          } rounded-full cursor-pointer`}
        >
          <span className="font-DungGeunMo text-xl">1</span>
        </div>

        <div className="h-0.5 w-6 bg-gray-500"></div>

        <div
          onClick={currentStep === 1 ? undefined : goToNextStep}
          className={`flex items-center justify-center w-8 h-8 border border-solid ${
            currentStep === 1 ? "border-green-500 text-green-500" : "border-gray-400 text-gray-400"
          } rounded-full cursor-pointer`}
        >
          <span className="font-DungGeunMo text-xl">2</span>
        </div>
      </div>

      <CommunityProjectTitle img={recruitImage} title={"프로필을 등록하고 프로젝트를 시작해보세요"} />

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="w-[1180px] mx-auto">
          {currentStep === 0 && (
            <PorfileRegisterFormBasic
              register={register}
              control={control}
              watch={watch}
              setValue={setValue}
              linkItems={linkItems}
              setLinkItems={setLinkItems}
            />
          )}
          {currentStep === 1 && (
            <ProfileRegisterFormProject register={register} control={control} watch={watch} setValue={setValue} />
          )}
          <SpartaButton
            disabled={currentStep === 0 ? !isStepOneValid : !isValid}
            onClick={currentStep === 0 ? goToNextStep : undefined}
            content={currentStep === 0 ? "다음" : "글 등록하기"}
            type="filled"
            colorType="primary"
            btnType={currentStep === 0 ? "button" : "submit"}
          />
        </div>
      </form>
    </div>
  );
}
