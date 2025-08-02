import { useFormContext } from "react-hook-form";
import { TGameUploadInput } from "../../types";

type Props = {
  note: {
    1: boolean;
    2: boolean;
    3: boolean;
  };
  isEditMode: boolean;
  openUploadCheckModal: () => void;
  onEditRequest: () => void;
};

const GameSubmitButton = ({ note, isEditMode, openUploadCheckModal, onEditRequest }: Props) => {
  const { watch, formState } = useFormContext<TGameUploadInput>();

  const editorContent = watch("content");

  const isEmptyContent = (content: string) => {
    const plainText = content.replace(/<[^>]+>/g, "").replace(/\s/g, "");
    return plainText === "";
  };

  const onClickGameSubmission = () => {
    if (editorContent && isEmptyContent(editorContent)) {
      alert("내용을 입력해주세요.");
      return;
    } else if (!isEditMode) {
      openUploadCheckModal();
    } else {
      onEditRequest();
    }
  };

  console.log("formState.isValid", formState.isValid);
  return !isEditMode && note[1] && note[2] && note[3] && formState.isValid ? (
    <button
      onClick={onClickGameSubmission}
      type="button"
      className="mb-10 w-full h-14 text-title-18 text-primary-950 bg-primary-500 rounded-lg"
    >
      승인요청
    </button>
  ) : isEditMode && formState.isValid ? (
    <button
      onClick={onClickGameSubmission}
      type="button"
      className="mb-10 w-full h-14 text-title-18 text-primary-950 bg-primary-500 rounded-lg"
    >
      수정요청
    </button>
  ) : (
    <button disabled={true} className="mb-10 w-full h-14 text-title-18 text-gray-900 bg-gray-400 rounded-lg">
      필수 값을 입력한 후 승인요청을 할 수 있습니다.
    </button>
  );
};

export default GameSubmitButton;
