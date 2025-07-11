import { TUserData } from "../../types";

import SpartaButton from "../../spartaDesignSystem/SpartaButton";
import defaultProfile from "../../assets/common/defaultProfile.svg";
import { useMutation } from "@tanstack/react-query";
import { useRef, useState } from "react";
import { updateUserData } from "../../api/user";
import { userStore } from "../../share/store/userStore";
import SpartaReactionModal, { TSpartaReactionModalProps } from "../../spartaDesignSystem/SpartaReactionModal";
import useModalToggles from "../../hook/useModalToggles";

type NavigationType = "log" | "teambuilding" | "develop" | "setting";

type TProfileProps = {
  user: TUserData;
  isMyPage: boolean | null;
  setNavigation: React.Dispatch<React.SetStateAction<NavigationType>>;
};

const ProfileHeader = (props: TProfileProps) => {
  const NO_ACTION_MODAL_ID = "noActionModal";

  const { modalToggles, onClickModalToggleHandlers } = useModalToggles([NO_ACTION_MODAL_ID]);
  const noActionData: { [key: string]: Partial<TSpartaReactionModalProps> } = {
    updateSuccess: {
      title: "완료",
      content: "프로필 이미지 수정이 완료되었습니다.",
      btn1: {
        text: "확인했습니다",
        onClick: () => {
          onClickModalToggleHandlers[NO_ACTION_MODAL_ID]();
        },
      },
    },
    deleteSuccess: {
      title: "완료",
      content: "프로필 이미지 삭제가 완료되었습니다.",
      btn1: {
        text: "확인했습니다",
        onClick: () => {
          onClickModalToggleHandlers[NO_ACTION_MODAL_ID]();
        },
      },
    },
  };

  const [noActionModalData, setNoActionModalData] = useState<Partial<TSpartaReactionModalProps>>(
    noActionData.updateSuccess,
  );

  const { setUserData } = userStore();

  const [isProfileImage, setIsProfileImage] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const updateProfileMutation = useMutation({
    mutationFn: async (formData: FormData | undefined) => {
      if (!formData) {
        throw new Error("No file selected");
      }
      return await updateUserData(props.user.user_id, formData);
    },
    onSuccess: (data) => {
      if (data.profile_image === "이미지 없음") {
        setNoActionModalData(noActionData.deleteSuccess);
        onClickModalToggleHandlers[NO_ACTION_MODAL_ID]();
      } else {
        setNoActionModalData(noActionData.updateSuccess);
        onClickModalToggleHandlers[NO_ACTION_MODAL_ID]();
      }
      setUserData("profile_image", data.profile_image);
      setIsProfileImage((prev) => !prev);
    },
    onError: (error) => {
      console.error("프로필 이미지 업데이트 실패:", error);
      alert("이미지 업데이트에 실패했습니다. 다시 시도해주세요.");
    },
  });

  const onChangeProfileImage = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // 파일 크기 체크 (5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert("파일 크기는 5MB 이하여야 합니다.");
      return;
    }

    // 이미지 파일 타입 체크
    if (!file.type.startsWith("image/")) {
      alert("이미지 파일만 업로드 가능합니다.");
      return;
    }

    const formData = new FormData();
    formData.append("image", file);
    formData.append("nickname", props.user.nickname);
    formData.append("game_category", props.user.game_category.join(","));

    updateProfileMutation.mutate(formData);
  };

  const handleFileDelete = () => {
    const formData = new FormData();
    formData.append("image", "");
    formData.append("nickname", props.user.nickname);
    formData.append("game_category", props.user.game_category.join(","));

    updateProfileMutation.mutate(formData);
  };

  return (
    <div className="max-w-[1440px] mx-auto pb-7">
      <div className="flex items-center">
        {props.user.profile_image && props.user.profile_image !== "이미지 없음" ? (
          <img
            className="bg-gray-800 w-[80px] h-[80px] rounded-xl object-cover"
            src={
              import.meta.env.VITE_DEPLOYMENT_MODE === "dev"
                ? import.meta.env.VITE_PROXY_HOST + props.user.profile_image
                : props.user.profile_image
            }
          />
        ) : (
          <img src={defaultProfile} className="bg-gray-800 w-[75px] h-[80px] rounded-xl p-3" />
        )}
        <div className="flex flex-col gap-3 ml-3 w-full">
          <div className="flex items-center justify-between w-full">
            <div className="flex flex-col gap-2">
              <p className="font-DungGeunMo text-[30px] text-white font-[400]">{props.user.nickname}</p>
              <p className="flex items-center gap-2">
                <p className="font-DungGeunMo text-alert-hover text-[18px] font-[400]">추천받을 게임분야</p>
                {props.user.game_category.map((category, index) => (
                  <span key={index} className="font-DungGeunMo text-body-20 bg-white px-2 py-1 rounded-md w-fit">
                    {category}
                  </span>
                ))}
              </p>
            </div>
            {props.isMyPage && (
              <div className="flex flex-col gap-1 ">
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={onChangeProfileImage}
                  accept="image/*"
                  className="hidden"
                />
                <SpartaButton
                  content="수정하기"
                  size="small"
                  colorType="grey"
                  onClick={() => props.setNavigation("setting")}
                  customStyle="w-[120px] rounded-sm hover:text-alert-default hover:border-alert-default"
                />
                <SpartaButton
                  content={isProfileImage ? "이미지 삭제" : "이미지 변경"}
                  size="small"
                  colorType="grey"
                  onClick={isProfileImage ? handleFileDelete : () => fileInputRef.current?.click()}
                  customStyle="w-[120px] rounded-sm hover:text-alert-default hover:border-alert-default"
                />
              </div>
            )}
          </div>
        </div>
      </div>

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

export default ProfileHeader;
