import { useForm } from "react-hook-form";

import type { TReviewInputForm } from "../../types";
import { postGameReviews, putGameReview } from "../../api/review";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import useModalToggles from "../useModalToggles";

const useReview = () => {
  const { register, watch, setValue, formState, trigger, handleSubmit } = useForm<TReviewInputForm>();

  const REVIEW_REGISTER_MODAL_ID = "reviewRegisterModal";
  const { modalToggles, onClickModalToggleHandlers } = useModalToggles([REVIEW_REGISTER_MODAL_ID]);

  const [registerSuccess, setRegisterSuccess] = useState(false);
  const [editSuccess, setEditSuccess] = useState(false);

  const queryClient = useQueryClient();

  const reviewMutation = useMutation({
    mutationFn: ({
      gamePk,
      star,
      content,
      difficulty,
    }: {
      gamePk: number;
      star: number | null;
      content: string;
      difficulty: number | undefined;
    }) => postGameReviews(gamePk, star, content, difficulty),
    onSuccess: (data, variables) => {
      const { gamePk } = variables;
      queryClient.invalidateQueries({ queryKey: ["reviews", "my_review", gamePk] });
      onClickModalToggleHandlers[REVIEW_REGISTER_MODAL_ID]();
      setRegisterSuccess(true);
    },
  });

  const onSubmitHandler = async (
    gamePk: number,
    difficulty: number | undefined,
    star: number | null,
    content: string,
  ) => {
    reviewMutation.mutate({ gamePk, difficulty, star, content });
  };

  const onSubmitReviewEditHandler = async (
    reviewId: number | undefined,
    gamePk: number | undefined,
    difficulty: number | undefined,
    star: number | null,
    preStar: number | undefined,
    content: string,
  ) => {
    await putGameReview(reviewId, gamePk, difficulty, star, preStar, content);
    queryClient.invalidateQueries({ queryKey: ["reviews", "my_review", gamePk] });
    onClickModalToggleHandlers[REVIEW_REGISTER_MODAL_ID]();
    setEditSuccess(true);
  };

  const review = {
    editSuccess,
    setEditSuccess,
    registerSuccess,
    setRegisterSuccess,
    modalToggles,
    onClickModalToggleHandlers,
    REVIEW_REGISTER_MODAL_ID,
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
