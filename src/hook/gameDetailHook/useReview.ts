import { SubmitHandler, useForm } from "react-hook-form";

import type { ReviewInputForm } from "../../types";
import { useState } from "react";

const useReview = () => {
  const { register, watch, setValue, formState, handleSubmit } = useForm<ReviewInputForm>();

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

  const onClickDifficultyLevelHandler = (arg: "easy" | "hard") => {
    if (difficultyLevel === arg) {
      setDifficultyLevel("");
      setValue("difficultyLevel", "");
      return;
    }
    setDifficultyLevel(arg);
    setValue("difficultyLevel", arg);
  };

  const onSubmitHandler: SubmitHandler<ReviewInputForm> = (data) => {
    console.log(data);
    // 여기에 등록 api 작성
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
