import RecruitDetailInfo from "./RecruitDetailInfo ";
import RecruitCommentSection from "./RecruitCommentSection";
import RecruitHeader from "./RecruitHeader";
import SpartaPagination from "../../../../spartaDesignSystem/SpartaPagination";
import useModalToggles from "../../../../hook/useModalToggles";
import SpartaReactionModal, { TSpartaReactionModalProps } from "../../../../spartaDesignSystem/SpartaReactionModal";
import { useState } from "react";

export default function TeamRecruitDetail() {
  const CLOSE_RECRUIT_MODAL = "closeRecruitModal";
  const NO_ACTION_MODAL_ID = "noActionModal";
  const { modalToggles, onClickModalToggleHandlers } = useModalToggles([CLOSE_RECRUIT_MODAL, NO_ACTION_MODAL_ID]);

  const noActionData: { [key: string]: Partial<TSpartaReactionModalProps> } = {
    deleteRecruit: {
      title: "글 삭제",
      content: "글 삭제가 완료되었습니다.",
      btn1: {
        text: "확인했습니다.",
        onClick: () => {
          onClickModalToggleHandlers[NO_ACTION_MODAL_ID]();
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
          // TODO: 글 삭제 api 핸들러 추가
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
    closeRecruit: {
      title: "팀원 모집 마감",
      content: "팀원 모집을 정말 마감하시겠습니까?",
      btn1: {
        text: "마감할게요.",
        onClick: () => {
          onClickModalToggleHandlers[NO_ACTION_MODAL_ID]();
        },
      },
      btn2: {
        text: "생각해볼게요.",
        onClick: () => {
          onClickModalToggleHandlers[NO_ACTION_MODAL_ID]();
        },
      },
      type: "alert",
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
    onClickModalToggleHandlers[NO_ACTION_MODAL_ID]();

    // TODO: 마감 API 연동
  };

  const onClickDeleteRecruit = () => {
    setNoActionModalData(noActionData.deleteRecruiConfirm);
    onClickModalToggleHandlers[NO_ACTION_MODAL_ID]();
  };

  const onClickDeleteComment = () => {
    setNoActionModalData(noActionData.deleteCommentConfirm);
    onClickModalToggleHandlers[NO_ACTION_MODAL_ID]();
  };

  return (
    <>
      <div className="w-[1180px] mx-auto">
        <RecruitHeader onClickCloseRecruit={onClickCloseRecruit} onClickDeleteRecruit={onClickDeleteRecruit} />
        <RecruitDetailInfo />
        <RecruitCommentSection onClickDeleteComment={onClickDeleteComment} />
        <SpartaPagination dataTotalCount={5} countPerPage={1} onChangePage={() => {}} />
      </div>

      {noActionModalData && (
        <SpartaReactionModal
          isOpen={modalToggles[NO_ACTION_MODAL_ID]}
          onClose={onClickModalToggleHandlers[NO_ACTION_MODAL_ID]}
          modalId={NO_ACTION_MODAL_ID}
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
      )}
    </>
  );
}
