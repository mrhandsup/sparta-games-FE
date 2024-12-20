import useReview from "../../../hook/gameDetailHook/useReview";
import DifficultyChip from "../../common/chipComponents/DifficultyChip";
import closeBtn from "../../../assets/common/closeBtn.svg";

const ReviewRegisterModal = () => {
  const { form, state, eventHandler } = useReview();

  return (
    //TODO: POST 기능 완성, 버튼 상호작용 추가
    <div className="flex flex-col gap-4 p-5 absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 border border-solid border-primary-500 rounded-xl bg-gray-800">
      <div className="flex justify-between items-center">
        <p className="text-3xl font-DungGeunMo text-primary-500">리뷰등록</p>
        <img className="w-7 h-7" src={closeBtn} alt="닫기" />
      </div>

      <div className="flex items-center gap-8">
        <p className="text-2xl font-DungGeunMo text-white whitespace-nowrap">게임의 난이도는?</p>
        <div className="flex gap-3">
          <DifficultyChip chipSize="big" difficultyLevel="EASY" />
          <DifficultyChip chipSize="big" difficultyLevel="NORMAL" />
          <DifficultyChip chipSize="big" difficultyLevel="HARD" />
        </div>
      </div>

      <div className="flex gap-12">
        <p className="text-2xl font-DungGeunMo text-white">게임의 점수는?</p>
        {/* TODO: 별점 기능 */}
        <div>별점</div>
      </div>

      <div className="flex items-center justify-between gap-16">
        <div>
          <p className="text-2xl font-DungGeunMo text-white whitespace-nowrap">리뷰뷰내용 입력</p>
          <span className="text-sm font-DungGeunMo text-white">(최대 300자)</span>
        </div>
        <div className="border border-solid border-gray-100 p-2 w-full h-52 rounded-lg">
          <textarea
            maxLength={299}
            placeholder="소중한 리뷰 감사합니다 :)"
            {...form.register("content", { required: "필수" })}
            className="p-2 w-full text-white  bg-transparent outline-none"
          />
        </div>
      </div>

      <button
        disabled={!form.formState.isValid || state.star === 0 || state.difficultyLevel === ""}
        className={`w-full h-12 text-title-18 rounded-md ${
          !form.formState.isValid || state.star === 0 || state.difficultyLevel === "" ? "bg-gray-100" : "bg-primary-500"
        }`}
      >
        {!form.formState.isValid || state.star === 0 || state.difficultyLevel === ""
          ? "세가지 모두 입력해주세요!"
          : "리뷰를 등록합니다"}
      </button>
    </div>
  );
};

export default ReviewRegisterModal;
