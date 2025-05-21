import CardList from "../components/communityComponents/CardList";
import CommunityHero from "../components/communityComponents/CommunityHero";
import CommunityList from "../components/communityComponents/CommunityList";
import CommunitySamllCard from "../components/communityComponents/CommunitySamllCard";
import Navigation from "../components/communityComponents/Navigation";
import SearchFilter from "../components/communityComponents/SearchFilter";
import pixelMeteor from "../assets/homeImage/pixelMeteor.svg";
import CommunityCard from "../components/communityComponents/CommunityCard";
import SpartaPagination from "../spartaDesignSystem/SpartaPagination";

const Community = () => {
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
        <Navigation />
        <SearchFilter />
        <div className="grid grid-cols-4 gap-5">
          <CommunityCard />
          <CommunityCard />
          <CommunityCard />
          <CommunityCard />
          <CommunityCard />
          <CommunityCard />
          <CommunityCard />
          <CommunityCard />
          <CommunityCard />
          <CommunityCard />
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
