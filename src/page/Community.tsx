import CardList from "../components/communityComponents/CardList";
import CommunityHero from "../components/communityComponents/CommunityHero";
import CommunityList from "../components/communityComponents/CommunityList";
import Navigation from "../components/communityComponents/Navigation";
import SearchFilter from "../components/communityComponents/SearchFilter";

const Community = () => {
  return (
    <main>
      <div className="bg-gray-800 w-full">
        <CommunityHero />
      </div>
      <CardList />
      <Navigation />
      <SearchFilter />
      <CommunityList />
    </main>
  );
};

export default Community;
