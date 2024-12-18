import React from "react";
import { TUser } from "../../types";
import { convertToConfigObjects } from "../../util/convertToConfigObjects";
import { USER_TECH } from "../../constant/constant";
import SpartaButton from "../../spartaDesignSystem/SpartaButton";

type TProfileProps = {
  user: TUser;
};

const ProfileHeader = (props: TProfileProps) => {
  //* Utils
  const userTech = convertToConfigObjects(USER_TECH, [props.user.user_tech]);

  return (
    <div className="bg-gray-800 h-[176px] px-32 py-3 flex items-center w-full">
      <div className="bg-white w-[110px] h-[110px] rounded-md" />
      <div className="flex flex-col gap-3 ml-3 w-full">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center">
            <span className="font-DungGeunMo text-body-20 bg-white px-2 py-1 rounded-md w-fit">
              {userTech[0].label}
            </span>
            <p className="font-DungGeunMo text-heading-40 text-white">[{props.user.nickname}] 님!</p>
          </div>
          <div className="w-[110px]">
            <SpartaButton content="사진 변경" size="small" colorType="grey" onClick={() => {}} />
          </div>
        </div>
        {/* 관심 게임 분야 */}
        <p className="flex gap-2 items-center">
          <p className="font-DungGeunMo text-alert-hover text-heading-24">관심게임분야</p>
          {props.user.game_category.map((category, index) => (
            <span key={index} className="font-DungGeunMo text-body-20 bg-white px-2 py-1  rounded-md w-fit">
              {category}
            </span>
          ))}
        </p>
      </div>
    </div>
  );
};

export default ProfileHeader;
