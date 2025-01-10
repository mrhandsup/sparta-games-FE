import { useForm } from "react-hook-form";

import type { TReviewInputForm } from "../../types";
import { postGameReviews } from "../../api/review";

const useReview = () => {
  const { register, watch, setValue, formState, trigger, handleSubmit } = useForm<TReviewInputForm>();

  const onSubmitHandler = async (
    gamePk: number,
    difficulty: number | undefined,
    star: number | null,
    content: string,
  ) => {
    // TODO: useMutaion 적용, onSuccess시 모달 적용

    await postGameReviews(gamePk, star, content, difficulty);
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
  };

  return { form, eventHandler };
};

export default useReview;
