import { AiFillCaretRight } from "react-icons/ai";
import CardList from "../components/communityComponents/CardList";
import CommunityHero from "../components/communityComponents/CommunityHero";
import CommunityList from "../components/communityComponents/CommunityList";
import CommunitySmallCardList from "../components/communityComponents/CommunitySamllCardList";
import Navigation from "../components/communityComponents/Navigation";
import SearchFilter from "../components/communityComponents/SearchFilter";
import pixelMeteor from "../assets/homeImage/pixelMeteor.svg";

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
            <AiFillCaretRight className="w-8 h-8 text-white cursor-pointer" />
          </p>
          <div className="space-y-4">
            <div className="flex gap-4">
              <CommunitySmallCardList />
              <CommunitySmallCardList />
            </div>
            <div className="flex gap-4">
              <CommunitySmallCardList />
              <CommunitySmallCardList />
            </div>
          </div>
        </div>
        <Navigation />

        <SearchFilter />
      </div>
      {/* <CardList /> */}
      <CommunityList />
    </main>
  );
};

export default Community;
