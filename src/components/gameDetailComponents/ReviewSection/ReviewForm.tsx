import useReview from "../../../hook/gameDetailHook/useReview";

import star from "../../../assets/star.svg";
import fillStar from "../../../assets/fillStar.svg";
import ellipse from "../../../assets/ellipse.svg";
import { TReviewInputForm } from "../../../types";
import DifficultyChip from "../../common/chipComponents/DifficultyChip";

const ReviewForm = ({ gameDetailId }: { gameDetailId: number }) => {
  const { form, state, eventHandler } = useReview();

  const accessToken = sessionStorage.getItem("accessToken");

  const handleFormSubmit = (data: TReviewInputForm) => {
    eventHandler.onSubmitHandler(gameDetailId, data, accessToken);
  };

  return (
    <form onSubmit={form.handleSubmit(handleFormSubmit)} className="flex gap-5 mt-5">
      <div className="w-20 h-20 bg-white rounded-lg"></div>
      <div className="flex flex-col gap-3 w-full">
        <div className="relative">
          <textarea
            maxLength={299}
            placeholder="별점과 난이도를 선택한 후, 리뷰를 입력해주세요"
            {...form.register("content", { required: "필수" })}
            className="p-5 w-full h-28 rounded-lg bg-gray-700 border border-solid border-white resize-none text-white text-[20px] font-medium scrollbar-hide"
          />
          <p className="absolute bottom-3 right-2 text-body-14 text-gray-200">{form.watch("content")?.length}/300</p>
        </div>

        <div className="flex gap-[15px] h-12">
          <div className="flex gap-3">
            <div
              onClick={() => eventHandler.onClickStarHandler(1)}
              className="flex gap-1 p-3 w-fit bg-gray-600 rounded-lg"
            >
              <img src={state.star === 1 ? fillStar : star} className="w-6 h-6" />
            </div>
            <div
              onClick={() => eventHandler.onClickStarHandler(2)}
              className="flex gap-1 p-3 w-fit bg-gray-600 rounded-lg"
            >
              <img src={state.star === 2 ? fillStar : star} className="w-6 h-6" />
              <img src={state.star === 2 ? fillStar : star} className="w-6 h-6" />
            </div>
            <div
              onClick={() => eventHandler.onClickStarHandler(3)}
              className="flex gap-1 p-3 w-fit bg-gray-600 rounded-lg"
            >
              <img src={state.star === 3 ? fillStar : star} className="w-6 h-6" />
              <img src={state.star === 3 ? fillStar : star} className="w-6 h-6" />
              <img src={state.star === 3 ? fillStar : star} className="w-6 h-6" />
            </div>
            <div
              onClick={() => eventHandler.onClickStarHandler(4)}
              className="flex gap-1 p-3 w-fit bg-gray-600 rounded-lg"
            >
              <img src={state.star === 4 ? fillStar : star} className="w-6 h-6" />
              <img src={state.star === 4 ? fillStar : star} className="w-6 h-6" />
              <img src={state.star === 4 ? fillStar : star} className="w-6 h-6" />
              <img src={state.star === 4 ? fillStar : star} className="w-6 h-6" />
            </div>
            <div
              onClick={() => eventHandler.onClickStarHandler(5)}
              className="flex gap-1 p-3 w-fit bg-gray-600 rounded-lg"
            >
              <img src={state.star === 5 ? fillStar : star} className="w-6 h-6" />
              <img src={state.star === 5 ? fillStar : star} className="w-6 h-6" />
              <img src={state.star === 5 ? fillStar : star} className="w-6 h-6" />
              <img src={state.star === 5 ? fillStar : star} className="w-6 h-6" />
              <img src={state.star === 5 ? fillStar : star} className="w-6 h-6" />
            </div>
          </div>
          <img src={ellipse} />
          <div className="flex items-center gap-[15px] text-[26.4px] font-bold text-white">
            <div onClick={() => eventHandler.onClickDifficultyLevelHandler("easy")}>
              <DifficultyChip chipSize={"big"} difficultyLevel={"EASY"} />
            </div>

            <div onClick={() => eventHandler.onClickDifficultyLevelHandler("hard")}>
              <DifficultyChip chipSize={"big"} difficultyLevel={"HARD"} />
            </div>
          </div>
          <img src={ellipse} />
          <button
            disabled={!form.formState.isValid || state.star === 0 || state.difficultyLevel === ""}
            className="w-40 h-12 bg-primary-500 text-title-18 rounded-lg"
          >
            리뷰입력
          </button>
        </div>
      </div>
    </form>
  );
};

export default ReviewForm;
