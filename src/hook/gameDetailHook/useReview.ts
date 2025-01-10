import { useForm } from "react-hook-form";

import type { TReviewInputForm } from "../../types";
import { postGameReviews } from "../../api/review";

const useReview = () => {
  const { register, watch, setValue, formState, trigger, handleSubmit } = useForm<TReviewInputForm>();

  const onSubmitHandler: (id: number, data: TReviewInputForm, accessToken: string | null) => void = async (
    id,
    data,
  ) => {
    // difficulty 데이터 유형 integer로 인한 오류 수정 필요
    await postGameReviews(id, data);
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
