import { Modal, Box } from "@mui/material";
import Rating from "@mui/material/Rating";

import { SetStateAction, Dispatch, useState } from "react";

import useReview from "../../../hook/gameDetailHook/useReview";
import DifficultyChip from "../../common/chipComponents/DifficultyChip";
import closeBtn from "../../../assets/common/closeBtn.svg";
import star from "../../../assets/star.svg";
import fillStar from "../../../assets/fillStar.svg";
import grayStar from "../../../assets/grayStar.svg";

type Props = {
  modalOpen: boolean;
  setOpenModal: Dispatch<SetStateAction<boolean>>;
};

const ReviewRegisterModal = ({ modalOpen, setOpenModal }: Props) => {
  const [value, setValue] = useState<number | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [selectedDifficulty, setSelectedDifficulty] = useState("");

  const { form, state, eventHandler } = useReview();

  const gameDifficulty = ["EASY", "NORMAL", "HARD"];

  const onHoverEnter = () => {
    setIsHovered(true);
  };

  const onHoverLeave = () => {
    setIsHovered(false);
  };

  const handleSelectDifficulty = (level: string) => {
    setSelectedDifficulty(level);
  };

  return (
    <Modal open={modalOpen}>
      <Box className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 border border-solid border-primary-500 rounded-xl bg-gray-800 outline-none">
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
                  difficultyLevel={level as "EASY" | "NORMAL" | "HARD"}
                  selectedDifficulty={selectedDifficulty}
                  isSelected={selectedDifficulty === level}
                  onClick={() => handleSelectDifficulty(level)}
                />
              ))}
            </div>
          </div>

          <div className="flex gap-14">
            <p className="text-2xl font-DungGeunMo text-white">게임의 점수는?</p>

            <Rating
              name="gameRating"
              value={value}
              onChange={(event: React.SyntheticEvent, newValue: number | null): void => {
                console.log("New Rating Value:", newValue);
                setValue(newValue);
              }}
              sx={{
                width: "120px",
              }}
              icon={<img src={fillStar} width={30} height={30} />}
              emptyIcon={<img src={value === null && !isHovered ? grayStar : star} width={30} height={30} />}
              onMouseEnter={onHoverEnter}
              onMouseLeave={onHoverLeave}
            />
          </div>

          <div className="flex items-start gap-10">
            <div>
              <p className="text-2xl font-DungGeunMo text-white whitespace-nowrap">리뷰뷰내용 입력</p>
              <span className="text-sm font-DungGeunMo text-white">(최대 300자)</span>
            </div>
            <div className="border border-solid border-gray-100 p-2 w-full h-52 rounded-lg">
              <textarea
                maxLength={299}
                placeholder="소중한 리뷰 감사합니다 :)"
                {...form.register("content", { required: "필수" })}
                className="p-2 w-full h-full text-white  bg-transparent outline-none"
              />
            </div>
          </div>

          <button
            disabled={!form.formState.isValid || state.star === 0 || state.difficultyLevel === ""}
            className={`w-full h-12 text-title-18 rounded-md ${
              !form.formState.isValid || state.star === 0 || state.difficultyLevel === ""
                ? "bg-gray-100"
                : "bg-primary-500"
            }`}
          >
            {!form.formState.isValid || state.star === 0 || state.difficultyLevel === ""
              ? "세가지 모두 입력해주세요!"
              : "리뷰를 등록합니다"}
          </button>
        </div>
      </Box>
    </Modal>
  );
};

export default ReviewRegisterModal;
