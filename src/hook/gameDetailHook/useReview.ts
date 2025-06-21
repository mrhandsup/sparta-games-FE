import { useForm } from "react-hook-form";

import type { TReviewInputForm } from "../../types";
import { postGameReviews, putGameReview } from "../../api/review";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import useModalToggles from "../useModalToggles";
import { TSpartaReactionModalProps } from "../../spartaDesignSystem/SpartaReactionModal";

const useReview = () => {
  const { register, watch, setValue, formState, trigger, handleSubmit } = useForm<TReviewInputForm>();

  const NO_ACTION_MODAL_ID = "noActionModal";

  const { modalToggles, onClickModalToggleHandlers } = useModalToggles([NO_ACTION_MODAL_ID]);

  const noActionData: { [key: string]: Partial<TSpartaReactionModalProps> } = {
    registerSuccess: {
      title: "리뷰등록 완료",
      content: "게임을 재밌게 즐겨주시고,<br/>소중한 의견 남겨주셔서 감사합니다!",
      btn1: {
        text: "확인했습니다",
        onClick: () => {
          onClickModalToggleHandlers[NO_ACTION_MODAL_ID]();
        },
      },
    },
    editSuccess: {
      title: "리뷰수정 완료",
      content: "리뷰수정이 완료되었습니다.",
      btn1: {
        text: "확인했습니다",
        onClick: () => {
          onClickModalToggleHandlers[NO_ACTION_MODAL_ID]();
        },
      },
    },
  };

  const [noActionModalData, setNoActionModalData] = useState<Partial<TSpartaReactionModalProps>>(
    noActionData.registerSuccess,
  );

  const queryClient = useQueryClient();

  const reviewMutation = useMutation({
    mutationFn: ({
      gamePk,
      star,
      content,
      difficulty,
    }: {
      gamePk: number | undefined;
      star: number | null;
      content: string;
      difficulty: number | undefined;
    }) => postGameReviews(gamePk, star, content, difficulty),
    onSuccess: (data, variables) => {
      const { gamePk } = variables;
      queryClient.invalidateQueries({ queryKey: ["reviews", "my_review", gamePk] });

      setNoActionModalData(noActionData.registerSuccess);
      onClickModalToggleHandlers[NO_ACTION_MODAL_ID]();
    },
  });

  const onSubmitHandler = async (
    gamePk: number | undefined,
    difficulty: number | undefined,
    star: number | null,
    content: string,
  ) => {
    reviewMutation.mutate({ gamePk, difficulty, star, content });
  };

  const onSubmitReviewEditHandler = async (
    reviewId: number | undefined,
    gameId: number | undefined,
    difficulty: number | undefined,
    star: number | null,
    preStar: number | undefined,
    content: string,
  ) => {
    await putGameReview(reviewId, gameId, difficulty, star, preStar, content);
    queryClient.invalidateQueries({ queryKey: ["reviews", "my_review", gameId] });

    setNoActionModalData(noActionData.editSuccess);
    onClickModalToggleHandlers[NO_ACTION_MODAL_ID]();
  };

  const review = {
    modalToggles,
    noActionModalData,
    onClickModalToggleHandlers,
    NO_ACTION_MODAL_ID,
  };

  const form = {
    register,
    trigger,
    watch,
    setValue,
    formState,
    handleSubmit,
  };

  const eventHandler = {
    onSubmitHandler,
    onSubmitReviewEditHandler,
  };

  return { review, form, eventHandler };
};

export default useReview;
