import { useState } from "react";
import { useLocation } from "react-router-dom";

import ProfileDetail from "../components/communityComponents/TeamBuilding/Profile/ProfileDetail";

export default function TeamBuildingProfile() {
  const location = useLocation();
  const { post } = location.state || {};

  const [navigation, setNavigation] = useState<"log" | "teambuilding" | "develop">("teambuilding");

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
              {navigation === "log" ? (
                ""
              ) : // <Logs user={user} />
              navigation === "teambuilding" ? (
                <ProfileDetail profileData={post} />
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
