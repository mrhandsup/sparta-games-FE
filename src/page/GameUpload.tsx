import Note from "../components/gameUploadComponents/Note";
import Form from "../components/gameUploadComponents/Form";

import useGameUpload from "../hook/gameUploadHook/useGameUpload";

import pixelMeteor from "../assets/homeImage/pixelMeteor.svg";

const GameUpload = () => {
  const { note, form, previewThumbnail, previewStillCut, eventHandler } = useGameUpload();

  return (
    <main>
      <div className="flex gap-3 my-10 mx-auto w-fit text-[32px] leading-[125%] text-white font-DungGeunMo">
        <img src={pixelMeteor} />
        <p>게임을 업로드 합니다.</p>
      </div>
      <Note state={note} onClickHandler={eventHandler.onClickNoteToggleHandler} />
      <Form
        form={form}
        note={note}
        previewThumbnail={previewThumbnail}
        previewStillCut={previewStillCut}
        onSubmitHandler={eventHandler.onSubmitHandler}
        onChangeHandler={eventHandler.onChangeImageHandler}
      />
    </main>
  );
};

export default GameUpload;
