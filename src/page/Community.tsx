import { useState } from "react";

import CommunityHero from "../components/communityComponents/CommunityHero";
import CommunitySamllCard from "../components/communityComponents/CommunitySamllCard";
import SearchFilter from "../components/communityComponents/SearchFilter";
import pixelMeteor from "../assets/homeImage/pixelMeteor.svg";
import CommunityCard from "../components/communityComponents/CommunityCard";
import SpartaPagination from "../spartaDesignSystem/SpartaPagination";
import SpartaTabNav from "../spartaDesignSystem/SpartaTabNav";
import balloon from "../assets/headerImage/balloon.svg";

type TabValue = "teamRecruit" | "profileRegister";

const TAB_LABELS: Record<TabValue, string> = {
  teamRecruit: "팀원 모집",
  profileRegister: "프로필 등록",
};

const Community = () => {
  const [selectedTab, setSelectedTab] = useState<TabValue>("teamRecruit");

  return (
    <main>
      <div className="bg-gray-800 w-full">
        <CommunityHero />
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
            <CommunitySamllCard />
            <CommunitySamllCard />
            <CommunitySamllCard />
            <CommunitySamllCard />
          </div>
        </div>
        <div className="flex items-center justify-between mx-auto mt-16 max-w-[1440px]">
          <SpartaTabNav selectedTab={selectedTab} onTabChange={setSelectedTab} tabLabels={TAB_LABELS} />
          <div className="flex gap-4 px-6 py-5 rounded-full bg-gray-800">
            <img src={balloon} alt="검색 아이콘" />
            <input type="text" placeholder="제목 또는 글 내용 검색하기" className="bg-gray-800 text-2xl text-white" />
          </div>
        </div>

        <SearchFilter isProfileTab={selectedTab === "profileRegister"} />
        <div className="grid grid-cols-4 gap-5">
          <CommunityCard isProfileTab={selectedTab === "profileRegister"} />
          <CommunityCard isProfileTab={selectedTab === "profileRegister"} />
          <CommunityCard isProfileTab={selectedTab === "profileRegister"} />
          <CommunityCard isProfileTab={selectedTab === "profileRegister"} />
          <CommunityCard isProfileTab={selectedTab === "profileRegister"} />
          <CommunityCard isProfileTab={selectedTab === "profileRegister"} />
          <CommunityCard isProfileTab={selectedTab === "profileRegister"} />
          <CommunityCard isProfileTab={selectedTab === "profileRegister"} />
          <CommunityCard isProfileTab={selectedTab === "profileRegister"} />
          <CommunityCard isProfileTab={selectedTab === "profileRegister"} />
          <CommunityCard isProfileTab={selectedTab === "profileRegister"} />
          <CommunityCard isProfileTab={selectedTab === "profileRegister"} />
        </div>

        <div className="mt-10">
          <SpartaPagination dataTotalCount={5} countPerPage={1} onChangePage={() => {}} />
        </div>
      </div>
      {/* <CommunityList /> */}
      {/* <CardList /> */}
    </main>
  );
};

export default Community;
