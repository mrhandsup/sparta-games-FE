import easyImage from "../../../assets/gameDetail/easy_icon.svg";
import normalImage from "../../../assets/gameDetail/normal_icon.svg";
import hardImage from "../../../assets/gameDetail/hard_icon.svg";

type Props = {
  chipSize: "small" | "big";
  difficultyLevel: "EASY" | "NORMAL" | "HARD";
};
const DifficultyChip = ({ chipSize, difficultyLevel }: Props) => {
  const imageMapping = {
    EASY: easyImage,
    NORMAL: normalImage,
    HARD: hardImage,
  };

  return (
    <>
      {chipSize === "small" ? (
        <div className="flex items-center justify-center gap-1 px-1 bg-white text-black font-bold rounded-md">
          <img className="w-3 h-3" src={imageMapping[difficultyLevel]} />
          <p className=" text-sm">{difficultyLevel}</p>
        </div>
      ) : (
        <div className="flex items-center justify-center gap-2 px-5 py-1 bg-gray-100 text-gray-800 font-bold rounded-md">
          <img className="w-5 h-5" src={imageMapping[difficultyLevel]} />
          <p className="text-2xl">{difficultyLevel}</p>
        </div>
      )}
    </>
  );
};

export default DifficultyChip;
