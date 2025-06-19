import { useState } from "react";

import SearchFilter from "../components/communityComponents/TeamBuilding/SearchFilter";
import SpartaPagination from "../spartaDesignSystem/SpartaPagination";
import SpartaTabNav from "../spartaDesignSystem/SpartaTabNav";

import Hero from "../components/communityComponents/TeamBuilding/Hero";
import RecommandedCard from "../components/communityComponents/TeamBuilding/RecommandedCard";
import CardList from "../components/communityComponents/TeamBuilding/TeamRecruit/CardList";

import pixelMeteor from "../assets/homeImage/pixelMeteor.svg";
import balloon from "../assets/headerImage/balloon.svg";
import { useQuery } from "@tanstack/react-query";
import { getTeamBuild } from "../api/teambuilding";
import { TTeamBuildPostResponse } from "../types";
import { userStore } from "../share/store/userStore";
import usePageHandler from "../hook/usePageHandler ";

type TabValue = "teamRecruit" | "profileRegister";

const TAB_LABELS: Record<TabValue, string> = {
  teamRecruit: "팀원 모집",
  profileRegister: "프로필 등록",
};

export default function TeamBuilding() {
  const COUNT_PER_PAGE = 12;

  const [selectedTab, setSelectedTab] = useState<TabValue>("teamRecruit");

  const { userData } = userStore();
  const { currentPage, onChangePage } = usePageHandler();

  const { data } = useQuery<TTeamBuildPostResponse>({
    queryKey: ["teamBuilding", currentPage],
    queryFn: () => getTeamBuild(userData?.data.user_id, "", "", "", "", currentPage, COUNT_PER_PAGE),
  });

  const teamBuildPosts = data?.data.team_build_posts;
  const recommandedPosts = data?.data.recommended_posts;
  const profileImage = userData?.data.profile_image;

  return (
    <main>
      <div className="bg-gray-800 w-full">
        <Hero />
      </div>
      <div className="mx-auto mt-16 max-w-[1440px]">
        <div className="flex flex-col gap-8">
          <p className="flex justify-between items-center text-5xl font-bold">
            <div className="flex items-center gap-3">
              <img src={pixelMeteor} />
              <p className="font-DungGeunMo text-[32px] font-[400] text-white">추천 게시글</p>
            </div>
          </p>
          <div className="grid grid-cols-2 gap-5">
            {recommandedPosts?.map((post) => (
              <RecommandedCard post={post} profileImage={profileImage} />
            ))}
          </div>
        </div>
        <div className="flex items-center justify-between mx-auto mt-16 max-w-[1440px]">
          <SpartaTabNav selectedTab={selectedTab} onTabChange={setSelectedTab} tabLabels={TAB_LABELS} />
          <div className="flex gap-4 px-6 py-5 rounded-full bg-gray-800">
            <img src={balloon} alt="검색 아이콘" />
            <input type="text" placeholder="제목 또는 글 내용 검색하기" className="bg-gray-800 text-2xl text-white" />
          </div>
        </div>

        <SearchFilter userData={userData?.data} isProfileTab={selectedTab === "profileRegister"} />
        <div className="grid grid-cols-4 gap-5">
          {teamBuildPosts &&
            teamBuildPosts.map((post) => (
              <CardList post={post} profileImage={profileImage} isProfileTab={selectedTab === "profileRegister"} />
            ))}
        </div>

        <div className="mt-10">
          <SpartaPagination
            dataTotalCount={data?.pagination.count}
            countPerPage={COUNT_PER_PAGE}
            onChangePage={onChangePage}
          />
        </div>
      </div>
    </main>
  );
}
