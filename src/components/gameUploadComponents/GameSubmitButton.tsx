import { FormState, UseFormWatch } from "react-hook-form";
import { TGameUploadInput } from "../../types";

type Props = {
  watch: UseFormWatch<TGameUploadInput>;
  formState: FormState<TGameUploadInput>;
  note: {
    1: boolean;
    2: boolean;
    3: boolean;
  };
  isEditMode: boolean;
  openUploadCheckModal: () => void;
  onEditRequest: () => void;
};

const GameSubmitButton = ({ watch, formState, note, isEditMode, openUploadCheckModal, onEditRequest }: Props) => {
  return !isEditMode && note[1] && note[2] && note[3] && formState.isValid ? (
    <button
      onClick={openUploadCheckModal}
      type="button"
      className="mb-10 w-full h-14 text-title-18 text-primary-950 bg-primary-500 rounded-lg"
    >
      승인요청
    </button>
  ) : isEditMode ? (
    <button
      onClick={onEditRequest}
      type="button"
      className="mb-10 w-full h-14 text-title-18 text-primary-950 bg-primary-500 rounded-lg"
    >
      수정요청
    </button>
  ) : (
    <button
      type="submit"
      disabled={true}
      className="mb-10 w-full h-14 text-title-18 text-gray-900 bg-gray-400 rounded-lg"
    >
      필수 값을 입력한 후 승인요청을 할 수 있습니다.
    </button>
  );
};

export default GameSubmitButton;
