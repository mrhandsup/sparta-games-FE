import { TUser } from "../../types";
import { convertToConfigObjects } from "../../util/convertToConfigObjects";
import { USER_TECH } from "../../constant/constant";
import SpartaButton from "../../spartaDesignSystem/SpartaButton";
import defaultProfile from "../../assets/common/defaultProfile.svg";
import { useMutation } from "@tanstack/react-query";
import { useRef } from "react";
import { updateUserData } from "../../api/user";
import { userStore } from "../../share/store/userStore";

type TProfileProps = {
  user: TUser;
  isMyPage: boolean;
};

const ProfileHeader = (props: TProfileProps) => {
  const { setUserData } = userStore();
  //* Utils
  const userTech = convertToConfigObjects(USER_TECH, [props.user.user_tech]);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const updateProfileMutation = useMutation({
    mutationFn: async (formData: FormData | undefined) => {
      if (!formData) {
        throw new Error("No file selected");
      }
      return await updateUserData(props.user.user_pk, formData);
    },
    onSuccess: (data) => {
      setUserData("profile_image", data.profile_image);
    },
    onError: (error) => {
      console.error("프로필 이미지 업데이트 실패:", error);
      alert("이미지 업데이트에 실패했습니다. 다시 시도해주세요.");
    },
  });

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
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
    formData.append("user_tech", props.user.user_tech);
    formData.append("game_category", props.user.game_category.join(","));

    updateProfileMutation.mutate(formData);
  };

  return (
    <div className="bg-gray-800 h-[176px] px-32 py-3 w-full">
      <div className=" max-w-[1440px] mx-auto flex items-center ">
        {props.user.profile_image ? (
          <img
            className="bg-gray-700 min-w-[110px] w-[110px] min-h-[110px] h-[110px] rounded-md"
            src={
              import.meta.env.VITE_DEPLOYMENT_MODE === "dev"
                ? import.meta.env.VITE_PROXY_HOST + props.user.profile_image
                : props.user.profile_image
            }
          />
        ) : (
          <img src={defaultProfile} className="bg-gray-700 w-[110px] h-[110px] rounded-md p-3" />
        )}
        <div className="flex flex-col gap-3 ml-3 w-full">
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center">
              <span className="font-DungGeunMo text-body-20 bg-white px-2 py-1 rounded-md w-fit">
                {userTech[0].label}
              </span>
              <p className="font-DungGeunMo text-heading-40 text-white font-[400]">[{props.user.nickname}] 님!</p>
            </div>
            {props.isMyPage && (
              <div className="w-[110px]">
                <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*" className="hidden" />
                <SpartaButton
                  content="사진 변경"
                  size="small"
                  colorType="grey"
                  onClick={() => fileInputRef.current?.click()}
                />
              </div>
            )}
          </div>
          {/* 관심 게임 분야 */}
          <p className="flex gap-2 items-center">
            <p className="font-DungGeunMo text-alert-hover text-heading-24 font-[400]">관심게임분야</p>
            {props.user.game_category.map((category, index) => (
              <span key={index} className="font-DungGeunMo text-body-20 bg-white px-2 py-1  rounded-md w-fit">
                {category}
              </span>
            ))}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
