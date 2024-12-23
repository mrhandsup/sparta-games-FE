import { useState } from "react";
import Logs from "../components/mypageComponents/Logs";
import Setting from "../components/mypageComponents/Settting";
import { userStore } from "../share/store/userStore";
import ProfileHeader from "../components/mypageComponents/ProfileHeader";
import MyGame from "../components/mypageComponents/MyGame";

const MyPage = () => {
  const [navigation, setNavigation] = useState<"log" | "develop" | "setting">("log");

  const navigationButtonConfig = {
    clicked: "bg-gray-600 text-primary-600",
    unClicked: "bg-gray-800 text-gray-400",
  };

  const { userData } = userStore();

  return (
    userData && (
      <div className="w-full">
        {/* 헤더 */}
        <ProfileHeader user={userData} />
        <div className="flex gap-9 py-11 w-[83%] mx-auto">
          {/* 네비게이션 */}
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
                navigation === "develop" ? navigationButtonConfig.clicked : navigationButtonConfig.unClicked
              }`}
              onClick={() => setNavigation("develop")}
            >
              개발목록
            </button>
            <button
              className={`w-full h-12 rounded-xl  text-heading-20  ${
                navigation === "setting" ? navigationButtonConfig.clicked : navigationButtonConfig.unClicked
              }`}
              onClick={() => setNavigation("setting")}
            >
              정보설정
            </button>
          </div>
          {/* 내용 */}
          <div className="w-[79%]">
            {navigation === "log" ? (
              <Logs user={userData} />
            ) : navigation === "develop" ? (
              <MyGame user={userData} />
            ) : (
              <Setting />
            )}
          </div>
        </div>
      </div>
    )
  );
};

export default MyPage;
