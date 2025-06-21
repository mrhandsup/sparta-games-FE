import { useState } from "react";
import closeBtn from "../../../../assets/common/closeBtnError.svg";
import useModalToggles from "../../../../hook/useModalToggles";

export default function DeleteCheck({ onClose }) {
  const NO_ACTION_MODAL_ID = "noActionModal";

  const [inputValue, setInputValue] = useState("");

  const requiredPhrase = "프로필을 삭제하겠습니다";
  const isPhraseCorrect = inputValue === requiredPhrase;

  const { modalToggles, onClickModalToggleHandlers } = useModalToggles([NO_ACTION_MODAL_ID]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  return (
    <div className="fixed left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 p-7 border border-solid border-error-default rounded-xl bg-gray-800 outline-none">
      <div className="flex flex-col gap-4 w-[700px]">
        <div className="flex justify-between items-center mb-2">
          <p className="text-xl font-DungGeunMo text-error-default">팀빌딩 프로필을 삭제하시겠어요?</p>
          <img onClick={onClose} className="w-7 h-7 cursor-pointer" src={closeBtn} alt="닫기" />
        </div>
      </div>

      <div className="">
        <ul className="font-Pretendard text-white">
          <li className="flex items-center gap-2 text-sm">
            <span>·</span> 일부만 수정하고 싶으신 경우, 수정 기능을 이용해주세요!
          </li>
          <li className="flex items-center gap-2 text-sm">
            <span>·</span> 수정을 하시기 위해서는 <b className="text-error-default ">‘프로필을 삭제하겠습니다’</b>를
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
          placeholder="프로필을 삭제하겠습니다"
        />
      </div>

      <div
        className={`flex h-12 rounded-md ${isPhraseCorrect ? "bg-error-default" : "bg-gray-400"} text-center font-bold`}
      >
        {isPhraseCorrect ? (
          <button onClick={() => {}} className="w-full">
            문구가 확인되었습니다. 프로필 삭제를 진행합니다.
          </button>
        ) : (
          <button disabled={true} className="w-full">
            문구를 올바르게 입력해주세요.
          </button>
        )}
      </div>

      {/* <SpartaReactionModal
        isOpen={useModalToggles[NO_ACTION_MODAL_ID]}
        onClose={onClickModalToggleHandler[NO_ACTION_MODAL_ID]}
        modalId={NO_ACTION_MODAL_ID}
        title="게임삭제 완료"
        content="게임을 성공적으로 삭제했습니다."
        btn1={{
          text: "확인했습니다.",
          onClick: () => {
            onClickModalToggleHandlers[NO_ACTION_MODAL_ID]();
            navigate(`/my-page/${userData?.data.user_id}`);
          },
        }}
        type={"error"}
      /> */}
    </div>
  );
}
