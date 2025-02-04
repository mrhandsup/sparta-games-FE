import { SubmitHandler } from "react-hook-form";
import closeBtn from "../../../src/assets/common/closeBtn.svg";
import { TGameUploadInput, TGameUploadInputForm } from "../../types";
import { useState } from "react";
import useModalToggles from "../../hook/useModalToggles";
import { useNavigate } from "react-router-dom";
import SpartaModal from "../../spartaDesignSystem/SpartaModal";

type Props = {
  form: TGameUploadInputForm;
  gameUploadResponse: number | undefined;
  GAME_UPLOAD_CHECK_ID: string;
  onSubmitHandler: SubmitHandler<TGameUploadInput>;
  onClose: () => void;
};

const UploadCheck = ({ form, gameUploadResponse, GAME_UPLOAD_CHECK_ID, onSubmitHandler, onClose }: Props) => {
  const GAME_UPLOAD_SUCCESS_ID = "gameupUploadSuccessModal";

  const [inputValue, setInputValue] = useState("");

  const navigate = useNavigate();

  const requiredPhrase = "즐거운 게임세상 스파르타게임즈!";
  const isPhraseCorrect = inputValue.trim() === requiredPhrase;

  const { modalToggles, onClickModalToggleHandlers } = useModalToggles([GAME_UPLOAD_SUCCESS_ID, GAME_UPLOAD_CHECK_ID]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const onClickUploadGame = () => {
    form.handleSubmit(onSubmitHandler)();

    onClickModalToggleHandlers[GAME_UPLOAD_SUCCESS_ID]();
  };

  return (
    <div className="fixed left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 p-7 border border-solid border-primary-500 rounded-xl bg-gray-800 outline-none">
      <div className="flex flex-col gap-4 w-[700px]">
        <div className="flex justify-between items-center mb-2">
          <p className="text-xl font-DungGeunMo text-primary-500">게임을 등록하기 전에 확인해주세요!</p>
          <img onClick={onClose} className="w-7 h-7 cursor-pointer" src={closeBtn} alt="닫기" />
        </div>
      </div>

      <div className="">
        <ul className="font-Pretendard text-white">
          <li className="flex items-center gap-2 text-sm">
            <span>·</span> 최대 7일까지 검수기간이 걸릴 수 있습니다.
          </li>
          <li className="flex items-center gap-2 text-sm">
            <span>·</span> 검수가 통과될 시 즉시 홈페이지에서 노출됩니다.
          </li>
          <li className="flex items-center gap-2 text-sm">
            <span>·</span> 검수 중 수정이 진행될 경우, 새롭게 검수가 진행될 수 있으니 다시한번 확인해주시기 바랍니다.
          </li>
          <li className="flex items-center gap-2 text-sm">
            <span>·</span> 등록를 희망하신다면, <b className="text-primary-500">‘즐거운 게임세상 스파르타게임즈!’</b>{" "}
            라고 입력해주시기 바랍니다.
          </li>
        </ul>
      </div>

      <div className="mt-4 mb-3 p-3 border border-solid border-gray-100 rounded-md">
        <input
          className="w-full bg-transparent text-sm text-gray-100 outline-none"
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="즐거운 게임세상 스파르타게임즈!"
        />
      </div>

      <div
        className={`flex h-12 rounded-md ${isPhraseCorrect ? "bg-primary-500" : "bg-gray-400"} text-center font-bold`}
      >
        {isPhraseCorrect ? (
          <button onClick={onClickUploadGame} className="w-full">
            {isPhraseCorrect ? "문구가 확인되었습니다. 게임 등록을 진행합니다." : "문구를 올바르게 입력해주세요."}
          </button>
        ) : (
          <button disabled={true} className="w-full">
            문구를 올바르게 입력해주세요.
          </button>
        )}
      </div>
      {gameUploadResponse === 200 && (
        <SpartaModal
          isOpen={modalToggles[GAME_UPLOAD_SUCCESS_ID]}
          onClose={() => {}}
          modalId={GAME_UPLOAD_SUCCESS_ID}
          closeOnClickOutside={false}
        >
          <div className="flex flex-col items-center gap-8">
            <p className="text-primary-500 text-xl font-DungGeunMo">등록이 완료되었습니다.</p>
            <span className="text-white text-base text-center">
              검수 진행결과는 마이페이지 - 개발목록에서 확인 가능합니다.
              <br />
              스파르타 게임즈를 이용해주셔서 감사합니다 :)
            </span>
            <button onClick={() => navigate("/my-page")} className="w-full py-3 bg-primary-500 font-extrabold">
              확인
            </button>
          </div>
        </SpartaModal>
      )}
    </div>
  );
};

export default UploadCheck;
