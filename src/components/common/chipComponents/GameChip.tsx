import { GAME_CHIP } from "../../../constant/constant";
import { TGameChip } from "../../../types";

type Props = {
  /**
   * 게임 카테고리
   */
  chipName: TGameChip | "NORMAL" | "EASY" | "HARD";
  size?: "small" | "large";
};

const GameChip = ({ chipName, size = "small" }: Props) => {
  const isDifficulty = chipName === "EASY" || chipName === "NORMAL" || chipName === "HARD";

  return (
    <div
      className={`flex items-center px-1.5 py-1.5 ${
        isDifficulty ? "bg-white text-black" : "bg-gray-600"
      } font-bold rounded-md ${size === "small" ? "text-[12px]" : "text-[18px]"} px-[6px]`}
    >
      {GAME_CHIP[chipName]}
    </div>
  );
};

export default GameChip;
