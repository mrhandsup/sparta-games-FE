import { SetStateAction, Dispatch, useState, useEffect } from "react";

import { Modal, Box } from "@mui/material";
import Rating from "@mui/material/Rating";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./reactQuillStyle.css";

import useReview from "../../../hook/gameDetailHook/useReview";

import DifficultyChip from "../../common/chipComponents/DifficultyChip";

import closeBtn from "../../../assets/common/closeBtn.svg";
import star from "../../../assets/star.svg";
import fillStar from "../../../assets/fillStar.svg";
import grayStar from "../../../assets/grayStar.svg";
import SpartaReactionModal from "../../../spartaDesignSystem/SpartaReactionModal";

type Props = {
  gamePk: number;
  modalOpen: boolean;
  setOpenModal: Dispatch<SetStateAction<boolean>>;
};

const ReviewRegisterModal = ({ gamePk, modalOpen, setOpenModal }: Props) => {
  const [ratingValue, setRatingValue] = useState<number | null>(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState("");

  const [isHovered, setIsHovered] = useState(false);

  const { review, form, eventHandler } = useReview();

  const gameDifficulty: ("EASY" | "NORMAL" | "HARD")[] = ["EASY", "NORMAL", "HARD"];

  const onHoverEnter = () => {
    setIsHovered(true);
  };

  const onHoverLeave = () => {
    setIsHovered(false);
  };

  const onClickDifficulty = (level: "EASY" | "NORMAL" | "HARD") => {
    setSelectedDifficulty(level);
  };

  const convertDifficulty = () => {
    switch (selectedDifficulty) {
      case "EASY":
        return 0;
      case "NORMAL":
        return 1;
      case "HARD":
        return 2;
    }
  };

  const difficulty = convertDifficulty();

  useEffect(() => {
    form.register("content", {
      required: "필수",
      minLength: 3,
    });
  }, [form.register]);

  const onChangeContent = (editorState: string) => {
    // react-quill 내용 작성 후 다 지울 경우 생기는 <p></br></p> 부분 제거
    const plainText = editorState.replace(/<(.|\n)*?>/g, "").trim();

    // 내용이 없을 경우 빈 문자열로 설정해서 isValid가 false가 되도록 함
    const cleanedContent = plainText === "" ? "" : editorState;

    form.setValue("content", cleanedContent, { shouldValidate: true });
  };

  const editorContent = form.watch("content");

  const onClickReviewRegister = () => {
    eventHandler.onSubmitHandler(gamePk, difficulty, ratingValue, editorContent);
  };

  useEffect(() => {
    if (review.registerSuccess) {
      setOpenModal(false);
      resetForm();
    }

    const timer = setTimeout(() => {
      review.setRegisterSuccess(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, [review.registerSuccess]);

  const resetForm = () => {
    form.setValue("content", "");
    setRatingValue(null);
    setSelectedDifficulty("");
  };

  return (
    <>
      <Modal open={modalOpen} disableScrollLock={true}>
        <Box className="fixed left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 border border-solid border-primary-500 rounded-xl bg-gray-800 outline-none">
          <div className="flex flex-col gap-4 p-5 w-[900px]">
            <div className="flex justify-between items-center">
              <p className="text-3xl font-DungGeunMo text-primary-500">리뷰등록</p>
              <img onClick={() => setOpenModal(false)} className="w-7 h-7 cursor-pointer" src={closeBtn} alt="닫기" />
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

              <ReactQuill
                theme="snow"
                value={editorContent}
                onChange={onChangeContent}
                modules={{
                  toolbar: false,
                }}
                placeholder="소중한 리뷰 감사합니다 :)"
                className="p-2 w-full h-full"
              />
            </div>

            <button
              onClick={onClickReviewRegister}
              disabled={!form.formState.isValid || ratingValue === null || selectedDifficulty === ""}
              className={`w-full h-12 text-title-18 rounded-md ${
                !form.formState.isValid || ratingValue === null || selectedDifficulty === ""
                  ? "bg-gray-100"
                  : "bg-primary-500"
              }`}
            >
              {!form.formState.isValid || ratingValue === null || selectedDifficulty === ""
                ? "세가지 모두 입력해주세요!"
                : "리뷰를 등록합니다"}
            </button>
          </div>
        </Box>
      </Modal>
      {review.registerSuccess && (
        <SpartaReactionModal
          isOpen={review.modalToggles[review.REVIEW_REGISTER_MODAL_ID]}
          onClose={review.onClickModalToggleHandlers[review.REVIEW_REGISTER_MODAL_ID]}
          modalId={review.REVIEW_REGISTER_MODAL_ID}
          title={"리뷰등록 완료"}
          content={"게임을 재밌게 즐겨주시고,<br/>소중한 의견 남겨주셔서 감사합니다!"}
          type={"primary"}
          btn1={{
            text: "확인했습니다",
            onClick: () => {
              review.onClickModalToggleHandlers[review.REVIEW_REGISTER_MODAL_ID]();
            },
          }}
        />
      )}
    </>
  );
};

export default ReviewRegisterModal;
