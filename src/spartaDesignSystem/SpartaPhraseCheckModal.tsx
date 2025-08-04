import { useState } from "react";

import closeBtnPrimary from "../../src/assets/common/closeBtn.svg";
import closeBtnAlert from "../../src/assets/common/closeBtnAlert.svg";
import closeBtnError from "../../src/assets/common/closeBtnError.svg";
import useModalToggles from "../hook/useModalToggles";

type Props = {
  isOpen: boolean;
  modalId: string;
  isPending?: boolean; // 로딩 중인지 여부 (게임 업로드 용)
  onClose: () => void;
  onClickEvent: () => void | Promise<void>; // 모달 확인 버튼 눌렀을 때 동작
  children: React.ReactNode;
  modalPurpose: "upload" | "edit" | "delete" | "profileDelete";
  closeOnClickOutside?: boolean;
};

export default function SpartaPhraseCheckModal({
  isOpen,
  modalId,
  isPending = false,
  onClose,
  onClickEvent,
  children,
  modalPurpose,
  closeOnClickOutside = false,
}: Props) {
  const baseDeleteStyle = {
    btnActiveBgColor: "bg-error-default",
    borderStyle: "border-error-default",
    textStyle: "text-error-default",
    closeBtnImage: closeBtnError,
  };

  const textDict = {
    upload: {
      title: "게임을 등록하기 전에 확인해주세요!",
      requiredPhrase: "즐거운 게임세상 스파르타게임즈!",
      btnConfirmText: "문구가 확인되었습니다. 게임 등록을 진행합니다.",
    },
    edit: {
      title: "수정하기 전 확인해주세요!",
      requiredPhrase: "게임을 수정하겠습니다",
      btnConfirmText: "문구가 확인되었습니다. 게임 수정을 진행합니다.",
    },
    delete: {
      title: "게임을 정말 삭제하시겠어요?",
      requiredPhrase: "게임을 삭제하겠습니다",
      btnConfirmText: "문구가 확인되었습니다. 게임 삭제를 진행합니다.",
    },
    profileDelete: {
      title: "팀빌딩 프로필을 삭제하시겠어요?",
      requiredPhrase: "프로필을 삭제하겠습니다",
      btnConfirmText: "문구가 확인되었습니다. 프로필 삭제를 진행합니다.",
    },
  };

  const styleDict = {
    upload: {
      btnActiveBgColor: "bg-primary-500",
      borderStyle: "border-primary-500",
      textStyle: "text-primary-500",
      closeBtnImage: closeBtnPrimary,
    },
    edit: {
      btnActiveBgColor: "bg-alert-default",
      borderStyle: "border-alert-default",
      textStyle: "text-alert-default",
      closeBtnImage: closeBtnAlert,
    },
    delete: baseDeleteStyle,
    profileDelete: baseDeleteStyle,
  };
  const [inputValue, setInputValue] = useState("");

  const { modalRefs } = useModalToggles([modalId]);

  if (!isOpen) return null;

  const isPhraseCorrect = inputValue === textDict[modalPurpose]["requiredPhrase"];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const onClickConfirm = () => {
    if (isPending) return;

    onClickEvent();
  };

  const handleOverlayClick = () => {
    if (closeOnClickOutside) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 "
      onClick={handleOverlayClick}
    >
      <div
        ref={modalRefs[modalId]}
        className={`fixed left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 p-7 border ${styleDict[modalPurpose]["borderStyle"]} border-solid rounded-xl bg-gray-800 outline-none`}
      >
        <div className="flex flex-col gap-4 w-[700px]">
          <div className="flex justify-between items-center mb-2">
            <p className={`text-xl font-DungGeunMo ${styleDict[modalPurpose]["textStyle"]}`}>
              {textDict[modalPurpose]["title"]}
            </p>
            <img
              onClick={onClose}
              className="w-7 h-7 cursor-pointer"
              src={styleDict[modalPurpose]["closeBtnImage"]}
              alt="닫기"
            />
          </div>
        </div>

        <div>{children}</div>

        <div className="mt-4 mb-3 p-3 border border-solid border-gray-100 rounded-md">
          <input
            className="w-full bg-transparent text-sm text-gray-100 outline-none"
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            placeholder={textDict[modalPurpose]["requiredPhrase"]}
            disabled={isPending}
          />
        </div>

        <div
          className={`flex h-12 rounded-md ${
            isPhraseCorrect && !isPending ? styleDict[modalPurpose]["btnActiveBgColor"] : "bg-gray-400"
          } text-center font-bold`}
        >
          {isPhraseCorrect ? (
            <button
              onClick={onClickConfirm}
              className={`w-full ${isPending ? "cursor-wait" : "cursor-pointer"}`}
              disabled={isPending}
            >
              {isPending ? "등록이 진행 중입니다." : textDict[modalPurpose]["btnConfirmText"]}
            </button>
          ) : (
            <button disabled className="w-full">
              문구를 올바르게 입력해주세요.
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
