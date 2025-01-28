import { useState } from "react";
import log from "../../../assets/Log.svg";

import { userStore } from "../../../share/store/userStore";
import { convertToConfigObjects } from "../../../util/convertToConfigObjects";

import { USER_TECH } from "../../../constant/constant";

import useModalToggles from "../../../hook/useModalToggles";
import SpartaModal from "../../../spartaDesignSystem/SpartaModal";
import ProfileModal from "./ProfileModal";
import SpartaReactionModal, { TSpartaReactionModalProps } from "../../../spartaDesignSystem/SpartaReactionModal";

const Profile = () => {
  //* Hooks
  const { userData } = userStore();
  //* 모달
  const CHANGE_PROFILE_MODAL_ID = "changeProfileModal";
  const NO_ACTION_MODAL_ID = "noActionModal";

  const { modalToggles, onClickModalToggleHandlers } = useModalToggles([CHANGE_PROFILE_MODAL_ID, NO_ACTION_MODAL_ID]);

  // 단순 모달 데이터 config
  const noActionData: { [key: string]: Partial<TSpartaReactionModalProps> } = {
    successChangeProfile: {
      title: "프로필 변경 완료",
      content: "프로필이 변경되었습니다.",
      btn1: {
        text: "확인했습니다",
        onClick: () => {
          onClickModalToggleHandlers[NO_ACTION_MODAL_ID]();
        },
      },
      type: "primary",
    },
    failUpdateProfile: {
      title: "프로필 변경 실패",
      content: "프로필 변경에 실패했습니다. 다시 시도해주세요.",
      btn1: {
        text: "확인했습니다",
        onClick: () => {
          onClickModalToggleHandlers[NO_ACTION_MODAL_ID]();
        },
      },
      type: "error",
    },
  };

  // 단순 모달 데이터
  const [noActionModalData, setNoActionModalData] = useState<Partial<TSpartaReactionModalProps>>(
    noActionData.successChangeProfile,
  );

  return (
    <div className="bg-gray-800 rounded-xl px-7 py-5 flex flex-col gap-4 justify-start items-start ">
      <div className="flex justify-between w-full">
        <div className="flex items-center gap-4">
          <img src={log} />
          <p className="font-DungGeunMo text-heading-32 text-white">프로필 수정</p>
        </div>
        <button
          className={`border-gray-300 border-2 w-[20%] h-10 rounded-md text-gray-300 font-bold hover:bg-gray-700 transition-colors`}
          onClick={() => onClickModalToggleHandlers[CHANGE_PROFILE_MODAL_ID]()}
        >
          수정하기
        </button>
      </div>
      <div className="w-full flex flex-col gap-5">
        <div className="flex justify-between items-center">
          <label className="text-gray-100">닉네임</label>
          <input
            value={userData?.nickname}
            className="py-3 px-4 bg-gray-700 border border-solid border-white rounded-md w-[50%] text-white"
            disabled
          />
        </div>
        <div className="flex justify-between ">
          <label className="text-gray-100">관심게임분야</label>
          <div className="w-[50%]">
            <div className="flex gap-2 items-center p-2 border-gray-200 border-2 rounded-md border-solid bg-gray-700">
              {userData?.game_category.map((category, idx) => (
                <span key={idx} className="font-DungGeunMo text-body-20 bg-white px-2 py-1  rounded-md w-fit">
                  {category}
                </span>
              ))}
            </div>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <label className="text-gray-100">관심기술분야</label>
          <div className="flex gap-2 items-center p-2 border-gray-200 border-2 rounded-md border-solid bg-gray-700 w-[50%]">
            <span className="font-DungGeunMo text-body-20 bg-white px-2 py-1  rounded-md w-fit">
              {userData?.user_tech && convertToConfigObjects(USER_TECH, [userData.user_tech])[0].label}
            </span>
          </div>
        </div>
      </div>
      <SpartaModal
        modalId={CHANGE_PROFILE_MODAL_ID}
        isOpen={modalToggles[CHANGE_PROFILE_MODAL_ID]}
        onClose={onClickModalToggleHandlers[CHANGE_PROFILE_MODAL_ID]}
        closeOnClickOutside={false}
        title="프로필 수정"
        type="primary"
      >
        <ProfileModal
          onSuccess={() => {
            setNoActionModalData(noActionData.successChangeProfile);
            onClickModalToggleHandlers[CHANGE_PROFILE_MODAL_ID]();
            onClickModalToggleHandlers[NO_ACTION_MODAL_ID]();
          }}
          onError={(err) => {
            setNoActionModalData({ ...noActionData.failUpdateProfile, content: err });

            onClickModalToggleHandlers[NO_ACTION_MODAL_ID]();
          }}
        />
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
          type={noActionModalData.type}
        />
      )}
    </div>
  );
};

export default Profile;
