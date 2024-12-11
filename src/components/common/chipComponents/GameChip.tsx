import { GAME_CHIP } from "../../../constant/constant";
import { TGameChip } from "../../../types";

type Props = {
  /**
   * 게임 카테고리
   */
  chipName: TGameChip;
};

const GameChip = ({ chipName }: Props) => {
  return (
    <div className={`flex items-center px-1.5 py-1.5 bg-gray-600 font-bold rounded-md text-[11px]`}>
      {GAME_CHIP[chipName]}
    </div>
  );
};

export default GameChip;
