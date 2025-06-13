import { useState } from "react";
import ProfileHeader from "../../../mypageComponents/ProfileHeader";
import defaultProfile from "../assets/common/defaultProfile.svg";
import ProfileDetail from "../components/communityComponents/TeamBuilding/Profile/ProfileDetail";

export default function TeamBuildingProfile() {
  const [navigation, setNavigation] = useState<"log" | "teambuilding" | "develop">("teambuilding");
  const [user, setUser] = useState(false);

  const navigationButtonConfig = {
    clicked: "bg-gray-700 text-primary-500",
    unClicked: "bg-gray-800 text-gray-400",
  };

  return (
    <div className="w-full">
      <div className="relative flex flex-col mx-auto max-w-[1440px] min-w-[1440px]">
        <div className="flex gap-9 py-11 w-[83%] mx-auto">
          <div className="bg-gray-800 w-[13%] p-2 rounded-xl h-fit">
            <button
              className={`w-full h-12 rounded-xl text-heading-20 
            ${navigation === "log" ? navigationButtonConfig.clicked : navigationButtonConfig.unClicked}
              `}
              onClick={() => setNavigation("log")}
            >
              활동목록
            </button>

            <button
              className={`w-full h-12 rounded-xl text-heading-20  ${
                navigation === "teambuilding" ? navigationButtonConfig.clicked : navigationButtonConfig.unClicked
              }`}
              onClick={() => setNavigation("teambuilding")}
            >
              팀빌딩 프로필
            </button>
            <button
              className={`w-full h-12 rounded-xl text-heading-20  ${
                navigation === "develop" ? navigationButtonConfig.clicked : navigationButtonConfig.unClicked
              }`}
              onClick={() => setNavigation("develop")}
            >
              개발목록
            </button>
          </div>
          <div className="w-[79%]">
            {/* <ProfileHeader user={user} isMyPage={isMyPage} setNavigation={setNavigation} /> */}

            <div className="max-w-[1440px] mx-auto">
              <div className="flex items-center pb-7">
                <img src={defaultProfile} className="bg-gray-700 w-[80px] h-[80px] rounded-md p-3" />

                <div className="flex flex-col gap-3 ml-3 w-full">
                  <div className="flex items-center justify-between w-full">
                    <div className="flex flex-col gap-2">
                      <p className="font-DungGeunMo text-heading-40 text-white font-[400]">봉천동불주먹</p>
                      <p className="flex items-center gap-2">
                        <p className="font-DungGeunMo text-alert-hover text-heading-20 font-[400]">추천받을 게임분야</p>

                        <span className="font-DungGeunMo text-body-20 bg-white px-2 py-1  rounded-md w-fit">
                          Action
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              {navigation === "log" ? (
                ""
              ) : // <Logs user={user} />
              navigation === "teambuilding" ? (
                <ProfileDetail user={user} />
              ) : (
                ""
                // <MyGame user={user} isMyPage={isMyPage} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
