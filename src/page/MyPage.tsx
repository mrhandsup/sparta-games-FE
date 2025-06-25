import { useEffect, useState } from "react";
import Logs from "../components/mypageComponents/Logs";
import Setting from "../components/mypageComponents/Settting";
import { userStore } from "../share/store/userStore";
import ProfileHeader from "../components/mypageComponents/ProfileHeader";
import MyGame from "../components/mypageComponents/MyGame";
import { useParams, useSearchParams } from "react-router-dom";
import { getUserData } from "../api/user";
import { useQuery } from "@tanstack/react-query";
import { TUserDataResponse } from "../types";
import ProfileDetail from "../components/communityComponents/TeamBuilding/Profile/ProfileDetail";

const MyPage = () => {
  const [navigation, setNavigation] = useState<"log" | "teambuilding" | "develop" | "setting">("log");
  const { id } = useParams();

  const [searchParams] = useSearchParams();
  const tabParam = searchParams.get("tab");

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
    if (isMyPage) {
      // tab 쿼리 파라미터가 있을 경우 해당 탭으로 초기화
      if (tabParam === "log" || tabParam === "teambuilding" || tabParam === "develop" || tabParam === "setting") {
        setNavigation(tabParam);
      } else {
        setNavigation("log");
      }
    } else {
      setNavigation("develop");
    }
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

              {/* TODO: 팀빌딩 프로필 설정에 따른 해당 메뉴 표시 유무 분기 처리 */}
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
              <ProfileHeader user={user} isMyPage={isMyPage} setNavigation={setNavigation} />
              {navigation === "log" ? (
                <Logs user={user} />
              ) : navigation === "teambuilding" ? (
                <ProfileDetail user={user} />
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
