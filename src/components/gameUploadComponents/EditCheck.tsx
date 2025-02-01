import { useState } from "react";
import { useNavigate } from "react-router-dom";

import closeBtnAlert from "../../../src/assets/common/closeBtnAlert.svg";
import { TGamePlayData } from "../../types";

type Props = {
  gamePlayData: TGamePlayData | undefined;
  onClose: () => void;
};

const EditCheck = ({ gamePlayData, onClose }: Props) => {
  const [inputValue, setInputValue] = useState("");

  const navigate = useNavigate();

  const requiredPhrase = "업데이트를 진행하겠습니다";
  const isPhraseCorrect = inputValue.trim() === requiredPhrase;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };
  return (
    <div className="fixed left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 p-7 border border-solid border-alert-default rounded-xl bg-gray-800 outline-none">
      <div className="flex flex-col gap-4 w-[700px]">
        <div className="flex justify-between items-center mb-2">
          <p className="text-xl font-DungGeunMo text-alert-default">수정하기 전 확인해주세요!</p>
          <img onClick={onClose} className="w-7 h-7 cursor-pointer" src={closeBtnAlert} alt="닫기" />
        </div>
      </div>

      <div className="">
        <ul className="font-Pretendard text-white">
          <li className="flex items-center gap-2 text-sm">
            <span>·</span> 수정하기를 시작하길 경우, 수정하시는 범위에 따라 재검수가 있을 수 있습니다.
          </li>
          <li className="flex items-start gap-2 text-sm ms-4">
            <span>·</span> 기본적인 내용수정의 경우 공식적인 재검수가 이루어 지지 않습니다만,
            <br />
            추후 내용 확인 후 부적절한 내용이 있을 경우 삭제될 수 있습니다.
          </li>
          <li className="flex items-center gap-2 text-sm ms-4">
            <span>·</span> 게임파일이 변동될 경우, 필수적으로 재검수가 진행됩니다.
          </li>
          <li className="flex items-center gap-2 text-sm">
            <span>·</span>수정을 하시기 위해서는<b className="text-alert-default">‘업데이트를 진행하겠습니다'</b>를
            입력해주세요!
          </li>
        </ul>
      </div>

      <div className="mt-4 mb-3 p-3 border border-solid border-gray-100 rounded-md">
        <input
          className="w-full bg-transparent text-sm text-gray-100 outline-none"
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="업데이트를 진행하겠습니다"
        />
      </div>

      <div
        className={`flex h-12 rounded-md ${isPhraseCorrect ? "bg-alert-default" : "bg-gray-400"} text-center font-bold`}
      >
        {isPhraseCorrect ? (
          <button
            onClick={() => {
              navigate("/game-upload", { state: { gameData: gamePlayData, isEditMode: true } });
            }}
            className="w-full"
          >
            문구가 확인되었습니다. 게임 수정을 진행합니다.
          </button>
        ) : (
          <button disabled={true} className="w-full">
            문구를 올바르게 입력해주세요.
          </button>
        )}
      </div>
    </div>
  );
};

export default EditCheck;
