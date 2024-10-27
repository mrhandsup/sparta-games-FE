import React from "react";

type Props = {};

const Profile = (props: Props) => {
  return (
    <div className="bg-gray-800 h-[176px] px-32 py-3 flex items-center">
      <div className="bg-white w-[80px] h-[80px] rounded-md" />
      <div className="flex flex-col gap-3 ml-3">
        <p className="font-DungGeunMo text-heading-40 text-white">
          [User Name]
          <span className="font-DungGeunMo  text-heading-20 text-white"> [Player/Maker(Tech)]</span>
        </p>
        {/* 관심 게임 분야 */}
        <p className="flex gap-2">
          {Array.from({ length: 3 }, (_, i) => (
            <span key={i} className="font-DungGeunMo text-white text-body-20 bg-black p-1">
              Game Category
            </span>
          ))}
        </p>
      </div>
    </div>
  );
};

export default Profile;
