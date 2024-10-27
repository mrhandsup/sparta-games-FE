import { useState } from "react";
import Profile from "../components/mypageComponents/Profile";
import log from "../assets/Log.svg";
import GameCardList, { GameData } from "../components/HomeComponents/GameCardList";
import { useQuery } from "@tanstack/react-query";
import { getGameList } from "../api/game";
import Logs from "../components/mypageComponents/Logs";
import Settting from "../components/mypageComponents/Settting";

const MyPage = () => {
  const [navigation, setNavigation] = useState<"log" | "setting">("log");

  const navigationButtonConfig = {
    clicked: "bg-gray-600 text-primary-600",
    unClicked: "bg-gray-800 text-gray-400",
  };

  return (
    <div className="w-full">
      {/* 헤더 */}
      <Profile />
      <div className="flex gap-9 py-11 w-[83%] mx-auto">
        {/* 네비게이션 */}
        <div className="bg-gray-800 w-[13%] p-2 rounded-md h-fit">
          <button
            className={`w-full h-12 rounded-md text-heading-20 
            ${navigation === "log" ? navigationButtonConfig.clicked : navigationButtonConfig.unClicked}
              `}
            onClick={() => setNavigation("log")}
          >
            로그
          </button>
          <button
            className={`w-full h-12 rounded-md text-heading-20  ${
              navigation === "setting" ? navigationButtonConfig.clicked : navigationButtonConfig.unClicked
            }`}
            onClick={() => setNavigation("setting")}
          >
            설정
          </button>
        </div>
        {/* 내용 */}
        <div className="w-[79%]">{navigation === "log" ? <Logs /> : <Settting />}</div>
      </div>
    </div>
  );
};

export default MyPage;
