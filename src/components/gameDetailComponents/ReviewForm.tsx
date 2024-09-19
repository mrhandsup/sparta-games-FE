import Easy from "../common/chipComponents/Easy";
import Hard from "../common/chipComponents/Hard";

import useReview from "../../hook/gameDetailHook/useReview";

import star from "../../assets/star.svg";
import fillStar from "../../assets/fillStar.svg";
import ellipse from "../../assets/ellipse.svg";

const ReviewForm = () => {
  const { form, state, eventHandler } = useReview();

  return (
    <form onSubmit={form.handleSubmit(eventHandler.onSubmitHandler)} className="flex gap-5 mt-5">
      <div className="w-20 h-20 bg-white rounded-lg"></div>
      <div className="flex flex-col gap-3 w-full">
        <textarea
          maxLength={300}
          placeholder="별점과 난이도를 선택한 후, 리뷰를 입력해주세요"
          {...form.register("comment", { required: "필수" })}
          className="p-5 w-full h-28 rounded-lg bg-gray-700 border border-solid border-white resize-none text-white text-[20px] font-medium"
        />
        <div className="flex gap-[15px] h-12">
          <div className="flex gap-3">
            <div
              onClick={() => eventHandler.onClickStarHandler(2)}
              className="flex gap-1 p-3 w-fit bg-gray-600 rounded-lg"
            >
              <img src={state.star === 2 ? fillStar : star} className="w-6 h-6" />
            </div>
            <div
              onClick={() => eventHandler.onClickStarHandler(4)}
              className="flex gap-1 p-3 w-fit bg-gray-600 rounded-lg"
            >
              <img src={state.star === 4 ? fillStar : star} className="w-6 h-6" />
              <img src={state.star === 4 ? fillStar : star} className="w-6 h-6" />
            </div>
            <div
              onClick={() => eventHandler.onClickStarHandler(6)}
              className="flex gap-1 p-3 w-fit bg-gray-600 rounded-lg"
            >
              <img src={state.star === 6 ? fillStar : star} className="w-6 h-6" />
              <img src={state.star === 6 ? fillStar : star} className="w-6 h-6" />
              <img src={state.star === 6 ? fillStar : star} className="w-6 h-6" />
            </div>
            <div
              onClick={() => eventHandler.onClickStarHandler(8)}
              className="flex gap-1 p-3 w-fit bg-gray-600 rounded-lg"
            >
              <img src={state.star === 8 ? fillStar : star} className="w-6 h-6" />
              <img src={state.star === 8 ? fillStar : star} className="w-6 h-6" />
              <img src={state.star === 8 ? fillStar : star} className="w-6 h-6" />
              <img src={state.star === 8 ? fillStar : star} className="w-6 h-6" />
            </div>
            <div
              onClick={() => eventHandler.onClickStarHandler(10)}
              className="flex gap-1 p-3 w-fit bg-gray-600 rounded-lg"
            >
              <img src={state.star === 10 ? fillStar : star} className="w-6 h-6" />
              <img src={state.star === 10 ? fillStar : star} className="w-6 h-6" />
              <img src={state.star === 10 ? fillStar : star} className="w-6 h-6" />
              <img src={state.star === 10 ? fillStar : star} className="w-6 h-6" />
              <img src={state.star === 10 ? fillStar : star} className="w-6 h-6" />
            </div>
          </div>
          <img src={ellipse} />
          <div className="flex items-center gap-[15px] text-[26.4px] font-bold text-white">
            <div onClick={() => eventHandler.onClickDifficultyLevelHandler("easy")}>
              <Easy gap={8} bg={state.difficultyLevel === "easy"} />
            </div>
            <div onClick={() => eventHandler.onClickDifficultyLevelHandler("hard")}>
              <Hard gap={8} bg={state.difficultyLevel === "hard"} />
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
