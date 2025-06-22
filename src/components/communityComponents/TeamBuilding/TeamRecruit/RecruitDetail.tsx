import RecruitDetailInfo from "./RecruitDetailInfo ";
import RecruitCommentSection from "./RecruitCommentSection";
import RecruitHeader from "./RecruitHeader";
import SpartaPagination from "../../../../spartaDesignSystem/SpartaPagination";
import useModalToggles from "../../../../hook/useModalToggles";
import SpartaReactionModal, { TSpartaReactionModalProps } from "../../../../spartaDesignSystem/SpartaReactionModal";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { TTeamBuildDetailResponse } from "../../../../types";
import { deleteTeamBuild, getTeamBuildDetail, patchTeamBuild } from "../../../../api/teambuilding";
import { useLocation, useNavigate } from "react-router-dom";
import { AxiosError } from "axios";
import { userStore } from "../../../../share/store/userStore";

export default function RecruitDetail() {
  const { userData } = userStore();

  const location = useLocation();
  const { post } = location.state || {};

  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { data } = useQuery<TTeamBuildDetailResponse>({
    queryKey: ["teamBuildngDetail", post?.id],
    queryFn: () => getTeamBuildDetail(post?.id),
  });

  const postDetail = data?.data;
  const postStatus = post?.status_chip;

  const closeRecruitMutation = useMutation({
    mutationFn: () => patchTeamBuild(postDetail?.id),
    onSuccess: () => {
      onClickModalToggleHandlers[CONFIRM_MODAL_ID]();
      setNoActionModalData(noActionData.closeRecruitSuccess);
      onClickModalToggleHandlers[SUCCESS_MODAL_ID]();
      // queryClient.invalidateQueries({ queryKey: ["teamBuildngDetail", post?.id] });
    },
    onError: (error: AxiosError<{ status: string; message?: string }>) => {
      if (error.response && error.response.data.status === "fail") {
        onClickModalToggleHandlers[CONFIRM_MODAL_ID]();
        setNoActionModalData({
          title: "마감 실패",
          content: (error.response?.data as { message?: string })?.message,
          btn1: {
            text: "확인했습니다.",
            onClick: () => {
              onClickModalToggleHandlers[CONFIRM_MODAL_ID]();
            },
          },
          type: "error",
        });
        onClickModalToggleHandlers[CONFIRM_MODAL_ID]();
      }
    },
  });

  const deleteRecruitMutation = useMutation({
    mutationFn: () => deleteTeamBuild(postDetail?.id),
    onSuccess: () => {
      onClickModalToggleHandlers[CONFIRM_MODAL_ID]();
      setNoActionModalData(noActionData.deleteRecruitSuccess);
      onClickModalToggleHandlers[SUCCESS_MODAL_ID]();
    },
    onError: (error: AxiosError<{ status: string; message?: string }>) => {
      if (error.response && (error.response.data.status === "fail" || error.response.data.status === "error")) {
        onClickModalToggleHandlers[CONFIRM_MODAL_ID]();
        setNoActionModalData({
          title: "삭제 실패",
          content: (error.response?.data as { message?: string })?.message,
          btn1: {
            text: "확인했습니다.",
            onClick: () => {
              onClickModalToggleHandlers[CONFIRM_MODAL_ID]();
            },
          },
          type: "error",
        });
        onClickModalToggleHandlers[CONFIRM_MODAL_ID]();
      }
    },
  });

  const CLOSE_RECRUIT_MODAL = "closeRecruitModal";
  const CONFIRM_MODAL_ID = "confirmModal";
  const SUCCESS_MODAL_ID = "successModal";
  const NO_ACTION_MODAL_ID = "noActionModal";
  const { modalToggles, onClickModalToggleHandlers } = useModalToggles([
    CONFIRM_MODAL_ID,
    SUCCESS_MODAL_ID,
    CLOSE_RECRUIT_MODAL,
    NO_ACTION_MODAL_ID,
  ]);

  const noActionData: { [key: string]: Partial<TSpartaReactionModalProps> } = {
    deleteRecruitSuccess: {
      title: "글 삭제",
      content: "글 삭제가 완료되었습니다.",
      btn1: {
        text: "확인했습니다.",
        onClick: () => {
          navigate("/community/team-building");
        },
      },
      type: "alert",
    },
    deleteRecruiConfirm: {
      title: "글 삭제",
      content: "등록한 글을 정말 삭제하시겠습니까?",
      btn1: {
        text: "글을 삭제할게요.",
        onClick: () => {
          deleteRecruitMutation.mutate();
        },
      },
      btn2: {
        text: "생각해볼게요.",
        onClick: () => {
          onClickModalToggleHandlers[CONFIRM_MODAL_ID]();
        },
      },
      type: "error",
    },
    closeRecruit: {
      title: "팀원 모집 마감",
      content: "팀원 모집을 정말 마감하시겠습니까?",
      btn1: {
        text: "마감할게요.",
        onClick: () => {
          closeRecruitMutation.mutate();
        },
      },
      btn2: {
        text: "생각해볼게요.",
        onClick: () => {
          onClickModalToggleHandlers[CONFIRM_MODAL_ID]();
        },
      },
      type: "alert",
    },
    closeRecruitSuccess: {
      title: "팀원 모집 마감",
      content: "팀원 모집이 마감되었습니다.",
      btn1: {
        text: "확인했습니다.",
        onClick: () => {
          onClickModalToggleHandlers[SUCCESS_MODAL_ID]();
        },
      },
    },

    deleteCommentConfirm: {
      title: "리뷰 삭제",
      content: "등록한 리뷰 정말 삭제하시겠습니까?",
      btn1: {
        text: "리뷰를 삭제할게요.",
        onClick: () => {
          // TODO: 리뷰 삭제 api 핸들러 추가
          onClickModalToggleHandlers[NO_ACTION_MODAL_ID]();
        },
      },
      btn2: {
        text: "생각해볼게요.",
        onClick: () => {
          onClickModalToggleHandlers[NO_ACTION_MODAL_ID]();
        },
      },
      type: "error",
    },
  };
  const [noActionModalData, setNoActionModalData] = useState<Partial<TSpartaReactionModalProps>>(
    noActionData.reviewDelete,
  );

  const onClickCloseRecruit = () => {
    setNoActionModalData(noActionData.closeRecruit);
    onClickModalToggleHandlers[CONFIRM_MODAL_ID]();
  };

  const onClickDeleteRecruit = () => {
    setNoActionModalData(noActionData.deleteRecruiConfirm);
    onClickModalToggleHandlers[CONFIRM_MODAL_ID]();
  };

  const onClickDeleteComment = () => {
    setNoActionModalData(noActionData.deleteCommentConfirm);
    onClickModalToggleHandlers[CONFIRM_MODAL_ID]();
  };

  return (
    <>
      <div className="w-[1180px] mx-auto">
        <RecruitHeader
          userData={userData?.data}
          postDetail={postDetail}
          postStatus={postStatus}
          onClickCloseRecruit={onClickCloseRecruit}
          onClickDeleteRecruit={onClickDeleteRecruit}
        />
        <RecruitDetailInfo postDetail={postDetail} />
        <RecruitCommentSection onClickDeleteComment={onClickDeleteComment} />
        <SpartaPagination dataTotalCount={5} countPerPage={1} onChangePage={() => {}} />
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
              onClick: noActionModalData?.btn1?.onClick || (() => {}),
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
              text: noActionModalData?.btn1?.text || "",
              onClick: noActionModalData?.btn1?.onClick || (() => {}),
            }}
            closeOnClickOutside={false}
            type={noActionModalData.type}
          />
        </>
      )}
    </>
  );
}
