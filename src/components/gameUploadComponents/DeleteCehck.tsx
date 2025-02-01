import { useState } from "react";
import closeBtn from "../../../src/assets/common/closeBtnError.svg";
import { useNavigate } from "react-router-dom";
import useModalToggles from "../../hook/useModalToggles";
import { deleteGameList } from "../../api/game";
import SpartaReactionModal from "../../spartaDesignSystem/SpartaReactionModal";
import { userStore } from "../../share/store/userStore";

type Props = {
  gamePk: number | undefined;
  onClose: () => void;
};
const DeleteCheck = ({ gamePk, onClose }: Props) => {
  const GAME_DELETE_SUCCESS_ID = "gameDelteSuccessModal";
  const NO_ACTION_MODAL_ID = "noActionModal";

  const [inputValue, setInputValue] = useState("");

  const { userData } = userStore();

  const navigate = useNavigate();

  const requiredPhrase = "게임을 삭제하겠습니다";
  const isPhraseCorrect = inputValue.trim() === requiredPhrase;

  const { modalToggles, onClickModalToggleHandlers } = useModalToggles([GAME_DELETE_SUCCESS_ID, NO_ACTION_MODAL_ID]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const onClickRemoveGame = async (gamePk: number | undefined) => {
    const res = await deleteGameList(gamePk);

    if (res?.status === 200) {
      onClickModalToggleHandlers[NO_ACTION_MODAL_ID]();
    }
  };

  return (
    <div className="fixed left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 p-7 border border-solid border-error-default rounded-xl bg-gray-800 outline-none">
      <div className="flex flex-col gap-4 w-[700px]">
        <div className="flex justify-between items-center mb-2">
          <p className="text-xl font-DungGeunMo text-error-default">게임을 정말 삭제하시겠어요?</p>
          <img onClick={onClose} className="w-7 h-7 cursor-pointer" src={closeBtn} alt="닫기" />
        </div>
      </div>

      <div className="">
        <ul className="font-Pretendard text-white">
          <li className="flex items-center gap-2 text-sm">
            <span>·</span> 게임삭제를 진행하면 즉시 삭제됩니다.
          </li>
          <li className="flex items-center gap-2 text-sm">
            <span>·</span> 댓글 및 데이터들이 전부 삭제되므로, 댓글 등의 반응은 미리 백업을 진행해주세요!
          </li>

          <li className="flex items-center gap-2 text-sm">
            <span>·</span> 삭제를 하시기 위해서는 <b className="text-error-default "> ‘게임을 삭제하겠습니다’</b> 를
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
          placeholder="게임을 삭제하겠습니다다"
        />
      </div>

      <div
        className={`flex h-12 rounded-md ${isPhraseCorrect ? "bg-error-default" : "bg-gray-400"} text-center font-bold`}
      >
        {isPhraseCorrect ? (
          <button onClick={() => onClickRemoveGame(gamePk)} className="w-full">
            문구가 확인되었습니다. 게임 삭제를 진행합니다.
          </button>
        ) : (
          <button disabled={true} className="w-full">
            문구를 올바르게 입력해주세요.
          </button>
        )}
      </div>

      <SpartaReactionModal
        isOpen={modalToggles[NO_ACTION_MODAL_ID]}
        onClose={onClickModalToggleHandlers[NO_ACTION_MODAL_ID]}
        modalId={NO_ACTION_MODAL_ID}
        title="게임삭제 완료"
        content="게임을 성공적으로 삭제했습니다."
        btn1={{
          text: "확인했습니다.",
          onClick: () => {
            onClickModalToggleHandlers[NO_ACTION_MODAL_ID]();
            navigate(`/my-page/${userData?.user_pk}`);
          },
        }}
        type={"error"}
      />
    </div>
  );
};

export default DeleteCheck;
