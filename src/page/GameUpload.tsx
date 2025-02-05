import Note from "../components/gameUploadComponents/Note";
import Form from "../components/gameUploadComponents/Form";

import useGameUpload from "../hook/gameUploadHook/useGameUpload";

import pixelMeteor from "../assets/gameDetail/ReviewEdit.svg";
import { useLocation } from "react-router-dom";
import { TGamePlayData } from "../types";

const GameUpload = () => {
  const { note, form, isUpload, setIsUpload, eventHandler, modalConfig, gameUploadResponse } = useGameUpload();

  const location = useLocation();
  const previousGameData = (location.state as { gameData?: TGamePlayData })?.gameData;
  const isEditMode = location.state?.isEditMode;

  return (
    <main>
      <div className="flex gap-3 my-10 mx-auto w-fit text-[32px] leading-[125%] text-white font-DungGeunMo">
        <img className="w-8 h-8" src={pixelMeteor} />
        <p>스파르타 게임즈에 게임을 등록합니다</p>
      </div>
      {isEditMode ? (
        <div className="w-[1180px] mx-auto px-9 py-5 rounded-3xl bg-gray-800">
          <span className="text-xl font-bold text-alert-default">
            현재 수정중입니다. 게임파일이 변경될 경우 자동으로 재검수 요청에 들어갑니다.
          </span>
        </div>
      ) : (
        <Note state={note} onClickHandler={eventHandler.onClickNoteToggleHandler} />
      )}
      <Form
        form={form}
        note={note}
        isUpload={isUpload}
        setIsUpload={setIsUpload}
        onChangeHandler={eventHandler.onChangeImageHandler}
        onSubmitHandler={eventHandler.onSubmitHandler}
        onEditHandler={eventHandler.onEditHandler}
        modalConfig={modalConfig}
        gameUploadResponse={gameUploadResponse}
        previousGameData={previousGameData}
        isEditMode={isEditMode}
      />
    </main>
  );
};

export default GameUpload;
