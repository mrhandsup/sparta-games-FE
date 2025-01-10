import { useForm } from "react-hook-form";

import type { TReviewInputForm } from "../../types";
import { useState } from "react";
import { postGameReviews } from "../../api/review";

const useReview = () => {
  const { register, watch, setValue, formState, handleSubmit } = useForm<TReviewInputForm>();

  const [star, setStar] = useState(0);
  const [difficultyLevel, setDifficultyLevel] = useState("");

  const onClickStarHandler = (arg: number) => {
    if (star === arg) {
      setStar(0);
      setValue("star", 0);
      return;
    }
    setStar(arg);
    setValue("star", arg);
  };

  const onClickDifficultyLevelHandler = (arg: "easy" | "normal" | "hard") => {
    if (difficultyLevel === arg) {
      setDifficultyLevel("");
      setValue("difficulty", "");
      return;
    }
    setDifficultyLevel(arg);
    setValue("difficulty", arg);
  };

  const onSubmitHandler: (id: number, data: TReviewInputForm, accessToken: string | null) => void = async (
    id,
    data,
  ) => {
    // difficulty 데이터 유형 integer로 인한 오류 수정 필요
    await postGameReviews(id, data);
  };

  const form = {
    register,
    watch,
    setValue,
    formState,
    handleSubmit,
  };

  const state = {
    star,
    difficultyLevel,
  };

  const eventHandler = {
    onClickStarHandler,
    onClickDifficultyLevelHandler,
    onSubmitHandler,
  };

  return { form, state, eventHandler };
};

export default useReview;
