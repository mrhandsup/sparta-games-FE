import { useState } from "react";
import log from "../../../assets/Log.svg";
import { userStore } from "../../../share/store/userStore";
import useModalToggles from "../../../hook/useModalToggles";
import SpartaModal from "../../../spartaDesignSystem/SpartaModal";
import AccountModal from "./AccountModal";
import SpartaReactionModal, { TSpartaReactionModalProps } from "../../../spartaDesignSystem/SpartaReactionModal";
import { useForm } from "react-hook-form";
import SpartaButton from "../../../spartaDesignSystem/SpartaButton";
import { leaveUser } from "../../../api/user";
import { useMutation } from "@tanstack/react-query";

const Account = () => {
  //* Hooks
  const { userData, logout } = userStore();

  //* 모달
  const CHANGE_PASSWORD_MODAL_ID = "changePasswordModal";
  const WITHDRAWAL_MODAL_ID = "withdrawalModal";
  const NO_ACTION_MODAL_ID = "noActionModal";
  const { modalToggles, onClickModalToggleHandlers } = useModalToggles([
    CHANGE_PASSWORD_MODAL_ID,
    NO_ACTION_MODAL_ID,
    WITHDRAWAL_MODAL_ID,
  ]);

  const withDrawalMutation = useMutation({
    mutationFn: async (user_pk: number) => {
      if (!userData?.user_pk) throw new Error("사용자 ID가 없습니다.");
      return leaveUser(user_pk);
    },
    onSuccess: () => {
      logout();
    },
  });

  // 단순 모달 데이터 config
  const noActionData: { [key: string]: Partial<TSpartaReactionModalProps> } = {
    successChangePw: {
      title: "비밀번호 변경 완료",
      content: "비밀번호가 성공적으로 변경되었습니다.",
      btn1: {
        text: "확인했습니다",
        onClick: () => {
          onClickModalToggleHandlers[NO_ACTION_MODAL_ID]();
        },
      },
      type: "alert",
    },
    successWithdrawal: {
      title: "회원 탈퇴 완료",
      content: "회원 탈퇴가 완료되었습니다.",
      btn1: {
        text: "확인했습니다",
        onClick: () => {
          onClickModalToggleHandlers[NO_ACTION_MODAL_ID]();
          userData && withDrawalMutation.mutate(userData?.user_pk);
        },
      },
      type: "alert",
    },
  };

  // 단순 모달 데이터
  const [noActionModalData, setNoActionModalData] = useState<Partial<TSpartaReactionModalProps>>(
    noActionData.successChangePw,
  );

  const { register, watch } = useForm();

  const withdrawal = watch("withdrawal");

  const handleDeleteClick = () => {
    onClickModalToggleHandlers[WITHDRAWAL_MODAL_ID]();
    setNoActionModalData(noActionData.successWithdrawal);
    onClickModalToggleHandlers[NO_ACTION_MODAL_ID]();
  };

  const onSuccessChangePassword = () => {
    onClickModalToggleHandlers[CHANGE_PASSWORD_MODAL_ID]();
    setNoActionModalData(noActionData.successChangePw);
    onClickModalToggleHandlers[NO_ACTION_MODAL_ID]();
  };

  const socialLoginConfig = {
    GOOGLE: "구글",
    KAKAO: "카카오",
    NAVER: "네이버",
    DISCORD: "디스코드",
  };

  const socialName = socialLoginConfig[userData?.login_type as keyof typeof socialLoginConfig];

  return (
    <div className="bg-gray-800 rounded-xl px-7 py-5 flex flex-col gap-4 justify-start items-start">
      <div className="w-full flex flex-col gap-5">
        <div className="flex justify-between w-full">
          <div className="flex items-center gap-4 h-12">
            <img src={log} alt="로고" />
            <p className="font-DungGeunMo text-heading-32 text-white font-[400]">계정정보 수정</p>
          </div>
          {userData?.login_type == "DEFAULT" && (
            <button
              disabled={userData?.login_type !== "DEFAULT"}
              className={`border-gray-300 border-2 w-[20%] h-10 rounded-md text-gray-300 font-bold hover:bg-gray-700 transition-colors `}
              onClick={() => onClickModalToggleHandlers[CHANGE_PASSWORD_MODAL_ID]()}
            >
              수정하기
            </button>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-center">
            <label className="text-gray-100">아이디</label>
            <input
              value={userData?.email}
              disabled
              placeholder="spartagames@sparta.com"
              className={`py-3 px-4 bg-gray-700 border border-solid rounded-md w-[50%] text-gray-200`}
            />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-center">
            <label className="text-gray-100">비밀번호</label>
            <input
              disabled
              type="password"
              placeholder={
                userData?.login_type !== "DEFAULT" ? `${socialName} 간편로그인으로 이용하고 계십니다.` : "*****"
              }
              className={`py-3 px-4 bg-gray-700 border border-solid rounded-md w-[50%] text-white border-gray-200`}
            />
          </div>
        </div>
      </div>
      <div
        className="flex w-full justify-end text-red-500 underline cursor-pointer"
        onClick={() => onClickModalToggleHandlers[WITHDRAWAL_MODAL_ID]()}
      >
        <p>회원탈퇴</p>
      </div>
      <SpartaModal
        modalId={CHANGE_PASSWORD_MODAL_ID}
        isOpen={modalToggles[CHANGE_PASSWORD_MODAL_ID]}
        onClose={onClickModalToggleHandlers[CHANGE_PASSWORD_MODAL_ID]}
        closeOnClickOutside={false}
        title="비밀번호 변경"
        type="primary"
      >
        <AccountModal onSuccess={onSuccessChangePassword} />
      </SpartaModal>
      <SpartaModal
        modalId={WITHDRAWAL_MODAL_ID}
        isOpen={modalToggles[WITHDRAWAL_MODAL_ID]}
        onClose={onClickModalToggleHandlers[WITHDRAWAL_MODAL_ID]}
        closeOnClickOutside={false}
        title="정말 회원을 탈퇴하시겠습니까?"
        type="error"
      >
        <>
          <div className="text-white flex flex-col gap-2">
            <li>회원탈퇴 시 연동되어있던 정보는 전부 삭제됩니다.</li>
            <li>다만 만들었던 게임은 본 서비스에서 계속해서 사용될 수 있어요</li>
            <li>원하지 않을 경우, 게임 삭제를 먼저 진행해주신 후 회원탈퇴를 진행해주시기 바랍니다. </li>
            <li>
              탈퇴를 희망하신다면, <span className="text-error-default">‘안녕 스파르타게임즈!</span>’ 라고 입력해주시기
              바랍니다.
            </li>
          </div>
          <input
            className="w-full h-10 rounded-md border border-solid bg-transparent border-gray-200 p-3 mt-[20px] mb-3 text-gray-200"
            placeholder="안녕 스파르타게임즈!"
            {...register("withdrawal")}
          />
          <SpartaButton
            type="filled"
            size="small"
            colorType="error"
            content="회원탈퇴"
            onClick={handleDeleteClick}
            disabled={withdrawal !== "안녕 스파르타게임즈!"}
          />
        </>
      </SpartaModal>
      {noActionModalData && (
        <SpartaReactionModal
          isOpen={modalToggles[NO_ACTION_MODAL_ID]}
          onClose={onClickModalToggleHandlers[NO_ACTION_MODAL_ID]}
          modalId={NO_ACTION_MODAL_ID}
          title={noActionModalData.title || ""}
          content={noActionModalData.content || ""}
          btn1={{
            text: noActionModalData?.btn1?.text || "",
            onClick: noActionModalData?.btn1?.onClick || (() => {}),
          }}
          btn2={
            noActionModalData?.btn2 && {
              text: noActionModalData?.btn2?.text || "",
              onClick: noActionModalData?.btn2?.onClick || (() => {}),
            }
          }
          type={noActionModalData.type}
        />
      )}
    </div>
  );
};

export default Account;
