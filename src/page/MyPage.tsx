import { useEffect, useState } from "react";
import Logs from "../components/mypageComponents/Logs";
import Setting from "../components/mypageComponents/Settting";
import { userStore } from "../share/store/userStore";
import ProfileHeader from "../components/mypageComponents/ProfileHeader";
import MyGame from "../components/mypageComponents/MyGame";
import { useParams } from "react-router-dom";
import { getUserData } from "../api/user";
import { useQuery } from "@tanstack/react-query";
import { TUserDataResponse } from "../types";
import MyTeamBuildingProflie from "../components/mypageComponents/MyTeamBuildingProflie";

const MyPage = () => {
  const [navigation, setNavigation] = useState<"log" | "teambuilding" | "develop" | "setting">("log");
  const { id } = useParams();

  const navigationButtonConfig = {
    clicked: "bg-gray-700 text-primary-500",
    unClicked: "bg-gray-800 text-gray-400",
  };

  const { userData } = userStore();

  const isMyPage = id === userData?.data.user_id.toString();

  const { data, isError } = useQuery<TUserDataResponse>({
    queryKey: ["userProfile", id],
    queryFn: () => getUserData(Number(id)),
    enabled: !!id && !isMyPage,
    retry: 1,
  });

  const user = isMyPage ? userData?.data : data?.data;

  useEffect(() => {
    if (isError) {
      window.alert("존재하지 않는 사용자입니다.");
      window.history.back();
    }
    if (isMyPage) setNavigation("log");
    else setNavigation("develop");
  }, [id, userData, isError]);

  return (
    user && (
      <div className="w-full">
        <div className="relative flex flex-col mx-auto max-w-[1440px] min-w-[1440px]">
          <div className="flex gap-9 py-11 w-[83%] mx-auto">
            <div className="bg-gray-800 w-[13%] p-2 rounded-xl h-fit">
              {isMyPage && (
                <button
                  className={`w-full h-12 rounded-xl text-heading-20 
            ${navigation === "log" ? navigationButtonConfig.clicked : navigationButtonConfig.unClicked}
              `}
                  onClick={() => setNavigation("log")}
                >
                  활동목록
                </button>
              )}

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
              {isMyPage && (
                <button
                  className={`w-full h-12 rounded-xl  text-heading-20  ${
                    navigation === "setting" ? navigationButtonConfig.clicked : navigationButtonConfig.unClicked
                  }`}
                  onClick={() => setNavigation("setting")}
                >
                  정보설정
                </button>
              )}
            </div>
            <div className="w-[79%]">
              <ProfileHeader user={user} isMyPage={isMyPage} />
              {navigation === "log" ? (
                <Logs user={user} />
              ) : navigation === "teambuilding" ? (
                <MyTeamBuildingProflie />
              ) : navigation === "develop" ? (
                <MyGame user={user} isMyPage={isMyPage} />
              ) : (
                <Setting />
              )}
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default MyPage;
