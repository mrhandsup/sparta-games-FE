import { useEffect, useMemo, useRef, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

import CommunityProjectTitle from "../../../common/CommunityProjectTitle";
import ProfileRegisterFormProject from "./ProfileRegisterFormProject";
import PorfileRegisterFormBasic from "./ProfileRegisterFormBasic";
import SpartaButton from "../../../../spartaDesignSystem/SpartaButton";

import { TProfileRegisterForm } from "../../../../types";

import { postTeamBuildProfile, putTeamBuildProfile } from "../../../../api/teambuilding";
import useModalToggles from "../../../../hook/useModalToggles";
import SpartaReactionModal, { TSpartaReactionModalProps } from "../../../../spartaDesignSystem/SpartaReactionModal";
import { userStore } from "../../../../share/store/userStore";

import recruitImage from "../../../../assets/gameDetail/ReviewEdit.svg";
import arrowBack from "../../../../assets/common/arrow/triangleArrowLeft.svg";

export default function ProfileRegisterForm() {
  const methods = useForm<TProfileRegisterForm>({
    mode: "onChange",
    defaultValues: {
      portfolio: [{ link: "", type: "portfolio" }],
    },
  });
  const { watch, formState, trigger } = methods;

  const { userData } = userStore();

  const navigate = useNavigate();
  const location = useLocation();
  const { profileData, isEditMode } = location.state || {};

  const [currentStep, setCurrentStep] = useState(0);
  const isInitialSet = useRef(false);

  useEffect(() => {
    if (isEditMode && profileData && !isInitialSet.current) {
      const defaultPortfolio =
        profileData.portfolio && profileData.portfolio.length > 0
          ? profileData.portfolio
          : [{ link: "", type: "portfolio" }];

      methods.reset({ ...profileData, portfolio: defaultPortfolio }); // 폼 전체 초기화
      isInitialSet.current = true;
    }
  }, [isEditMode, profileData, methods]);

  const goToNextStep = () => {
    setCurrentStep((prev) => prev + 1);
    trigger();
  };
  const goToPrevStep = () => {
    setCurrentStep((prev) => prev - 1);
    trigger();
  };

  const CONFIRM_MODAL_ID = "confirmModal";
  const SUCCESS_MODAL_ID = "successModal";
  const { modalToggles, onClickModalToggleHandlers } = useModalToggles([CONFIRM_MODAL_ID, SUCCESS_MODAL_ID]);

  const noActionData: { [key: string]: Partial<TSpartaReactionModalProps> } = {
    uploadConfirm: {
      title: !isEditMode ? "글 등록" : "글 수정",
      content: !isEditMode ? "작성하신 내용으로 팀빌딩 프로필을 등록하시겠어요?" : "이대로 수정하시겠어요?",
      btn1: {
        text: !isEditMode ? "네 등록할게요." : "네 수정할게요.",
        onClick: () => {},
      },
      btn2: {
        text: "아니요. 좀 더 수정할게요.",
        onClick: () => {
          onClickModalToggleHandlers[CONFIRM_MODAL_ID]();
        },
      },
    },
    uploadSuccess: {
      title: !isEditMode ? "글 등록 완료" : "글 수정 완료",
      content: !isEditMode ? "팀빌딩 프로필이 성공적으로 등록되었습니다." : "팀원 모집 글이 성공적으로 수정되었습니다.",
      btn1: {
        text: "확인했습니다",
        onClick: () => {
          onClickModalToggleHandlers[CONFIRM_MODAL_ID]();
        },
      },
    },
  };

  const [noActionModalData, setNoActionModalData] = useState<Partial<TSpartaReactionModalProps>>(
    noActionData.uploadSuccess,
  );

  const onClickOpenConfirmModal = () => {
    setNoActionModalData(noActionData.uploadConfirm);
    onClickModalToggleHandlers[CONFIRM_MODAL_ID]();
  };

  const isStepOneValid = useMemo(() => {
    const myRole = watch("my_role");
    const techStack = watch("tech_stack");

    return !!myRole && !!techStack; // 조건에 맞게 true/false 리턴
  }, [watch()]);

  const onSubmit = (data: any) => {
    const formData = new FormData();

    formData.append("image", data.profile_image[0]);
    formData.append("career", data.career);
    formData.append("my_role", data.my_role);
    formData.append("tech_stack", data.tech_stack);
    formData.append("purpose", data.purpose);
    formData.append("duration", data.duration);
    formData.append("meeting_type", data.meeting_type);
    formData.append("contact", data.contact);
    formData.append("title", data.title);
    formData.append("content", data.content);

    data.game_genre.forEach((genre: string) => {
      formData.append("game_genre", genre);
    });

    if (data.portfolio && data.portfolio.length > 0) {
      data.portfolio.forEach((portfolio: { portfolio: string; type: string }) => {
        formData.append("portfolio", JSON.stringify(portfolio));
      });
    }

    if (!isEditMode) {
      createTeamBuildProfileMutation.mutate(formData);
    } else {
      updateTeamBuildProfileMutation.mutate({ userId: userData?.data.user_id, formData });
    }
  };

  const createTeamBuildProfileMutation = useMutation({
    mutationFn: postTeamBuildProfile,
    onSuccess: () => {
      onClickModalToggleHandlers[CONFIRM_MODAL_ID]();
      setNoActionModalData(noActionData.uploadSuccess);
      onClickModalToggleHandlers[SUCCESS_MODAL_ID]();
    },
    onError: (error: AxiosError) => {
      if (error.response && error.response.status === 400) {
        window.alert(`${(error.response?.data as { message?: string })?.message}`);
      } else {
        window.alert("알 수 없는 오류가 발생했습니다. 잠시후에 다시 시도해주세요.");
      }
    },
  });

  const updateTeamBuildProfileMutation = useMutation({
    mutationFn: ({ userId, formData }: { userId: number | undefined; formData: FormData }) =>
      putTeamBuildProfile(userId, formData),

    onSuccess: () => {
      onClickModalToggleHandlers[CONFIRM_MODAL_ID]();
      setNoActionModalData(noActionData.uploadSuccess);
      onClickModalToggleHandlers[SUCCESS_MODAL_ID]();
    },
    onError: (error: AxiosError) => {
      if (error.response && error.response.status === 400) {
        window.alert(`${(error.response?.data as { message?: string })?.message}`);
      } else {
        window.alert("알 수 없는 오류가 발생했습니다. 잠시후에 다시 시도해주세요.");
      }
    },
  });

  const isPending = isEditMode ? updateTeamBuildProfileMutation.isPending : createTeamBuildProfileMutation.isPending;

  console.log("currentStep", currentStep);
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

      <div className="relative flex items-center w-full">
        <img
          className={`${currentStep === 0 ? "hidden" : "block"} absolute left-0 cursor-pointer`}
          onClick={goToPrevStep}
          src={arrowBack}
          alt="1페이지 폼으로 돌아가기"
        />
        <div className="flex-1 text-center">
          <CommunityProjectTitle img={recruitImage} title={"프로필을 등록하고 프로젝트를 시작해보세요"} />
        </div>
      </div>

      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <div className="w-[1180px] mx-auto">
            {currentStep === 0 && <PorfileRegisterFormBasic profileData={profileData} isEditMode={isEditMode} />}
            {currentStep === 1 && <ProfileRegisterFormProject />}
            <SpartaButton
              disabled={currentStep === 0 ? !isStepOneValid : !formState.isValid}
              onClick={currentStep === 0 ? goToNextStep : onClickOpenConfirmModal}
              content={currentStep === 0 ? "다음" : !isEditMode ? "글 등록하기" : "글 수정하기"}
              type="filled"
              colorType="primary"
              btnType="button"
            />
          </div>
        </form>
      </FormProvider>
      {noActionModalData && (
        <>
          <SpartaReactionModal
            isOpen={modalToggles[CONFIRM_MODAL_ID]}
            onClose={onClickModalToggleHandlers[CONFIRM_MODAL_ID]}
            modalId={CONFIRM_MODAL_ID}
            title={noActionModalData.title || ""}
            content={noActionModalData.content || ""}
            btn1={{
              text: noActionModalData?.btn1?.text || "",
              onClick: () => {
                if (!isPending) methods.handleSubmit(onSubmit)();
              },
            }}
            btn2={
              noActionModalData?.btn2 && {
                text: noActionModalData?.btn2?.text || "",
                onClick: noActionModalData?.btn2?.onClick || (() => {}),
              }
            }
            type={noActionModalData.type}
          />

          <SpartaReactionModal
            isOpen={modalToggles[SUCCESS_MODAL_ID]}
            onClose={onClickModalToggleHandlers[SUCCESS_MODAL_ID]}
            modalId={SUCCESS_MODAL_ID}
            title={noActionModalData.title || ""}
            content={noActionModalData.content || ""}
            btn1={{
              text: "확인했습니다",
              onClick: () => {
                onClickModalToggleHandlers[SUCCESS_MODAL_ID]();
                navigate(`/my-page/${userData?.data.user_id}?tab=teambuilding`);
              },
            }}
          />
        </>
      )}
    </div>
  );
}
