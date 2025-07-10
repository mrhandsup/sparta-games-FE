import { useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import { userStore } from "../share/store/userStore";

import { getUserData } from "../api/user";
import { getTeamBuildProfileByUserId } from "../api/teambuilding";

import ProfileDetail from "../components/communityComponents/TeamBuilding/Profile/ProfileDetail";
import MyGame from "../components/mypageComponents/MyGame";

import { TTeamBuildProfileUserResponse, TUserDataResponse } from "../types";
import NotFound from "./NotFound";

export default function UserProfile() {
  const [navigation, setNavigation] = useState<"teambuilding" | "develop">("develop");

  const { userData } = userStore();
  const { id } = useParams();

  const navigationButtonConfig = {
    clicked: "bg-gray-700 text-primary-500",
    unClicked: "bg-gray-800 text-gray-400",
  };

  const { data, isError } = useQuery<TUserDataResponse>({
    queryKey: ["userProfile", id],
    queryFn: () => getUserData(Number(id)),
    enabled: !!id,
    retry: 1,
  });

  const { data: teamBuildprofileResponse } = useQuery<TTeamBuildProfileUserResponse>({
    queryKey: ["teamBuildProfile", Number(id)],
    queryFn: () => getTeamBuildProfileByUserId(Number(id)),
    retry: false,
  });

  if (isError || !data?.data) {
    return <NotFound />;
  }

  const profileData = teamBuildprofileResponse?.data;
  const user = data?.data;
  const isMyPage = user?.user_id === userData?.data.user_id;

  return (
    <div className="w-full">
      <div className="relative flex flex-col mx-auto max-w-[1440px] min-w-[1440px]">
        <div className="flex gap-9 py-11 w-[83%] mx-auto">
          <div className="bg-gray-800 w-[13%] p-2 rounded-xl h-fit">
            <button
              className={`${profileData ? "block" : "hidden"} w-full h-12 rounded-xl text-heading-20 ${
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
            {navigation === "teambuilding" && user ? (
              <ProfileDetail user={user} isMyPage={isMyPage} profileData={profileData} />
            ) : navigation === "develop" ? (
              <MyGame user={user} isMyPage={false} />
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
