import Note from "../components/gameUploadComponents/Note";
import Form from "../components/gameUploadComponents/Form";

import useGameUpload from "../hook/gameUploadHook/useGameUpload";

import pixelMeteor from "../assets/gameDetail/ReviewEdit.svg";

const GameUpload = () => {
  const { note, form, isUpload, previewStillCut, eventHandler } = useGameUpload();

  return (
    <main>
      <div className="flex gap-3 my-10 mx-auto w-fit text-[32px] leading-[125%] text-white font-DungGeunMo">
        <img className="w-8 h-8" src={pixelMeteor} />
        <p>스파르타 게임즈에 게임을 등록합니다</p>
      </div>
      <Note state={note} onClickHandler={eventHandler.onClickNoteToggleHandler} />
      <Form
        form={form}
        note={note}
        isUpload={isUpload}
        previewStillCut={previewStillCut}
        onChangeHandler={eventHandler.onChangeImageHandler}
        onClickHandler={eventHandler.onClickImageDeleteHandler}
        onSubmitHandler={eventHandler.onSubmitHandler}
      />
    </main>
  );
};

export default GameUpload;
