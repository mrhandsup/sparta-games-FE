import easyImage from "../../../assets/gameDetail/easy_icon.svg";
import normalImage from "../../../assets/gameDetail/normal_icon.svg";
import hardImage from "../../../assets/gameDetail/hard_icon.svg";

type Props = {
  chipSize: "small" | "big";
  difficultyLevel: "EASY" | "NORMAL" | "HARD";
  isSelected?: boolean;
  onClick?: () => void;
  selectedDifficulty?: string;
};
const DifficultyChip = ({ chipSize, difficultyLevel, isSelected, onClick, selectedDifficulty }: Props) => {
  const imageMapping = {
    EASY: easyImage,
    NORMAL: normalImage,
    HARD: hardImage,
  };

  if (chipSize === "small") {
    return (
      <div
        className="flex items-center justify-center gap-1 px-1 bg-white text-black font-bold rounded-md cursor-pointer"
        onClick={onClick}
      >
        <img className="w-3 h-3" src={imageMapping[difficultyLevel]} alt={difficultyLevel} />
        <p className="text-sm">{difficultyLevel}</p>
      </div>
    );
  }

  const baseStyle = "flex items-center justify-center gap-2 font-bold rounded-md cursor-pointer";
  const selectedStyle =
    selectedDifficulty === ""
      ? "bg-gray-100 text-gray-800"
      : isSelected
      ? "bg-white text-black"
      : "bg-gray-700 text-gray-100";
  const sizeStyle = "px-2 py-1 text-2xl";

  return (
    <div className={`${baseStyle} ${selectedStyle} ${sizeStyle} `} onClick={onClick}>
      <img className="w-5 h-5" src={imageMapping[difficultyLevel]} alt={difficultyLevel} />
      <p>{difficultyLevel}</p>
    </div>
  );
};

export default DifficultyChip;
