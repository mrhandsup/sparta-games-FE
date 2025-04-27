import { useState, useEffect } from "react";

import { Modal, Box } from "@mui/material";
import Rating from "@mui/material/Rating";

import useReview from "../../../hook/gameDetailHook/useReview";

import DifficultyChip from "../../common/chipComponents/DifficultyChip";

import closeBtn from "../../../assets/common/closeBtn.svg";
import star from "../../../assets/star.svg";
import fillStar from "../../../assets/fillStar.svg";
import grayStar from "../../../assets/grayStar.svg";
import SpartaReactionModal from "../../../spartaDesignSystem/SpartaReactionModal";
import { TReviewData } from "../../../types";
import SpartaButton from "../../../spartaDesignSystem/SpartaButton";

type Props = {
  gamePk: number;
  modalToggle: boolean;
  onClickModalToggleHandler: () => void;
  myReview: TReviewData | undefined;
  isRegister: boolean;
};

const ReviewRegisterModal = ({ gamePk, modalToggle, onClickModalToggleHandler, myReview, isRegister }: Props) => {
  const { review, form, eventHandler } = useReview();

  const [ratingValue, setRatingValue] = useState<number | null>(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState("");
  const [isHovered, setIsHovered] = useState(false);

  const gameDifficulty: ("EASY" | "NORMAL" | "HARD")[] = ["EASY", "NORMAL", "HARD"];

  const editorContent = form.watch("content");

  const onHoverEnter = () => {
    setIsHovered(true);
  };

  const onHoverLeave = () => {
    setIsHovered(false);
  };

  const resetForm = () => {
    form.setValue("content", "");
    setRatingValue(null);
    setSelectedDifficulty("");
  };

  useEffect(() => {
    if (myReview) {
      const convertedDifficulty = convertDifficulty(myReview?.difficulty, true) as string;

      setRatingValue(myReview?.star);
      setSelectedDifficulty(convertedDifficulty);
      form.setValue("content", myReview?.content), { shouldValidate: true };

      form.trigger();
    } else {
      resetForm();
    }
  }, [myReview]);

  const onClickReviewRegisterHandler = () => {
    const difficulty = convertDifficulty(selectedDifficulty, false) as number;
    eventHandler.onSubmitHandler(gamePk, difficulty, ratingValue, editorContent);

    onClickModalToggleHandler();
  };

  const onClickReviewEditHandler = () => {
    const difficulty = convertDifficulty(selectedDifficulty, false) as number;

    eventHandler.onSubmitReviewEditHandler(
      myReview?.id,
      myReview?.game_id,
      difficulty,
      ratingValue,
      myReview?.star,
      editorContent,
    );

    onClickModalToggleHandler();
  };

  const onClickDifficulty = (level: "EASY" | "NORMAL" | "HARD") => {
    setSelectedDifficulty(level);
  };

  const convertDifficulty = (difficulty: string | number, toString: boolean) => {
    if (toString) {
      switch (difficulty) {
        case 0:
          return "EASY";
        case 1:
          return "NORMAL";
        case 2:
          return "HARD";
      }
    } else {
      switch (difficulty) {
        case "EASY":
          return 0;
        case "NORMAL":
          return 1;
        case "HARD":
          return 2;
      }
    }
  };

  return (
    <>
      <Modal open={modalToggle} disableScrollLock={true}>
        <Box className="fixed left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 border border-solid border-primary-500 rounded-xl bg-gray-800 outline-none">
          <div className="flex flex-col gap-4 p-5 w-[900px]">
            <div className="flex justify-between items-center">
              <p className="text-3xl font-DungGeunMo text-primary-500">{isRegister ? "리뷰등록" : "리뷰수정"}</p>
              <img
                onClick={() => onClickModalToggleHandler()}
                className="w-7 h-7 cursor-pointer"
                src={closeBtn}
                alt="닫기"
              />
            </div>

            <div className="flex items-center gap-8">
              <p className="text-2xl font-DungGeunMo text-white whitespace-nowrap">게임의 난이도는?</p>
              <div className="flex gap-3">
                {gameDifficulty.map((level) => (
                  <DifficultyChip
                    key={level}
                    chipSize="big"
                    difficultyLevel={level}
                    selectedDifficulty={selectedDifficulty}
                    isSelected={selectedDifficulty === level}
                    onClick={() => onClickDifficulty(level)}
                  />
                ))}
              </div>
            </div>

            <div className="flex gap-14">
              <p className="text-2xl font-DungGeunMo text-white">게임의 점수는?</p>

              <Rating
                name="gameRating"
                value={ratingValue}
                onChange={(event: React.SyntheticEvent, newValue: number | null): void => {
                  setRatingValue(newValue);
                }}
                sx={{
                  width: "120px",
                }}
                icon={<img src={fillStar} width={30} height={30} />}
                emptyIcon={<img src={ratingValue === null && !isHovered ? grayStar : star} width={30} height={30} />}
                onMouseEnter={onHoverEnter}
                onMouseLeave={onHoverLeave}
              />
            </div>

            <div className="flex items-start gap-10">
              <div>
                <p className="text-2xl font-DungGeunMo text-white whitespace-nowrap">리뷰내용 입력</p>
                <span className="text-sm font-DungGeunMo text-white">(최대 300자)</span>
              </div>

              <div className="border border-solid border-gray-100 p-2 w-full h-52 rounded-lg">
                <textarea
                  placeholder="소중한 리뷰 감사합니다 :)"
                  {...form.register("content", { required: true, maxLength: 300 })}
                  {...form.register("content", { required: "필수" })}
                  className="p-2 w-full h-full text-lg leading-tight text-white bg-transparent outline-none resize-none"
                />
              </div>
            </div>

            <SpartaButton
              content={
                editorContent?.length > 300
                  ? "리뷰는 300자 이내로 입력바랍니다."
                  : !form.formState.isValid || ratingValue === null || selectedDifficulty === ""
                  ? "세가지 모두 입력해주세요!"
                  : isRegister
                  ? "리뷰를 등록합니다"
                  : "리뷰를 수정합니다."
              }
              onClick={myReview ? onClickReviewEditHandler : onClickReviewRegisterHandler}
              type={"filled"}
              colorType={
                !form.formState.isValid || ratingValue === null || selectedDifficulty === "" ? "grey" : "primary"
              }
            />
          </div>
        </Box>
      </Modal>

      {review.noActionModalData && (
        <SpartaReactionModal
          isOpen={review.modalToggles[review.NO_ACTION_MODAL_ID]}
          onClose={review.onClickModalToggleHandlers[review.NO_ACTION_MODAL_ID]}
          modalId={review.NO_ACTION_MODAL_ID}
          title={review.noActionModalData.title || ""}
          content={review.noActionModalData.content || ""}
          btn1={{
            text: review.noActionModalData?.btn1?.text || "",
            onClick: review.noActionModalData?.btn1?.onClick || (() => {}),
          }}
          type={review.noActionModalData.type}
        />
      )}
    </>
  );
};

export default ReviewRegisterModal;
