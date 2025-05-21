import CommunityHero from "../components/communityComponents/CommunityHero";
import CommunitySamllCard from "../components/communityComponents/CommunitySamllCard";
import Navigation from "../components/communityComponents/Navigation";
import SearchFilter from "../components/communityComponents/SearchFilter";
import pixelMeteor from "../assets/homeImage/pixelMeteor.svg";
import CommunityCard from "../components/communityComponents/CommunityCard";
import SpartaPagination from "../spartaDesignSystem/SpartaPagination";
import { useState } from "react";

const Community = () => {
  const [selectedTab, setSelectedTab] = useState<"팀원 모집" | "프로필 등록">("팀원 모집");

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
        <Navigation selectedTab={selectedTab} onTabChange={setSelectedTab} />
        <SearchFilter isProfileTab={selectedTab === "프로필 등록"} />
        <div className="grid grid-cols-4 gap-5">
          <CommunityCard isProfileTab={selectedTab === "프로필 등록"} />
          <CommunityCard isProfileTab={selectedTab === "프로필 등록"} />
          <CommunityCard isProfileTab={selectedTab === "프로필 등록"} />
          <CommunityCard isProfileTab={selectedTab === "프로필 등록"} />
          <CommunityCard isProfileTab={selectedTab === "프로필 등록"} />
          <CommunityCard isProfileTab={selectedTab === "프로필 등록"} />
          <CommunityCard isProfileTab={selectedTab === "프로필 등록"} />
          <CommunityCard isProfileTab={selectedTab === "프로필 등록"} />
          <CommunityCard isProfileTab={selectedTab === "프로필 등록"} />
          <CommunityCard isProfileTab={selectedTab === "프로필 등록"} />
          <CommunityCard isProfileTab={selectedTab === "프로필 등록"} />
          <CommunityCard isProfileTab={selectedTab === "프로필 등록"} />
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
