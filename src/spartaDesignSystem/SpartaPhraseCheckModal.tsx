import { useState } from "react";

import closeBtnPrimary from "../../src/assets/common/closeBtn.svg";
import closeBtnAlert from "../../src/assets/common/closeBtnAlert.svg";
import closeBtnError from "../../src/assets/common/closeBtnError.svg";

type Props = {
  title: string; // 모달 상단 타이틀 텍스트
  requiredPhrase: string; // 입력해야 하는 문구
  buttonEnabledText: string; // 문구 일치시 버튼 텍스트
  isPending?: boolean; // 로딩 중인지 여부 (UploadCheck 용)
  onClose: () => void; // 닫기 함수
  onClickEvent: () => void | Promise<void>; // 확인 버튼 눌렀을 때 동작
  children: React.ReactNode;
  modalPurpose: "upload" | "edit" | "delete";
};

export default function SpartaPhraseCheckModal({
  title,
  requiredPhrase,
  buttonEnabledText,
  isPending = false,
  onClose,
  onClickEvent,
  children,
  modalPurpose,
}: Props) {
  const [inputValue, setInputValue] = useState("");

  const isPhraseCorrect = inputValue === requiredPhrase;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const onClickConfirm = async () => {
    if (isPending) return;

    await onClickEvent();
  };

  const bgStyle =
    modalPurpose === "upload" ? "bg-primary-500" : modalPurpose === "edit" ? "bg-alert-default" : "bg-error-default";

  const boredrStyle =
    modalPurpose === "upload"
      ? "border-primary-500"
      : modalPurpose === "edit"
      ? "border-alert-default"
      : "border-error-default";

  const textStyle =
    modalPurpose === "upload"
      ? "text-primary-500"
      : modalPurpose === "edit"
      ? "text-alert-default"
      : "text-error-default";

  const closeBtnImage =
    modalPurpose === "upload" ? closeBtnPrimary : modalPurpose === "edit" ? closeBtnAlert : closeBtnError;

  return (
    <div
      className={`fixed left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 p-7 border ${boredrStyle} border-solid rounded-xl bg-gray-800 outline-none`}
    >
      <div className="flex flex-col gap-4 w-[700px]">
        <div className="flex justify-between items-center mb-2">
          <p className={`text-xl font-DungGeunMo ${textStyle}`}>{title}</p>
          <img onClick={onClose} className="w-7 h-7 cursor-pointer" src={closeBtnImage} alt="닫기" />
        </div>
      </div>

      <div>{children}</div>

      <div className="mt-4 mb-3 p-3 border border-solid border-gray-100 rounded-md">
        <input
          className="w-full bg-transparent text-sm text-gray-100 outline-none"
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder={requiredPhrase}
          disabled={isPending}
        />
      </div>

      <div
        className={`flex h-12 rounded-md ${
          isPhraseCorrect && !isPending ? bgStyle : "bg-gray-400"
        } text-center font-bold`}
      >
        {isPhraseCorrect ? (
          <button
            onClick={modalPurpose === "upload" ? onClickConfirm : onClickEvent}
            className={`w-full ${isPending ? "cursor-wait" : "cursor-pointer"}`}
            disabled={isPending}
          >
            {isPending ? "등록이 진행 중입니다." : buttonEnabledText}
          </button>
        ) : (
          <button disabled className="w-full">
            문구를 올바르게 입력해주세요.
          </button>
        )}
      </div>
    </div>
  );
}
