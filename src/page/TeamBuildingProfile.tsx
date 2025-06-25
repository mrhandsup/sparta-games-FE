import { useState } from "react";
import defaultProfile from "../assets/common/defaultProfile.svg";
import ProfileDetail from "../components/communityComponents/TeamBuilding/Profile/ProfileDetail";
import { useLocation } from "react-router-dom";

export default function TeamBuildingProfile() {
  const location = useLocation();
  const { post, userData } = location.state || {};

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
              <div className="flex items-center pb-7">
                <img
                  src={
                    userData?.profile_image === ""
                      ? defaultProfile
                      : import.meta.env.VITE_DEPLOYMENT_MODE === "dev"
                      ? import.meta.env.VITE_PROXY_HOST.replace(/\/$/, "") + (userData?.profile_image || "")
                      : userData?.profile_image || ""
                  }
                  className="bg-gray-700 w-[80px] h-[80px] rounded-md object-cover"
                />

                <div className="flex flex-col gap-3 ml-3 w-full">
                  <div className="flex items-center justify-between w-full">
                    <div className="flex flex-col gap-2">
                      <p className="font-DungGeunMo text-heading-40 text-white font-[400]">{userData?.nickname}</p>
                      <p className="flex items-center gap-2">
                        <p className="font-DungGeunMo text-alert-hover text-heading-20 font-[400]">추천받을 게임분야</p>

                        {userData?.game_category.map((category: string) => (
                          <span className="font-DungGeunMo text-body-20 bg-white px-2 py-1  rounded-md w-fit">
                            {category}
                          </span>
                        ))}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              {navigation === "log" ? (
                ""
              ) : // <Logs user={user} />
              navigation === "teambuilding" ? (
                <ProfileDetail postId={post?.author_data.id} />
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
