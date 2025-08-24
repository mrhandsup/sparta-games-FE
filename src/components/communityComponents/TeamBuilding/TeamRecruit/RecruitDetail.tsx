import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { AxiosError } from "axios";
import {
  deleteTeamBuild,
  deleteTeamBuildComments,
  getTeamBuildDetail,
  patchTeamBuild,
} from "../../../../api/teambuilding";

import RecruitDetailHeader from "./RecruitDetailHeader";
import RecruitDetailInfo from "./RecruitDetailInfo ";
import RecruitCommentSection from "./RecruitCommentSection";

import { userStore } from "../../../../share/store/userStore";

import { TTeamBuildDetailResponse } from "../../../../types";

import useModalToggles from "../../../../hook/useModalToggles";
import SpartaReactionModal, { TSpartaReactionModalProps } from "../../../../spartaDesignSystem/SpartaReactionModal";

export default function RecruitDetail() {
  const { userData } = userStore();
  const { id } = useParams();
  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const { data } = useQuery<TTeamBuildDetailResponse>({
    queryKey: ["teamBuildngDetail", id],
    queryFn: () => getTeamBuildDetail(Number(id)),
    enabled: !!id,
  });

  const postDetail = data?.data;

  const closeRecruitMutation = useMutation({
    mutationFn: () => patchTeamBuild(postDetail?.id),
    onSuccess: () => {
      onClickModalToggleHandlers[CONFIRM_MODAL_ID]();
      setNoActionModalData(noActionData.closeRecruitSuccess);
      onClickModalToggleHandlers[SUCCESS_MODAL_ID]();
      queryClient.invalidateQueries({ queryKey: ["teamBuildngDetail", id] });
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

  const deleteCommentsMutation = useMutation({
    mutationFn: ({ commentId }: { commentId?: number | undefined }) => deleteTeamBuildComments(commentId),
    onSuccess: () => {
      onClickModalToggleHandlers[CONFIRM_MODAL_ID]();
      queryClient.invalidateQueries({ queryKey: ["teamBuildComments"] });
    },
    onError: (error: AxiosError) => {
      if (error.response && error.response.status === 400) {
        window.alert(`${(error.response?.data as { message?: string })?.message}`);
      } else {
        window.alert("알 수 없는 오류가 발생했습니다. 잠시후에 다시 시도해주세요.");
      }
    },
  });

  const CONFIRM_MODAL_ID = "confirmModal";
  const SUCCESS_MODAL_ID = "successModal";

  const { modalToggles, onClickModalToggleHandlers } = useModalToggles([CONFIRM_MODAL_ID, SUCCESS_MODAL_ID]);

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
    commentsFail: {
      title: "오류",
      content: "댓글 등록은 로그인 후 이용가능합니다.",
      btn1: {
        text: "확인했습니다.",
        onClick: () => {
          onClickModalToggleHandlers[CONFIRM_MODAL_ID]();
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

  const onClickDeleteComment = (commentId: number) => {
    setNoActionModalData(getDeleteConfirmData(commentId));
    onClickModalToggleHandlers[CONFIRM_MODAL_ID]();
  };

  const openErrorModal = () => {
    setNoActionModalData(noActionData.commentsFail);
    onClickModalToggleHandlers[CONFIRM_MODAL_ID]();
  };

  const getDeleteConfirmData = (commentId: number): Partial<TSpartaReactionModalProps> => ({
    title: "댓글 삭제",
    content: "등록한 댓글을 정말 삭제하시겠습니까?",
    btn1: {
      text: "댓글을 삭제할게요.",
      onClick: () => {
        deleteCommentsMutation.mutate({ commentId });
      },
    },
    btn2: {
      text: "생각해볼게요.",
      onClick: () => {
        onClickModalToggleHandlers[CONFIRM_MODAL_ID]();
      },
    },
    type: "error",
  });

  return (
    <>
      <div className="w-[988px] mx-auto">
        <RecruitDetailHeader
          userData={userData?.data}
          postDetail={postDetail}
          onClickCloseRecruit={onClickCloseRecruit}
          onClickDeleteRecruit={onClickDeleteRecruit}
        />
        <RecruitDetailInfo postDetail={postDetail} />
        <RecruitCommentSection
          userId={userData?.data.user_id}
          postDetail={postDetail}
          onClickDeleteComment={onClickDeleteComment}
          openErrorModal={openErrorModal}
        />
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
              disabled:
                noActionModalData.title === noActionData.deleteRecruiConfirm.title
                  ? deleteRecruitMutation.isPending
                  : noActionModalData.title === noActionData.closeRecruit.title
                  ? closeRecruitMutation.isPending
                  : false,
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
