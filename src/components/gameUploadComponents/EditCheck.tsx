import { useState } from "react";
import { useNavigate } from "react-router-dom";

import closeBtnAlert from "../../../src/assets/common/closeBtnAlert.svg";
import { TGamePlayData } from "../../types";

type Props = {
  gamePk: number;
  gamePlayData: TGamePlayData | undefined;
  onClose: () => void;
};

const EditCheck = ({ gamePk, gamePlayData, onClose }: Props) => {
  const [inputValue, setInputValue] = useState("");

  const navigate = useNavigate();

  const requiredPhrase = "게임을 수정하겠습니다";
  const isPhraseCorrect = inputValue === requiredPhrase;

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

      <div className="text-white flex flex-col gap-2">
        <li>
          게임파일을 재업로드 할 시 <span className="text-alert-default">재검수</span>가 진행되어 시간이 소요됩니다.
        </li>
        <li className="ms-4">이외 기본적인 제목, 게임설명 수정 시 검수과정 없이 바로 업데이트가 진행됩니다.</li>
        <li className=" ms-4">
          일부 PC환경에서 썸네일과 스틸컷 파일이 불러와지지 않는 오류가 있으며, 현재 해결중에 있습니다.
        </li>
        <li>
          수정을 하시기 위해서는 <b className="text-alert-default">‘게임을 수정하겠습니다'</b>를 입력해주세요!
        </li>
      </div>

      <div className="mt-4 mb-3 p-3 border border-solid border-gray-100 rounded-md">
        <input
          className="w-full bg-transparent text-sm text-gray-100 outline-none"
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="게임을 수정하겠습니다"
        />
      </div>

      <div
        className={`flex h-12 rounded-md ${isPhraseCorrect ? "bg-alert-default" : "bg-gray-400"} text-center font-bold`}
      >
        {isPhraseCorrect ? (
          <button
            onClick={() => {
              navigate(`/game-edit/${gamePk}`, { state: { gameData: gamePlayData, isEditMode: true } });
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
