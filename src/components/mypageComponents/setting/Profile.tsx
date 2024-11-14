import React from "react";
import log from "../../../assets/Log.svg";
import { GAME_CATEGORY, selectConfig, USER_TECH, USER_TYPE } from "../../../util/constance/selectConfig";
import SpartaSelectableGroup from "../../common/SpartaSelectableGroup";
import { userStore } from "../../../share/store/userStore";
import { convertToConfigObjects, convertToConfigValues } from "../../../util/convertToConfigObjects";
import { updateUserData } from "../../../api/user";

type Props = {};

const Profile = (props: Props) => {
  //* Hooks
  const { userData, setUser } = userStore();

  //* State
  const [nickname, setNickname] = React.useState<string>("");
  const [gameCategory, setGameCategory] = React.useState<selectConfig[]>([]);
  const [userTech, setUserTech] = React.useState<string>("");
  const [userType, setUserType] = React.useState<selectConfig[]>([]);

  //* Function
  const onClickUpdateProfile = async () => {
    if (userData) {
      await updateUserData(userData?.user_pk, {
        nickname,
        user_tech: userTech,
        game_category: convertToConfigValues(gameCategory),
        is_maker: userType[0].value as boolean,
      }).then((res) => {
        setUser(sessionStorage.getItem("accessToken") as string);
      });
    }
  };

  //*
  React.useEffect(() => {
    if (userData) {
      const convertedUserType = userData.is_maker
        ? [{ label: "개발자", value: true }]
        : [{ label: "사용자", value: false }];
      const convertedGameCategory = convertToConfigObjects(GAME_CATEGORY, userData.game_category);
      setNickname(userData.nickname);
      setGameCategory(convertedGameCategory);
      setUserTech(userData.user_tech);
      setUserType(convertedUserType);
    }
  }, [userData]);

  return (
    <div className="bg-gray-800 rounded-xl px-7 py-5 flex flex-col gap-4 justify-start items-start ">
      <div className="flex justify-between w-full">
        <div className="flex items-center gap-4">
          <img src={log} />
          <p className="font-DungGeunMo text-heading-32 text-white">프로필 수정</p>
        </div>
        <button
          className="border-gray-400 border-2 w-[20%] h-10 rounded-md text-gray-400 font-bold"
          onClick={onClickUpdateProfile}
        >
          수정하기
        </button>
      </div>
      <div className="w-full flex flex-col gap-5">
        <div className="flex justify-between items-center">
          <label className="text-gray-100">닉네임</label>
          <input
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            placeholder="spartagames"
            className="py-3 px-4 bg-gray-700 border border-solid border-white rounded-md w-[50%] text-white"
          />
        </div>
        <div className="flex justify-between ">
          <label className="text-gray-100">관심게임분야</label>
          <div className="w-[50%]">
            <SpartaSelectableGroup
              selectableData={GAME_CATEGORY}
              onChangeSelectedData={(selectedData) => setGameCategory(selectedData)}
              initialSelectedData={gameCategory}
              isResetButton
              isMultipleSelect
            />
          </div>
        </div>
        <div className="flex justify-between items-center">
          <label className="text-gray-100">관심기술분야</label>
          <select
            value={userTech}
            onChange={(e) => setUserTech(e.target.value)}
            className="py-3 px-4 w-[50%] bg-gray-700 border border-solid border-white rounded-md appearance-none  text-white"
          >
            <option value="">장르를 선택해주세요</option>
            {USER_TECH.map((tech, idx) => (
              <option key={idx} value={tech.value as string}>
                {tech.label}
              </option>
            ))}
          </select>
        </div>
        <div className="flex justify-between items-center">
          <label className="text-gray-100">유저 구분</label>
          <div className="w-[50%]">
            <SpartaSelectableGroup
              selectableData={USER_TYPE}
              onChangeSelectedData={(selectedData) => setUserType(selectedData)}
              initialSelectedData={userType}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
