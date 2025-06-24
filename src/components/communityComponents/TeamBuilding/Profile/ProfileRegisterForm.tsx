import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";

import CommunityProjectTitle from "../../../common/CommunityProjectTitle";
import ProfileRegisterFormProject from "./ProfileRegisterFormProject";
import PorfileRegisterFormBasic from "./ProfileRegisterFormBasic";
import SpartaButton from "../../../../spartaDesignSystem/SpartaButton";

import { TProfileRegisterForm } from "../../../../types";

import recruitImage from "../../../../assets/gameDetail/ReviewEdit.svg";
import { useMutation } from "@tanstack/react-query";
import { postTeamBuildProfile } from "../../../../api/teambuilding";
import { AxiosError } from "axios";
import useModalToggles from "../../../../hook/useModalToggles";
import SpartaReactionModal, { TSpartaReactionModalProps } from "../../../../spartaDesignSystem/SpartaReactionModal";
import { useNavigate } from "react-router-dom";

export default function ProfileRegisterForm() {
  const { register, watch, handleSubmit, control, setValue, formState, trigger } = useForm<TProfileRegisterForm>({
    mode: "onChange",
  });

  const navigate = useNavigate();

  const [currentStep, setCurrentStep] = useState(0);
  const [linkItems, setLinkItems] = useState([{ link: "", type: "portfolio", isBorderActive: false }]);

  // TODO: 수정하기 api 연동시 삭제
  const isEditMode = false;
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
          navigate("/community/team-building");
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
    const payload = linkItems
      .filter(({ link }) => link.trim() !== "") // 빈 값으로 제출할 경우 빈 값 그대로 전송 되는것 방지하고 빈 배열로 전송되도록 함
      .map(({ link, type }) => ({ link, type }));

    const fullFormData = {
      ...data,
      links: payload,
    };

    console.log("제출된 데이터:", fullFormData, "data.profile_image[0]", data.profile_image[0]);

    const formData = new FormData();

    formData.append("profile_image", data.profile_image[0]);
    formData.append("career", data.career);
    formData.append("my_role", data.my_role);
    formData.append("tech_stack", data.tech_stack);
    formData.append("game_genre", data.game_genre);
    // portfolio 링크는 추후 백엔드와 협의 후에 수정 예정
    if (fullFormData.links.length > 0) {
      formData.append("portfolio", fullFormData.links[0].link);
    }
    formData.append("purpose", data.purpose);
    formData.append("duration", data.duration);
    formData.append("meeting_type", data.meeting_type);
    formData.append("contact", data.contact);
    formData.append("title", data.title);
    formData.append("content", data.content);

    // if (!isEditMode) {
    //   createTeamBuildingMutation.mutate(formData);
    // } else {
    //   updateTeamBuildingMutation.mutate({ postId: postDetail.id, formData });
    // }

    createTeamBuildProfileMutaion.mutate(formData);
  };

  const createTeamBuildProfileMutaion = useMutation({
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
              formState={formState}
              linkItems={linkItems}
              setLinkItems={setLinkItems}
            />
          )}
          {currentStep === 1 && (
            <ProfileRegisterFormProject register={register} control={control} watch={watch} setValue={setValue} />
          )}
          <SpartaButton
            disabled={currentStep === 0 ? !isStepOneValid : !formState.isValid}
            onClick={currentStep === 0 ? goToNextStep : onClickOpenConfirmModal}
            content={currentStep === 0 ? "다음" : "글 등록하기"}
            type="filled"
            colorType="primary"
            btnType="button"
          />
        </div>
      </form>

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
              onClick: handleSubmit(onSubmit),
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
                navigate("/community/team-building");
              },
            }}
          />
        </>
      )}
    </div>
  );
}
