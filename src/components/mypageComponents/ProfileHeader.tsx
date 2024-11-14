import React from "react";
import { User } from "../../types";

type TProfileProps = {
  user: User;
};

const ProfileHeader = (props: TProfileProps) => {
  return (
    <div className="bg-gray-800 h-[176px] px-32 py-3 flex items-center">
      <div className="bg-white w-[80px] h-[80px] rounded-md" />
      <div className="flex flex-col gap-3 ml-3">
        <p className="font-DungGeunMo text-heading-40 text-white">
          [{props.user.nickname}]
          <span className="font-DungGeunMo  text-heading-20 text-white">
            {" "}
            [{props.user.is_maker ? "Maker" : "Player"}({props.user.user_tech})]
          </span>
        </p>
        {/* 관심 게임 분야 */}
        <p className="flex gap-2">
          {props.user.game_category.map((category, index) => (
            <span key={index} className="font-DungGeunMo text-white text-body-20 bg-black p-1">
              {category}
            </span>
          ))}
        </p>
      </div>
    </div>
  );
};

export default ProfileHeader;
