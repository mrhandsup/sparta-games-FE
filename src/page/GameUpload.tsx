import Note from "../components/gameUploadComponents/Note";
import GameUploadForm from "../components/gameUploadComponents/GameUploadForm";

import pixelMeteor from "../assets/gameDetail/ReviewEdit.svg";
import { useLocation } from "react-router-dom";
import { TGamePlayData } from "../types";
import { useState } from "react";

const GameUpload = () => {
  const location = useLocation();

  const previousGameData = (location.state as { gameData?: TGamePlayData })?.gameData;
  const isEditMode = location.state?.isEditMode;

  const [note, setNote] = useState({ 1: false, 2: false, 3: false });

  const onClickNoteToggleHandler = (arg: 1 | 2 | 3) => {
    if (arg === 1) {
      setNote({ ...note, 1: !note[1] });
      return;
    }

    if (arg === 2) {
      setNote({ ...note, 2: !note[2] });
      return;
    }

    if (arg === 3) {
      setNote({ ...note, 3: !note[3] });
      return;
    }
  };

  return (
    <main>
      <div className="flex items-center gap-3 my-8 mx-auto w-fit text-[24px] leading-[125%] text-white font-DungGeunMo">
        <img className="w-6 h-6" src={pixelMeteor} />
        <p>스파르타 게임즈에 게임을 등록합니다</p>
      </div>
      {isEditMode ? (
        <div className="w-full px-9 py-5 rounded-3xl bg-gray-800">
          <span className="text-xl font-bold text-alert-default">
            현재 수정중입니다. 게임파일이 변경될 경우 자동으로 재검수 요청에 들어갑니다.
          </span>
        </div>
      ) : (
        <Note state={note} onClickHandler={onClickNoteToggleHandler} />
      )}
      <GameUploadForm note={note} previousGameData={previousGameData} isEditMode={isEditMode} />
    </main>
  );
};

export default GameUpload;
