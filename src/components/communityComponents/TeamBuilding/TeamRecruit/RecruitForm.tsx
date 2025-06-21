import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";

import CommunityProjectTitle from "../../../common/CommunityProjectTitle";
import RecruitFormBasicInfo from "./RecruitFormBasicInfo";
import RecruitFormDescription from "./RecruitFormDescription";
import SpartaButton from "../../../../spartaDesignSystem/SpartaButton";

import type { TProjectRecruitForm } from "../../../../types";

import recruitImage from "../../../../assets/gameDetail/ReviewEdit.svg";
import { postTeamBuild } from "../../../../api/teambuilding";
import useModalToggles from "../../../../hook/useModalToggles";
import SpartaReactionModal, { TSpartaReactionModalProps } from "../../../../spartaDesignSystem/SpartaReactionModal";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";

export default function RecruitForm() {
  console.log("main 브랜치를 default 브랜치로 변경함");
  const { register, watch, handleSubmit, control, setValue, formState, trigger } = useForm<TProjectRecruitForm>({
    mode: "onChange",
  });

  const navigate = useNavigate();
  const CONFIRM_MODAL_ID = "confirmModal";
  const SUCCESS_MODAL_ID = "successModal";
  const { modalToggles, onClickModalToggleHandlers } = useModalToggles([CONFIRM_MODAL_ID, SUCCESS_MODAL_ID]);

  const noActionData: { [key: string]: Partial<TSpartaReactionModalProps> } = {
    uploadConfirm: {
      title: "글 등록",
      content: "작성하신 내용으로 팀원 모집 글을 등록하시겠어요?",
      btn1: {
        text: "네 등록할게요.",
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
      title: "글 등록 완료",
      content: "팀원 모집 글이 성공적으로 등록되었습니다.",
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

  const createTeamBuildingMutation = useMutation({
    mutationFn: postTeamBuild,
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

  const onSubmit = async (data: any) => {
    const formData = new FormData();

    formData.append("title", data.title);
    formData.append("purpose", data.purpose);
    formData.append("duration", data.duration);
    formData.append("meeting_type", data.meeting_type);
    formData.append("deadline", data.deadline);
    formData.append("contact", data.contact);
    formData.append("content", data.content);

    if (data.thumbnail && data.thumbnail.length > 0) {
      formData.append("thumbnail", data.thumbnail[0]);
    } else {
      formData.append("thumbnail_basic", "default");
    }

    data.want_roles.forEach((role: string) => {
      formData.append("want_roles", role);
    });

    createTeamBuildingMutation.mutate(formData);
  };

  return (
    <>
      <div className="mx-auto mt-16">
        <CommunityProjectTitle img={recruitImage} title={"프로젝트를 같이 만들 팀원을 구해요"} />

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="w-[1180px] mx-auto">
            <RecruitFormBasicInfo
              control={control}
              watch={watch}
              setValue={setValue}
              register={register}
              trigger={trigger}
              formState={formState}
            />
            <RecruitFormDescription register={register} watch={watch} setValue={setValue} formState={formState} />
            <SpartaButton
              btnType="button"
              disabled={!formState.isValid}
              content="글 등록하기"
              type="filled"
              onClick={onClickOpenConfirmModal}
            />
          </div>
        </form>
      </div>
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
    </>
  );
}
