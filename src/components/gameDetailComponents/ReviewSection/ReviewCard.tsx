import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";

import DifficultyChip from "../../common/chipComponents/DifficultyChip";
import StarRating from "../../common/StarRating";

import SpartaReactionModal, { TSpartaReactionModalProps } from "../../../spartaDesignSystem/SpartaReactionModal";
import useModalToggles from "../../../hook/useModalToggles";

import { deleteGameReview, postReviewLike } from "../../../api/review";

import { TReviewData } from "../../../types";

import { formatDate } from "../../../util/validation";

import DOMPurify from "dompurify";

import reviewDetailImage from "../../../assets/gameDetail/ReviewDetail.svg";
import reviewEditImage from "../../../assets/gameDetail/ReviewEdit.svg";
import reviewDeleteImage from "../../../assets/gameDetail/ReviewDelete.svg";
import exampleProfile from "../../../assets/gameDetail/example_profile.png";

type reviewDataProps = {
  review: TReviewData | undefined;
  onClickMoreToggleHandler: () => void;
  isMyReview?: boolean;
};

const ReviewCard = ({ review, onClickMoreToggleHandler, isMyReview = false }: reviewDataProps) => {
  const NO_ACTION_MODAL_ID = "noActionModal";
  const { modalToggles, onClickModalToggleHandlers } = useModalToggles([NO_ACTION_MODAL_ID]);

  const sanitizedContent = DOMPurify.sanitize(review?.content || "");

  const queryClient = useQueryClient();

  const noActionData: { [key: string]: Partial<TSpartaReactionModalProps> } = {
    reviewDelete: {
      title: "리뷰삭제",
      content: "리뷰삭제가 완료되었습니다.",
      btn1: {
        text: "확인했습니다.",
        onClick: () => {
          onClickModalToggleHandlers[NO_ACTION_MODAL_ID]();
          window.location.reload();
        },
      },
      type: "error",
    },

    reviewDeleteConfirm: {
      title: "리뷰삭제",
      content: "등록한 리뷰를 정말 삭제하시겠습니까?<br/>새롭게 리뷰작성이 가능하나, 추천/비추천 목록은 삭제됩니다.",
      btn1: {
        text: "리뷰를 삭제할게요.",
        onClick: () => {
          onClickReviewDelete(review?.id);
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
  };

  const [noActionModalData, setNoActionModalData] = useState<Partial<TSpartaReactionModalProps>>(
    noActionData.reviewDelete,
  );

  const onClickReviewDeleteHandler = () => {
    setNoActionModalData(noActionData.reviewDeleteConfirm);
    onClickModalToggleHandlers[NO_ACTION_MODAL_ID]();
  };

  const onClickReviewDelete = async (reviewId: number | undefined) => {
    const res = await deleteGameReview(reviewId, review?.game_id);

    if (res?.status === 200) {
      setNoActionModalData(noActionData.reviewDelete);
      onClickModalToggleHandlers[NO_ACTION_MODAL_ID]();
    }
  };

  const onClickReaction = async (reviewId: number | undefined, action: "like" | "dislike") => {
    await postReviewLike(reviewId, action);

    queryClient.invalidateQueries({ queryKey: ["reviews"] });
  };

  const convertDifficulty = (difficulty: number | undefined) => {
    switch (difficulty) {
      case 0:
        return "EASY";
      case 1:
        return "NORMAL";
      case 2:
        return "HARD";
    }
  };

  return (
    <>
      <div
        className={`relative flex flex-col gap-2 p-4 bg-gray-800 text-white rounded-xl ${
          isMyReview ? "border border-solid border-primary-500" : ""
        }`}
      >
        <div className="flex gap-2">
          <img src={exampleProfile} />
          <div className="flex flex-col gap-[2px]">
            <div className="flex items-center justify-between">
              {isMyReview ? (
                <>
                  <p className="font-DungGeunMo text-lg text-primary-500">{review?.author_name}</p>
                  <img
                    onClick={onClickMoreToggleHandler}
                    className="absolute right-12 cursor-pointer"
                    src={reviewEditImage}
                    alt="리뷰 수정"
                  />
                  <img
                    onClick={onClickReviewDeleteHandler}
                    className="absolute right-4 cursor-pointer"
                    src={reviewDeleteImage}
                    alt="리뷰 삭제"
                  />
                </>
              ) : (
                <>
                  <p className="font-DungGeunMo text-lg">{review?.author_name}</p>
                  <img className="absolute right-4 cursor-pointer" src={reviewDetailImage} alt="리뷰 상세 보기" />
                </>
              )}
            </div>
            <div className="flex gap-2">
              <DifficultyChip chipSize="small" difficultyLevel={convertDifficulty(review?.difficulty)} />
              <StarRating score={review?.star} />
            </div>
          </div>
        </div>
        <div
          className="w-full h-[72px] text-body-14 line-clamp-4 text-ellipsis"
          dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(sanitizedContent) }}
        />
        <div className="flex justify-between items-end">
          <p className="text-[12px] leading-4 text-gray-300">{formatDate(review?.created_at)}</p>
          <div className="flex items-center gap-1 text-[11px] font-bold">
            <div
              onClick={() => onClickReaction(review?.id, "like")}
              className="flex gap-1 p-1 bg-gray-600 rounded cursor-pointer"
            >
              👍🏻<p>{review?.like_count}</p>
            </div>
            <div
              onClick={() => onClickReaction(review?.id, "dislike")}
              className="flex gap-1 p-1 bg-gray-600 rounded cursor-pointer"
            >
              👎<p>{review?.dislike_count}</p>
            </div>
          </div>
        </div>
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
};

export default ReviewCard;
